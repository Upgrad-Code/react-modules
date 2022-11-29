import React from 'react';
import './style.scss';
import NavBar from './components/NavBar/NavBar';
import ProductPage from './pages/ProductPage/ProductPage';

export default function App() {
  return (
    <div className="app">
      <NavBar className="app__nav" />
      <main className="app__main">
        <ProductPage />
      </main>
    </div>
  );
}
