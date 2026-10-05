import React from 'react';

export default function ProjectCard({ projeto }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow flex flex-col h-full">
      <img 
        src={projeto.imagem || "https://via.placeholder.com/600x300?text=Sem+Imagem"} 
        alt={`Capa do projeto ${projeto.titulo}`} 
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{projeto.titulo}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{projeto.descricao}</p>
        
        {/* Badges das Tecnologias */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {projeto.tecnologias.map((tech, index) => (
            <span key={index} className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {tech}
            </span>
          ))}
        </div>

        {/* Botões do Projeto */}
        <div className="flex gap-3 pt-3 border-t border-gray-100">
          {projeto.githubUrl && (
            <a 
              href={projeto.githubUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 text-center py-2 px-3 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              GitHub
            </a>
          )}
          {projeto.demoUrl && (
            <a 
              href={projeto.demoUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 text-center py-2 px-3 bg-indigo-600 rounded-lg text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Ver Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}