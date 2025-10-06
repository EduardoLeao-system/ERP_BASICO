import React from 'react';

const Home = ({ onExplore }) => (
  <div className="home-bg min-h-screen flex flex-col items-center justify-center">
  <div className="card text-center fade-in">
    <img
      src="https://placehold.co/400x400/1a202c/fff?text=Sistema+ERP+MINI"
      alt="Logo"
      className="mx-auto mb-6 rounded-full shadow-lg border-4 border-violet-400/50"
      style={{ maxWidth: "400px" }}
    />
    <h2 className="text-4xl font-extrabold text-white mb-2 leading-tight">
      Bem-vindo ao <span className="text-violet-400">ERP Mini</span>
    </h2>
    <p className="text-gray-300 mb-8 max-w-sm mx-auto">
      Gerencie seus dados de forma elegante e eficiente.
    </p>
    <button onClick={onExplore} className="btn w-full transform hover:scale-105 duration-300">
      Explorar
    </button>
  </div>
</div>
);

export default Home;
