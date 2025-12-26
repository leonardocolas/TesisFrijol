import { useState } from 'react';
import ImageUploader from '../components/beans/ImageUploader';
import { enviarImagenDiagnostico, type DiagnosticoResponse } from '../api/diagnostico';

interface DiagnosticoConPromedio extends DiagnosticoResponse {
  promedioSana: number;
  promedioMosaico: number;
}

// Función para mapear clases a nombres amigables
const mostrarClase = (clase: string) => {
  if (clase.toLowerCase() === 'sana') return 'Sana';
  if (clase.toLowerCase() === 'mosaico_dorado') return 'Mosaico Dorado';
  return clase;
};

function BeansDeteccion() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultado, setResultado] = useState<DiagnosticoConPromedio | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleImageChange = (file: File | null) => {
    setSelectedFile(file);
    setResultado(null);
    setError(null);
    setShowDetails(false);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleDiagnostico = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setResultado(null);

    try {
      const data = await enviarImagenDiagnostico(selectedFile);

      // Calcular promedio de probabilidades
      const totalHojas = data.detalles_por_hoja.length;
      let sumaSana = 0;
      let sumaMosaico = 0;

      data.detalles_por_hoja.forEach((hoja) => {
        sumaSana += hoja.prob_sana;
        sumaMosaico += hoja.prob_mosaico_dorado;
      });

      const promedioSana = totalHojas ? sumaSana / totalHojas : 0;
      const promedioMosaico = totalHojas ? sumaMosaico / totalHojas : 0;

      const diagnostico_general =
        promedioSana >= promedioMosaico ? 'Sana' : 'Mosaico Dorado';

      setResultado({
        ...data,
        diagnostico_general,
        promedioSana,
        promedioMosaico,
      });
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-6">Cargue su Foto</h1>

        <ImageUploader onImageChange={handleImageChange} initialImagePreview={previewUrl} />

        {selectedFile && !resultado && !loading && (
          <p className="mt-4 text-sm text-green-700">
            ✅ Archivo listo para subir: <strong>{selectedFile.name}</strong>
          </p>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
            ⚠️ {error}
          </div>
        )}

        <button
          onClick={handleDiagnostico}
          className={`mt-6 w-full px-4 py-3 text-white font-semibold rounded-lg transition-colors duration-200 
            ${loading || !selectedFile ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
          disabled={!selectedFile || loading}
        >
          {loading ? 'Analizando...' : 'Enviar para Diagnóstico'}
        </button>

        {resultado && (
          <div className="mt-8 border-t pt-6 space-y-6 flex flex-col items-center">
            {/* Diagnóstico general con círculo de porcentaje */}
            <div className="relative w-40 h-40">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
                <circle
                  className="text-gray-200"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  cx="18"
                  cy="18"
                  r="16"
                />
                <circle
                  className="text-green-500"
                  strokeWidth="4"
                  strokeDasharray={`${(resultado.promedioSana * 100).toFixed(0)}, 100`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  cx="18"
                  cy="18"
                  r="16"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <p className="text-sm text-gray-700">
                  Sana: {(resultado.promedioSana * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-700">
                  Mosaico Dorado: {(resultado.promedioMosaico * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Diagnóstico debajo del círculo */}
            <p className="text-lg font-bold mt-4">
              {mostrarClase(resultado.diagnostico_general)}
            </p>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {showDetails ? 'Ocultar detalles' : 'Ver detalles por hoja'}
            </button>

            {/* Lista de detalles por hoja */}
            {showDetails && resultado.detalles_por_hoja.length > 0 && (
              <div className="space-y-3 mt-4 w-full">
                <h3 className="font-semibold text-gray-700">Detalles por hoja:</h3>
                {resultado.detalles_por_hoja.map((hoja, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white border border-gray-200 rounded shadow-sm text-sm flex justify-between items-center"
                  >
                    <div>
                      <p>
                        <strong>Hoja #{index + 1}:</strong>{' '}
                        <span
                          className={
                            hoja.clase.toLowerCase() === 'sana'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }
                        >
                          {mostrarClase(hoja.clase)}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Prob. Sana: {(hoja.prob_sana * 100).toFixed(2)}% &nbsp;|&nbsp; Prob. Enferma:{' '}
                        {(hoja.prob_mosaico_dorado * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BeansDeteccion;
