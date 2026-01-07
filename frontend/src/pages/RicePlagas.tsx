import { useState } from "react";
import { ChevronDown } from "lucide-react";

/* =========================
   Tipos
========================= */
interface Plaga {
  id: number;
  nombre: string;
  descripcion: string;
  sintomas: string[];
  control: string;
}

/* =========================
   Datos
========================= */
const plagasArroz: Plaga[] = [
  {
    id: 1,
    nombre: "Pyricularia o Añublo del Arroz",
    descripcion:
      "Enfermedad fúngica causada por Magnaporthe oryzae.",
    sintomas: [
      "Manchas elípticas en hojas",
      "Secado de espigas",
      "Pérdida de rendimiento",
    ],
    control:
      "Uso de variedades resistentes y manejo adecuado del riego.",
  },
  {
    id: 2,
    nombre: "Chinche del Arroz",
    descripcion:
      "Insecto que se alimenta de los granos en formación.",
    sintomas: [
      "Granos manchados",
      "Disminución de la calidad del grano",
    ],
    control:
      "Monitoreo constante y control químico cuando sea necesario.",
  },
  {
    id: 3,
    nombre: "Barrenador del Tallo",
    descripcion:
      "Larva que perfora los tallos del arroz.",
    sintomas: [
      "Espigas blancas",
      "Marchitez de plantas",
    ],
    control:
      "Control biológico y manejo integrado de plagas.",
  },
];

/* =========================
   Componente
========================= */
const RicePlagas = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [plagaSeleccionada, setPlagaSeleccionada] = useState<Plaga | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-green-800 mb-8">
        Plagas y Enfermedades del Arroz en Cuba
      </h1>

      {/* Selector */}
      <div className="relative max-w-md mb-10">
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="flex w-full items-center justify-between rounded-xl border border-green-300 bg-white px-5 py-3 text-green-800 shadow-sm hover:bg-green-50"
        >
          {plagaSeleccionada
            ? plagaSeleccionada.nombre
            : "Seleccione una plaga o enfermedad"}
          <ChevronDown
            className={`h-5 w-5 transition-transform ${
              menuAbierto ? "rotate-180" : ""
            }`}
          />
        </button>

        {menuAbierto && (
          <ul className="absolute z-10 mt-2 w-full rounded-xl border border-green-200 bg-white shadow-lg">
            {plagasArroz.map((plaga) => (
              <li
                key={plaga.id}
                onClick={() => {
                  setPlagaSeleccionada(plaga);
                  setMenuAbierto(false);
                }}
                className="cursor-pointer px-5 py-3 text-green-700 hover:bg-green-100"
              >
                {plaga.nombre}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Detalle */}
      {plagaSeleccionada && (
        <div className="rounded-2xl bg-green-50 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            {plagaSeleccionada.nombre}
          </h2>

          <p className="mb-4 text-green-700">
            {plagaSeleccionada.descripcion}
          </p>

          <div className="mb-4">
            <h3 className="font-semibold text-green-800 mb-2">
              Síntomas
            </h3>
            <ul className="list-disc pl-6 text-green-700">
              {plagaSeleccionada.sintomas.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-green-800 mb-2">
              Medidas de Control
            </h3>
            <p className="text-green-700">
              {plagaSeleccionada.control}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RicePlagas;
