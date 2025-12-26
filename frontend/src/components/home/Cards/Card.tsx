import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ image, title, description, link }) => {
  return (
    <div
      className={`
        w-[320px] flex-shrink-0 
        bg-white rounded-3xl overflow-hidden 
        shadow-lg 
        transition-all duration-400 ease-out
        hover:shadow-2xl 
        hover:translate-y-[-8px]
        hover:scale-[1.02]
        group
        border border-gray-100
      `}
    >
      {/* Image Container */}
      <div 
        className={`
          h-[220px] 
          relative 
          overflow-hidden
          bg-gradient-to-br from-gray-50 to-gray-100
        `}
      >
        <Link to={link} className="block w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-10" />
          <img
            src={image}
            alt={title}
            className="
              w-full h-full 
              object-cover 
              transition-all duration-500 ease-out
              group-hover:scale-110
            "
          />
        </Link>
      </div>

      {/* Content Area */}
      <div className="p-8 bg-white">
        {/* Centered Title */}
        <div className="flex justify-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 tracking-tight text-center">
            {title}
          </h3>
        </div>

        <p className="text-gray-600 text-base mb-8 leading-relaxed line-clamp-3 text-center">
          {description}
        </p>

        {/* Centered Button */}
        <div className="flex justify-center">
          <Link 
            to={link}
            className="
              inline-flex items-center justify-center
              px-8 py-3
              bg-gradient-to-r from-green-500 to-green-600 
              text-white 
              font-semibold text-sm
              rounded-full
              shadow-lg
              transition-all duration-300
              hover:from-orange-600 hover:to-green-700
              hover:shadow-xl
              hover:scale-105
              gap-2
              group/button
            "
          >
            <span>Ver Detalles</span>
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;