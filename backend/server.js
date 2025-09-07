const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const Database = require('better-sqlite3');

const app = express();

app.use(cors());
app.use(express.json());

// Initialize SQLite DB
const db = new Database(path.join(__dirname, 'library.db'));
db.prepare(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    script TEXT,
    language TEXT,
    category TEXT,
    year TEXT,
    file_path TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

const uploadsPath = path.join(__dirname, 'uploads');

// Ensure uploads folder exists
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

// Serve uploads folder statically with inline PDF content disposition
app.use('/uploads', (req, res, next) => {
  if (req.path.endsWith('.pdf')) {
    res.setHeader('Content-Disposition', 'inline');
    res.type('application/pdf');
  }
  next();
});

app.use('/uploads', express.static(uploadsPath));

// Multer storage to preserve original extension & generate unique filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// POST /api/books/upload - Upload book metadata and PDF file
app.post('/api/books/upload', upload.single('book'), (req, res) => {
  const { title, author, script, language, category, year } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Validate required fields
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const filePath = `/uploads/${req.file.filename}`;

  try {
    const stmt = db.prepare(`
      INSERT INTO books (title, author, script, language, category, year, file_path)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(title, author, script, language, category, year, filePath);

    res.json({ id: info.lastInsertRowid, file_path: filePath });
  } catch (error) {
    console.error('Error inserting book:', error);
    res.status(500).json({ error: 'Failed to upload book' });
  }
});

// GET /api/books - Fetch all books with optional filters
app.get('/api/books', (req, res) => {
  try {
    let sql = 'SELECT * FROM books WHERE 1=1';
    const params = [];
    const { search, script, language, category } = req.query;

    if (search) {
      sql += ' AND (title LIKE ? OR author LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    if (script) {
      sql += ' AND script = ?';
      params.push(script);
    }
    if (language) {
      sql += ' AND language = ?';
      params.push(language);
    }
    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }
    sql += ' ORDER BY created_at DESC';

    const rows = db.prepare(sql).all(...params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// GET /api/books/:id - Get individual book by ID
app.get('/api/books/:id', (req, res) => {
  try {
    const book = db.prepare('SELECT * FROM books WHERE id = ?').get(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

// DELETE /api/books/:id - Delete book and associated PDF file
app.delete('/api/books/:id', (req, res) => {
  try {
    const book = db.prepare('SELECT * FROM books WHERE id = ?').get(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found or already deleted' });

    const fileFullPath = path.join(__dirname, 'uploads', path.basename(book.file_path));
    fs.unlink(fileFullPath, (err) => {
      if (err && err.code !== 'ENOENT') {
        console.error('File deletion error:', err);
        return res.status(500).json({ error: 'Failed to delete file' });
      }
      const info = db.prepare('DELETE FROM books WHERE id = ?').run(req.params.id);
      if (info.changes === 0) return res.status(404).json({ error: 'Book not found or already deleted' });
      res.json({ success: true });
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
