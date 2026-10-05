import React from 'react';

export default function Footer() {
  return (
    <footer id="contato" className="bg-slate-900 text-gray-300 py-10 mt-16 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-3">⚡ DevPortfolio</h3>
          <p className="text-sm text-gray-400">
            Plataforma desenvolvida para exibição de projetos, trabalhos académicos e portfólio profissional.
          </p>
        </div>

        <div>
          <h4 className="text-white text-md font-semibold mb-3">Links Rápidos</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#projetos" className="hover:text-indigo-400 transition-colors">Projetos</a></li>
            <li><a href="#contato" className="hover:text-indigo-400 transition-colors">Contato</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-md font-semibold mb-3">Redes & Contato</h4>
          <p className="text-sm text-gray-400 mb-2">Entre em contato para colaborações ou oportunidades:</p>
          <div className="flex gap-4 text-sm font-medium">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 pt-6 border-t border-slate-800 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} DevPortfolio. Todos os direitos reservados.
      </div>
    </footer>
  );
}