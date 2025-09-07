import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import pages from src/pages/
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import BookDetailsPage from './pages/BookDetails';
import BookmarksPage from './pages/BookMarks';
import UploadPage from './pages/Upload';
import AboutPage from './pages/About';
import IndexPage from './pages/IndexPage';
import NotFound from './pages/NotFound';

// Import context from src/context/
import { AppProvider } from './context/AppContext';
import { SearchProvider } from './context/SearchContext';

// Import global css
import './styles/globals.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AppProvider>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/books" element={<IndexPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SearchProvider>
    </AppProvider>
  </BrowserRouter>
);
