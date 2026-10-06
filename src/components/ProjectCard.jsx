import React, { useState } from 'react';

export default function ProjectCard({ projeto }) {
  const [copiado, setCopiado] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: projeto.titulo,
      text: projeto.descricao,
      url: projeto.demoUrl || projeto.githubUrl || window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Partilha cancelada');
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
      } catch (err) {
        alert('Não foi possível copiar o link.');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      
      {/* Imagem do Projeto com Capa do Card */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={projeto.imagem || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80'}
          alt={projeto.titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Conteúdo do Card */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
            {projeto.titulo}
          </h3>
          <p className="text-slate-600 text-sm line-clamp-3 mb-4 leading-relaxed">
            {projeto.descricao}
          </p>

          {/* Tags de Tecnologia */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {projeto.tecnologias?.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] font-semibold rounded-md border border-slate-200/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Rodapé do Card: Ações & Botão Partilhar */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {projeto.githubUrl && (
              <a
                href={projeto.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1"
              >
                GitHub ↗
              </a>
            )}
            {projeto.demoUrl && (
              <a
                href={projeto.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
              >
                Demo ↗
              </a>
            )}
          </div>

          <button
            onClick={handleShare}
            className="text-xs font-semibold text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-slate-200 transition-all flex items-center gap-1.5"
            title="Partilhar este projeto"
          >
            <span>{copiado ? '✓ Link Copiado!' : '🔗 Partilhar'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}