import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EnfermedadItem {
  id: number;
  nombre: string;
  descripcion: string;
  ruta: string;
}

const enfermedadesMaiz: EnfermedadItem[] = [
  {
    id: 1,
    nombre: 'Gusano cogollero',
    descripcion: 'Plaga de alta incidencia en etapas tempranas, con daño en cogollo y hojas nuevas.',
    ruta: '/corn/enfermedades/gusano-cogollero',
  },
  {
    id: 2,
    nombre: 'Roya del maíz',
    descripcion: 'Enfermedad fúngica foliar que reduce área fotosintética y llenado de grano.',
    ruta: '/corn/enfermedades/roya-del-maiz',
  },
  {
    id: 3,
    nombre: 'Picudo del maíz',
    descripcion: 'Problema importante en postcosecha por perforación y pérdida de calidad del grano.',
    ruta: '/corn/enfermedades/picudo-del-maiz',
  },
];

const CornsPlagas = () => {
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
      <h1 className="mb-3 text-3xl font-bold text-green-800">Enfermedades del maíz</h1>
      <p className="mb-8 max-w-3xl text-green-700">
        Selecciona una enfermedad para ver su ficha técnica con carrusel de imágenes y recomendaciones de manejo.
      </p>

      <div className="relative mb-10 max-w-xl">
        <button
          onClick={() => setMenuAbierto((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-xl border border-green-300 bg-white px-5 py-3 text-left text-green-800 shadow-sm hover:bg-green-50"
        >
          {seleccionada ? seleccionada.nombre : 'Seleccione una enfermedad del maíz'}
          <ChevronDown className={`h-5 w-5 transition-transform ${menuAbierto ? 'rotate-180' : ''}`} />
        </button>

        {menuAbierto && (
          <ul className="absolute z-10 mt-2 w-full rounded-xl border border-green-200 bg-white shadow-lg">
            {enfermedadesMaiz.map((item) => (
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

      <div className="grid gap-4 md:grid-cols-3">
        {enfermedadesMaiz.map((item) => (
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

export default CornsPlagas;
