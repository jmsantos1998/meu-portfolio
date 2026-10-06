import React, { useState } from 'react';

export default function Navbar({ usuarioLogado, onOpenLogin, onLogout }) {
  const [copiado, setCopiado] = useState(false);

  // Função para partilhar o link do portfólio completo
  const handlePartilharPortfolio = async () => {
    const dadosPartilha = {
      title: 'Portfólio Profissional',
      text: 'Confira meu portfólio com meus principais projetos de desenvolvimento!',
      url: window.location.href, // Pega o link atual do site
    };

    // Tenta usar a Web Share API (Nativa do celular) ou copia o link no Desktop
    if (navigator.share) {
      try {
        await navigator.share(dadosPartilha);
      } catch (error) {
        console.log('Partilha cancelada:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000); // Reseta a mensagem em 2s
      } catch (err) {
        alert('Não foi possível copiar o link.');
      }
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo / Título */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          <span className="font-extrabold text-xl text-gray-900 tracking-tight">
            MeuPortfólio
          </span>
        </div>

        {/* Ações da Navbar */}
        <div className="flex items-center gap-3">
          
          {/* Botão de Partilhar o Portfólio Completo */}
          <button
            onClick={handlePartilharPortfolio}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-lg transition-colors border border-blue-200"
            title="Partilhar este portfólio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            {copiado ? 'Link Copiado!' : 'Partilhar Perfil'}
          </button>

          {/* Controle de Login / Logout */}
          {usuarioLogado ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 font-medium hidden sm:inline">
                Olá, {usuarioLogado.nome || 'Dev'}
              </span>
              <button
                onClick={onLogout}
                className="text-xs font-semibold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              Área Restrita (Login)
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}