// src/components/PublicationCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Download, BookOpen, Clock, Users } from 'lucide-react';
import type { Publication } from '../../../data/publicationsData'; // Importación type-only

interface PublicationCardProps {
  publication: Publication;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
  const formattedDate = new Intl.DateTimeFormat('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(new Date(publication.publicationDate));

  const baseButtonClasses = "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-300 text-sm";
  const downloadButtonClasses = `${baseButtonClasses} bg-lime-600 text-white hover:bg-lime-700`;
  const viewButtonClasses = `${baseButtonClasses} bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300`;

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col justify-between border-t-4 border-lime-500 hover:shadow-2xl transition-shadow duration-300">
      
      {/* Información principal */}
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 leading-snug">
            {publication.title}
          </h3>
          {publication.isNew && (
            <span className="text-xs font-bold text-lime-700 bg-lime-100 px-3 py-1 rounded-full ml-4 flex-shrink-0">
              ¡Nuevo!
            </span>
          )}
        </div>

        {/* Metadatos */}
        <div className="space-y-1 text-gray-500 text-sm mb-4">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-lime-500" />
            <p className="font-medium">{publication.authors}</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-lime-500" />
            <p>Publicado el: {formattedDate}</p>
          </div>
        </div>

        {/* Resumen */}
        <p className="text-gray-600 mb-6 italic border-l-2 border-gray-200 pl-3">
          {publication.summary}
        </p>
      </div>

      {/* Botones de Acción */}
      <div className="flex gap-4 pt-4 border-t border-gray-100">
        <a 
          href={publication.pdfUrl} 
          download 
          target="_blank" 
          rel="noopener noreferrer" 
          className={downloadButtonClasses}
        >
          <Download size={18} />
          Descargar PDF
        </a>

        <Link 
          to={publication.viewUrl} 
          className={viewButtonClasses}
        >
          <BookOpen size={18} />
          Ver Publicación
        </Link>
      </div>
    </div>
  );
};

export default PublicationCard;