import { Link } from 'react-router-dom';
// Importamos solo los iconos necesarios y mantenemos el color de acento vibrante
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '../../assets/img/logo.jpg'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const linkHoverClasses = "hover:text-lime-500 transition-colors duration-300";
  const iconClasses = "text-lime-500 flex-shrink-0"; 

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 pb-10">

          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-3 font-extrabold text-2xl text-white mb-4">
              <img 
                src={Logo}
                alt="Centro del Grano Logo" 
                className="w-10 h-10 object-contain rounded-full shadow-lg"
              />
              Centro del Grano
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Tu aliado confiable para la comercialización de granos de la más alta calidad en la región.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
              Navegación
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className={linkHoverClasses}>Inicio</Link></li>
              <li><Link to="/beans" className={linkHoverClasses}>Frijol</Link></li>
              <li><Link to="/corn" className={linkHoverClasses}>Maíz</Link></li>
              <li><Link to="/rice" className={linkHoverClasses}>Arroz</Link></li>
              <li><Link to="/contact" className={linkHoverClasses}>Contáctenos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
              Contactar
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={18} className={iconClasses} /> 
                <a href="tel:+15551234567" className={linkHoverClasses}>
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className={iconClasses} /> 
                <a href="mailto:info@centrodelgrano.com" className={linkHoverClasses}>
                  info@centrodelgrano.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className={`${iconClasses} mt-0.5`} /> 
                <span className="max-w-[200px]">
                  123 Calle del Grano, Ciudad Agricola, País
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
              Síguenos
            </h4>
            
            <div className="flex gap-4 mb-8">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${linkHoverClasses} p-2 rounded-full border border-gray-700`}
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${linkHoverClasses} p-2 rounded-full border border-gray-700`}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
             
            </div>

             <h4 className="font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy" className={linkHoverClasses}>Política de Privacidad</Link></li>
              <li><Link to="/terms" className={linkHoverClasses}>Términos de Servicio</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 my-8"></div>

        <div className="text-center text-gray-500 text-xs tracking-wider">
          <p>
            © {currentYear} Centro del Grano. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;