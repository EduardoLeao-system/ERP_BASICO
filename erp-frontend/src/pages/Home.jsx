import React from "react";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-2">
            <strong>Bem-vindo ao ERP Mini</strong>
          </h2>
          <p className="text-gray-600 mb-6">
            Escolha uma opção no menu para gerenciar seus dados.
          </p>
      <div className="card max-w-md w-full text-center flex flex-col items-center">
        <div className="flex flex-col items-center mb-4 w-full">
          <img
            src="/logo.png"
            alt="Logo"
            className="mx-auto mb-4"
            style={{
              maxWidth: "1300px",
              maxHeight: "500px",
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: "1rem",
              background: "#e0e7ff",
              padding: "0.5rem",
            }}
          />
          
        </div>
      </div>
    </div>
  );
}

export default Home;