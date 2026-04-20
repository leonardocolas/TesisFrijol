import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EnfermedadItem {
  id: number;
  nombre: string;
  descripcion: string;
  ruta: string;
}

const enfermedadesArroz: EnfermedadItem[] = [
  {
    id: 1,
    nombre: 'Mancha parda',
    descripcion: 'Enfermedad fungica que afecta hojas y grano bajo alta humedad.',
    ruta: '/rice/enfermedades/mancha-parda',
  },
  {
    id: 2,
    nombre: 'Chinche del arroz',
    descripcion: 'Plaga que dania paniculas durante llenado y reduce calidad comercial.',
    ruta: '/rice/enfermedades/chinche-del-arroz',
  },
];

const RicePlagas = () => {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [seleccionada, setSeleccionada] = useState<EnfermedadItem | null>(null);

  const irADetalle = (item: EnfermedadItem) => {
    setSeleccionada(item);
    setMenuAbierto(false);
    navigate(item.ruta);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-3 text-3xl font-bold text-green-800">Enfermedades del Arroz</h1>
      <p className="mb-8 max-w-3xl text-green-700">
        Selecciona una enfermedad para abrir su pagina detallada con carrusel de imagenes y manejo recomendado.
      </p>

      <div className="relative mb-10 max-w-xl">
        <button
          onClick={() => setMenuAbierto((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-xl border border-green-300 bg-white px-5 py-3 text-left text-green-800 shadow-sm hover:bg-green-50"
        >
          {seleccionada ? seleccionada.nombre : 'Seleccione una enfermedad del arroz'}
          <ChevronDown className={`h-5 w-5 transition-transform ${menuAbierto ? 'rotate-180' : ''}`} />
        </button>

        {menuAbierto && (
          <ul className="absolute z-10 mt-2 w-full rounded-xl border border-green-200 bg-white shadow-lg">
            {enfermedadesArroz.map((item) => (
              <li
                key={item.id}
                onClick={() => irADetalle(item)}
                className="cursor-pointer px-5 py-3 text-green-700 hover:bg-green-100"
              >
                {item.nombre}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {enfermedadesArroz.map((item) => (
          <button
            key={item.id}
            onClick={() => irADetalle(item)}
            className="rounded-2xl border border-green-200 bg-green-50 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-green-100"
          >
            <h2 className="text-lg font-semibold text-green-800">{item.nombre}</h2>
            <p className="mt-2 text-sm text-green-700">{item.descripcion}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RicePlagas;
