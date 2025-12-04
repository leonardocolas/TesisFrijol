// src/components/PublicationsList.tsx
import React from 'react';
import { FileText } from 'lucide-react';
import PublicationCard from './PublicationCard';
import { publicationsData } from '../../../data/publicationsData'; // Importación normal para datos

const PublicationsList: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        
        {/* Título de la Sección */}
        <div className="text-center mb-16">
          <FileText size={40} className="mx-auto mb-3 text-lime-600" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Nuestras Publicaciones Activas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Accede a nuestros últimos reportes de mercado, estudios de sostenibilidad y análisis de cosechas.
          </p>
        </div>

        {/* Búsqueda y Filtros */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <input 
            type="search"
            placeholder="Buscar por título o autor..."
            className="w-full md:flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 text-gray-700 transition"
          />
          <select className="w-full md:w-auto p-3 border border-gray-300 rounded-lg text-gray-700 hover:border-lime-500 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition">
            <option>Ordenar por: Más reciente</option>
            <option>Ordenar por: Título (A-Z)</option>
            <option>Filtrar por: Año (2024)</option>
          </select>
        </div>

        {/* Grid de Publicaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publicationsData.map((pub) => (
            <PublicationCard key={pub.id} publication={pub} />
          ))}
        </div>

        {/* Botón para Cargar Más */}
        {publicationsData.length >= 6 && (
          <div className="text-center mt-16">
            <button className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition duration-300 shadow-lg">
              Cargar más publicaciones (12 total)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicationsList;