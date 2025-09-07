import React, { useState, useRef } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useNavigate } from 'react-router-dom';

export default function UploadPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    author: '',
    script: '',
    language: '',
    category: '',
    year: '',
  });
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const scripts = ['English (Roman)', 'Devanagari'];
  const languages = ['English', 'Hindi', 'Marathi', 'Sanskrit', 'Kannada'];
  const categories = [
    'Astrology',
    'Tantra',
    'Yoga',
    'Philosophy',
    'Upanishad',
    'Veda',
    'Bhashya',
    'Purana',
  ];

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = e => {
    setFile(e.target.files[0]);
  };

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) {
      alert('Please select a PDF file');
      return;
    }
    const data = new FormData();
    data.append('book', file);
    data.append('title', form.title);
    data.append('author', form.author);
    data.append('script', form.script);
    data.append('language', form.language);
    data.append('category', form.category);
    data.append('year', form.year);

    try {
      const res = await fetch('http://localhost:5000/api/books/upload', {
        method: 'POST',
        body: data,
      });
      if (!res.ok) throw new Error('Upload failed');
      navigate('/books');
    } catch (err) {
      console.error(err);
      alert('Error uploading book');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amazon-light">
      <Header />
      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-amazon-blue mb-6">📚 Add a Book</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Book Name</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                type="text"
                placeholder="Enter book title"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                type="text"
                placeholder="Enter author name"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Script</label>
              <select
                name="script"
                value={form.script}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                required
              >
                <option value="" disabled>Select Script</option>
                {scripts.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select
                name="language"
                value={form.language}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                required
              >
                <option value="" disabled>Select Language</option>
                {languages.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                required
              >
                <option value="" disabled>Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year of Publication</label>
              <input
                name="year"
                value={form.year}
                onChange={handleChange}
                type="text"
                placeholder="YYYY"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              />
            </div>
          </div>

          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center ${
              dragActive ? 'border-amazon-orange bg-amazon-orange/10' : 'border-gray-300'
            } transition`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileSelect}
            />
            <p className="text-gray-700 mb-2">Drag & drop a PDF here or click to select</p>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="mt-4 bg-amazon-blue text-white px-6 py-2 rounded-lg hover:bg-indigo-800 transition"
            >
              Choose PDF
            </button>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-amazon-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition"
          >
            Upload Book
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
