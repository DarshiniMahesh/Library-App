import React from 'react';
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import UserProfile from '../components/user/UserProfile';
import BorrowHistory from '../components/user/BorrowHistory';
import Wishlist from '../components/user/Wishlist';

export default function ProfilePage() {
  return (
    <div>
      <Header />
      <main className="p-4">
        <UserProfile />
        <BorrowHistory />
        <Wishlist />
      </main>
      <Footer />
    </div>
  );
}
