import React, { useState } from 'react';

export default function Navbar({ usuarioLogado, onOpenLogin, onLogout }) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center flex-wrap">
        <a href="#home" className="text-xl font-bold text-indigo-400 flex items-center gap-2">
          ⚡ DevPortfolio
        </a>

        {/* Botão Hambúrguer para Mobile */}
        <button 
          onClick={() => setMenuAberto(!menuAberto)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none text-xl p-1"
          aria-label="Abrir Menu de Navegação"
        >
          ☰
        </button>

        {/* Links de Navegação */}
        <div className={`w-full md:flex md:items-center md:w-auto ${menuAberto ? 'block mt-4' : 'hidden md:block'}`}>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
            <a href="#projetos" className="hover:text-indigo-300 transition-colors">Projetos</a>
            <a href="#contato" className="hover:text-indigo-300 transition-colors">Contato</a>
            
            {usuarioLogado ? (
              <button 
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                Sair ({usuarioLogado.nome})
              </button>
            ) : (
              <button 
                onClick={onOpenLogin}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                Área do Dev (Login)
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}