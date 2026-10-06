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
  const [filtroTech, setFiltroTech] = useState("Todas");

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

  const [projetos, setProjetos] = useState(() => {
    const salvos = localStorage.getItem('meus_projetos');
    return salvos ? JSON.parse(salvos) : projetosIniciais;
  });

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

  const todasTecnologias = [
    "Todas",
    ...Array.from(new Set(projetos.flatMap(p => p.tecnologias || [])))
  ];

  const projetosFiltrados = filtroTech === "Todas"
    ? projetos
    : projetos.filter(p => p.tecnologias && p.tecnologias.includes(filtroTech));

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col font-sans antialiased">
      <Navbar 
        usuarioLogado={usuario} 
        onOpenLogin={() => setIsLoginOpen(true)} 
        onLogout={() => setUsuario(null)}
      />

      {/* ÁREA HERO / CABEÇALHO COM GRADIENTE */}
      <section className="bg-gradient-to-b from-blue-50/60 via-slate-50/30 to-transparent border-b border-slate-200/50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4 tracking-wide uppercase">
            Portfólio & Projetos
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Desenvolvimento & Soluções Web
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Exibição modular de projetos, experimentos e sistemas desenvolvidos com foco em usabilidade, performance e código limpo.
          </p>

          {usuario && (
            <div className="mt-8">
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                + Adicionar Novo Projeto
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL / LISTA */}
      <main className="max-w-6xl mx-auto px-4 py-10 flex-grow w-full">
        <section id="projetos">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Projetos em Destaque</h2>
              <p className="text-xs text-slate-500 mt-1">Filtre por tecnologia para explorar os trabalhos.</p>
            </div>
            <span className="text-xs text-slate-500 font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
              {projetosFiltrados.length} de {projetos.length} projetos
            </span>
          </div>

          {/* BARRINHA DE FILTROS ESTILIZADA */}
          <div className="flex flex-wrap gap-2 mb-8 bg-slate-200/50 p-1.5 rounded-xl w-fit border border-slate-200/60">
            {todasTecnologias.map((tech) => (
              <button
                key={tech}
                onClick={() => setFiltroTech(tech)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filtroTech === tech
                    ? 'bg-white text-blue-600 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* GRID DE CARDS */}
          {projetosFiltrados.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
              <p className="text-slate-500 font-medium">Nenhum projeto encontrado para a tecnologia "{filtroTech}".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projetosFiltrados.map(proj => (
                <div key={proj.id} className="relative group">
                  <ProjectCard projeto={proj} />
                  
                  {usuario && (
                    <button
                      onClick={() => handleRemoveProject(proj.id)}
                      className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold p-2 rounded-full shadow-lg transition-transform transform hover:scale-110 z-10"
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

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(userData) => setUsuario(userData)}
      />

      {isFormOpen && (
        <ProjectForm 
          onAddProject={handleAddProject}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      <Footer />
    </div>
  );
}