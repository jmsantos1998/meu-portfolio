import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import LoginModal from './components/LoginModal';
import ProjectForm from './components/ProjectForm';
import Footer from './components/Footer';

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Estado para armazenar a tecnologia selecionada no filtro
  const [filtroTech, setFiltroTech] = useState("Todas");

  // Lista inicial de demonstração
  const projetosIniciais = [
    {
      id: 1,
      titulo: "FocusFlow - Gestão de Tarefas",
      descricao: "Aplicação para gestão de foco e estudo utilizando a técnica Pomodoro e organização por prioridades.",
      tecnologias: ["React", "Tailwind CSS", "JavaScript"],
      githubUrl: "https://github.com",
      demoUrl: "https://google.com",
      imagem: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      titulo: "Sistema de Cinema",
      descricao: "Plataforma web para reserva e consulta de sessões de cinema em tempo real.",
      tecnologias: ["Java", "HTML5", "CSS3"],
      githubUrl: "https://github.com",
      demoUrl: "",
      imagem: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Carrega do localStorage ou usa os projetos iniciais
  const [projetos, setProjetos] = useState(() => {
    const salvos = localStorage.getItem('meus_projetos');
    return salvos ? JSON.parse(salvos) : projetosIniciais;
  });

  // Salva no localStorage sempre que a lista muda
  useEffect(() => {
    localStorage.setItem('meus_projetos', JSON.stringify(projetos));
  }, [projetos]);

  const handleAddProject = (novoProjeto) => {
    setProjetos([novoProjeto, ...projetos]);
  };

  const handleRemoveProject = (id) => {
    if (confirm('Tem a certeza que deseja remover este projeto?')) {
      setProjetos(projetos.filter(p => p.id !== id));
    }
  };

  // 1. Pega todas as tecnologias únicas cadastradas nos projetos
  const todasTecnologias = [
    "Todas",
    ...Array.from(new Set(projetos.flatMap(p => p.tecnologias || [])))
  ];

  // 2. Filtra os projetos com base no botão clicado
  const projetosFiltrados = filtroTech === "Todas"
    ? projetos
    : projetos.filter(p => p.tecnologias && p.tecnologias.includes(filtroTech));

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 flex flex-col">
      <Navbar 
        usuarioLogado={usuario} 
        onOpenLogin={() => setIsLoginOpen(true)} 
        onLogout={() => setUsuario(null)}
      />

      <main className="max-w-6xl mx-auto px-4 py-8 flex-grow w-full">
        <section className="text-center py-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Plataforma de Portfólio
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Monitorize, exiba e partilhe os seus projetos de desenvolvimento numa interface moderna e responsiva.
          </p>

          {usuario && (
            <div className="mt-6">
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md transition-colors"
              >
                + Adicionar Novo Projeto
              </button>
            </div>
          )}
        </section>

        <section id="projetos" className="my-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Projetos em Destaque</h2>
            <span className="text-sm text-gray-500 font-medium">
              Exibindo: {projetosFiltrados.length} de {projetos.length} projetos
            </span>
          </div>

          {/* BARRA DE FILTROS POR TECNOLOGIA */}
          <div className="flex flex-wrap gap-2 mb-8">
            {todasTecnologias.map((tech) => (
              <button
                key={tech}
                onClick={() => setFiltroTech(tech)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filtroTech === tech
                    ? 'bg-blue-600 text-white shadow-sm scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* LISTA DE CARDS FILTRADA */}
          {projetosFiltrados.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <p className="text-gray-500">Nenhum projeto encontrado com a tecnologia "{filtroTech}".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projetosFiltrados.map(proj => (
                <div key={proj.id} className="relative group">
                  <ProjectCard projeto={proj} />
                  
                  {/* Botão de apagar projeto (apenas visível quando autenticado) */}
                  {usuario && (
                    <button
                      onClick={() => handleRemoveProject(proj.id)}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold p-2 rounded-full shadow-lg transition-transform transform hover:scale-105"
                      title="Remover Projeto"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Modal de Autenticação */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(userData) => setUsuario(userData)}
      />

      {/* Modal de Novo Projeto */}
      {isFormOpen && (
        <ProjectForm 
          onAddProject={handleAddProject}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {/* Rodapé do site */}
      <Footer />
    </div>
  );
}