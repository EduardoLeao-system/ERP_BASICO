import React, { useState } from 'react';
import Home from './pages/Home';
import Customers from './pages/Customers';
import Products from './pages/Products';
import NewSale from './pages/NewSale';
import Report from './pages/Report';
import Navbar from './components/Navbar';
import './index.css';

const App = () => {
  const [page, setPage] = useState('home');
  const handleExplore = () => setPage('customers');

  let content;
  switch (page) {
    case 'customers': content = <Customers />; break;
    case 'products': content = <Products />; break;
    case 'newSale': content = <NewSale />; break;
    case 'report': content = <Report />; break;
    case 'home':
    default: content = <Home onExplore={handleExplore} />; break;
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      {page !== 'home' && <Navbar setPage={setPage} />}
      <main className="container mx-auto max-w-7xl p-4">
        {content}
      </main>
    </div>
  );
};

export default App;
