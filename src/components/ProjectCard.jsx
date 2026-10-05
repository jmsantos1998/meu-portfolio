import React, { useState } from 'react';

export default function ProjectCard({ projeto }) {
  const [copiado, setCopiado] = useState(false);

  // Função para tratar o clique no botão Partilhar
  const handlePartilhar = async () => {
    const dadosPartilha = {
      title: projeto.titulo,
      text: `Confira este projeto: ${projeto.titulo} - ${projeto.descricao}`,
      url: projeto.demoUrl || projeto.githubUrl || window.location.href,
    };

    // 1. Tenta usar a Web Share API (Nativa do celular/navegador)
    if (navigator.share) {
      try {
        await navigator.share(dadosPartilha);
      } catch (error) {
        console.log('Partilha cancelada ou não suportada:', error);
      }
    } else {
      // 2. Plano B (Desktop): Copia o link do projeto para a área de transferência
      try {
        await navigator.clipboard.writeText(dadosPartilha.url);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000); // Reseta o estado após 2 segundos
      } catch (err) {
        alert('Não foi possível copiar o link.');
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-lg transition-shadow">
      <img 
        src={projeto.imagem} 
        alt={projeto.titulo} 
        className="h-48 w-full object-cover"
      />

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{projeto.titulo}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{projeto.descricao}</p>

        {/* Tags de Tecnologias */}
        <div className="flex flex-wrap gap-2 mb-4">
          {projeto.tecnologias.map((tech, idx) => (
            <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
              {tech}
            </span>
          ))}
        </div>

        {/* Rodapé do Card: Links + Botão Partilhar */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <div className="flex gap-3">
            {projeto.githubUrl && (
              <a href={projeto.githubUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-gray-700 hover:text-blue-600">
                GitHub ↗
              </a>
            )}
            {projeto.demoUrl && (
              <a href={projeto.demoUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                Demo ↗
              </a>
            )}
          </div>

          {/* BOTÃO DE PARTILHAR */}
          <button
            onClick={handlePartilhar}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
            title="Partilhar este projeto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            {copiado ? 'Link Copiado!' : 'Partilhar'}
          </button>
        </div>
      </div>
    </div>
  );
}