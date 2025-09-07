import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function BookmarksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-amazon-light">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-amazon-blue mb-8">My Library ❤️</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 text-lg">Your bookmarked books will appear here!</p>
          <div className="mt-4">
            <a href="/search" className="bg-amazon-orange text-white px-6 py-3 rounded font-semibold hover:bg-orange-600 transition">
              Browse Books
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
