import React, { useState } from 'react';

export default function ProjectForm({ onAddProject, onClose }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tecnologias, setTecnologias] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [imagem, setImagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !descricao) return;

    const novoProjeto = {
      id: Date.now(),
      titulo,
      descricao,
      tecnologias: tecnologias.split(',').map(tech => tech.trim()).filter(Boolean),
      githubUrl,
      demoUrl,
      imagem: imagem || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'
    };

    onAddProject(novoProjeto);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative my-8">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg"
          aria-label="Fechar formulário"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-1">Adicionar Novo Projeto</h2>
        <p className="text-sm text-gray-500 mb-6">Preencha os detalhes do projeto para exibir no portfólio.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título do Projeto *</label>
            <input 
              type="text" 
              required
              placeholder="Ex: FocusFlow - Gestão de Foco"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição *</label>
            <textarea 
              required
              rows="3"
              placeholder="Breve descrição sobre as funcionalidades e o objetivo..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tecnologias (separadas por vírgula)</label>
            <input 
              type="text" 
              placeholder="React, Tailwind CSS, JavaScript"
              value={tecnologias}
              onChange={(e) => setTecnologias(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link do GitHub</label>
              <input 
                type="url" 
                placeholder="https://github.com/..."
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link do Demo</label>
              <input 
                type="url" 
                placeholder="https://..."
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem de Capa</label>
            <input 
              type="url" 
              placeholder="https://images.unsplash.com/..."
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors shadow-md mt-2"
          >
            Guardar Projeto
          </button>
        </form>
      </div>
    </div>
  );
}