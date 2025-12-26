import { Link } from 'react-router-dom';
import { Facebook, Youtube,  Phone, MapPin, Globe } from 'lucide-react';
import Logo from '../../assets/img/logo.jpg';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const linkHoverClasses = "hover:text-lime-500 transition-colors duration-300";
  const iconClasses = "text-lime-500 flex-shrink-0";

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 pb-10">

          {/* Logo y descripción */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-3 font-extrabold text-2xl text-white mb-4">
              <img
                src={Logo}
                alt="Centro de Granos Nacional Logo"
                className="w-10 h-10 object-contain rounded-full shadow-lg"
              />
              Centro de Granos
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Institución del Instituto de Investigaciones de Granos dedicada a la
              investigación, desarrollo e innovación en cultivos estratégicos.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
              Navegación
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className={linkHoverClasses}>Inicio</Link></li>
              <li><Link to="/investigaciones" className={linkHoverClasses}>Investigaciones</Link></li>
              <li><Link to="/publicaciones" className={linkHoverClasses}>Publicaciones</Link></li>
              <li><Link to="/eventos" className={linkHoverClasses}>Eventos</Link></li>
              <li><Link to="/contacto" className={linkHoverClasses}>Contacto</Link></li>
            </ul>
          </div>

          {/* Contacto real */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
              Contacto
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={18} className={iconClasses} />
                <span>4937 3769</span>
              </li>
              <li className="flex items-start gap-3">
                <Globe size={18} className={iconClasses} />
                <a
                  href="http://www.iigranos.cu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkHoverClasses}
                >
                  www.iigranos.cu
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className={`${iconClasses} mt-0.5`} />
                <span className="max-w-[220px]">
                  Autopista Novia del Mediodía Km 16 1/2, Bauta, Artemisa
                </span>
              </li>
            </ul>
          </div>

          {/* Redes sociales reales */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
              Síguenos
            </h4>

            <div className="flex gap-4 mb-8">
              <a
                href="https://www.facebook.com/GranosInstituto"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkHoverClasses} p-2 rounded-full border border-gray-700`}
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://youtube.com/@institutodeinvestigaciones6739"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkHoverClasses} p-2 rounded-full border border-gray-700`}
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>

            <h4 className="font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacidad" className={linkHoverClasses}>Política de Privacidad</Link></li>
              <li><Link to="/terminos" className={linkHoverClasses}>Términos de Servicio</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 my-8"></div>

        <div className="text-center text-gray-500 text-xs tracking-wider">
          <p>
            © {currentYear} Centro de Granos · Instituto de Investigaciones de Granos.
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
