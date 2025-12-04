import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from '../../assets/img/logo.jpg';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] =useState(null as string | null);

  const links = [
    { name: "Home", to: "/" },
    { 
      name: "Frijol", 
      key: "frijol",
      subMenu: [
        { name: "Información General", to: "/beans" },
        { name: "Enfermedades y Plagas", to: "/beans/plagas" },
        { name: "Modelo de Detección", to: "/beans/deteccion" },
      ]
    },
    { 
      name: "Maíz", 
      key: "maiz",
      subMenu: [
        { name: "Información General", to: "/corn" },
        { name: "Enfermedades y Plagas", to: "/corn/plagas" },
      ]
    },
    { 
      name: "Arroz", 
      key: "arroz",
      subMenu: [
        { name: "Información General", to: "/rice" },
        { name: "Enfermedades y Plagas", to: "/rice/plagas" },
      ]
    },
  ];

const handleSubMenuToggle = (key: string) => {
  setSubMenuOpen(subMenuOpen === key ? null : key);
};

  const closeMenus = () => {
    setOpen(false);
    setSubMenuOpen(null);
  };

  return (
    <header className="w-full bg-green-200d fixed top-0 z-50 shadow-sm">
      <nav className="container bg-green-100 mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <img 
            src={Logo}
            alt="Logo" 
            className="w-10 h-10 object-contain rounded-full"
          />
          <span className="hidden sm:block text-gray-800 uppercase">
            Centro del Grano
          </span>
        </Link>

        {/* Menu Desktop (Hidden on MD breakpoint and below) */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-semibold">
          {links.map((link) => (
            // Contenedor principal para el dropdown (Desktop)
            <li key={link.name} className="relative group">
              {link.subMenu ? (
                <>
                  {/* Título del Dropdown */}
                  <span className="cursor-pointer hover:text-green-700 transition flex items-center gap-1 py-1">
                    {link.name}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  
                  {/* Submenu Desktop */}
                  <ul className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-64 bg-white shadow-xl rounded-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-200 invisible z-50 py-2 border-t-2 border-green-700">
                    {link.subMenu.map((subLink) => (
                      <li key={subLink.to}>
                        <NavLink
                          to={subLink.to}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${isActive ? "text-green-700 font-bold" : ""}`
                          }
                        >
                          {subLink.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                // Enlace sin submenú (Home)
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive ? "text-green-700" : "hover:text-green-700 transition"
                  }
                >
                  {link.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Contact Button Desktop */}
        <div className="hidden md:block">
          <Link
            to="/contact"
            className="text-green-700 border border-green-700 px-5 py-2 rounded-full hover:bg-green-700 hover:text-white transition font-semibold"
          >
            Contáctenos
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 overflow-hidden ${
          open ? "max-h-96" : "max-h-0" // Aumento el max-h para que quepan los submenús
        }`}
      >
        <ul className="flex flex-col items-center gap-4 py-4 font-medium text-gray-700">
          {links.map((link) => (
            <li key={link.name} className="w-full text-center">
              {link.subMenu ? (
                <>
                  {/* Título del Dropdown (Mobile) - Botón de toggle */}
                  <button
                    onClick={() => handleSubMenuToggle(link.key)}
                    className={`py-1 flex justify-center items-center w-full ${subMenuOpen === link.key ? "text-green-700" : ""}`}
                  >
                    {link.name}
                    <svg className={`w-4 h-4 ml-1 transform transition-transform ${subMenuOpen === link.key ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Submenu Mobile */}
                  <ul className={`transition-max-height duration-300 ease-in-out bg-gray-50/50 ${subMenuOpen === link.key ? "max-h-32 py-2" : "max-h-0 overflow-hidden"}`}>
                    {link.subMenu.map((subLink) => (
                      <li key={subLink.to}>
                        <NavLink
                          to={subLink.to}
                          onClick={closeMenus} // Cierra todos los menús al navegar
                          className={({ isActive }) =>
                            `block py-1 text-sm ${isActive ? "text-green-700 font-bold" : ""}`
                          }
                        >
                          {subLink.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                // Enlace sin submenú (Home)
                <NavLink
                  to={link.to}
                  onClick={closeMenus}
                  className={({ isActive }) => isActive ? "text-green-700" : ""}
                >
                  {link.name}
                </NavLink>
              )}
            </li>
          ))}

          {/* Contact Mobile */}
          <Link
            to="/contact"
            className="bg-green-700 text-white px-6 py-2 rounded-full"
            onClick={closeMenus}
          >
            Contáctenos
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;