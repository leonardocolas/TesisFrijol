import { useState } from 'react';
import ImageUploader from '../components/beans/ImageUploader';
// Importamos la lógica de la API y las interfaces
import { 
  enviarImagenDiagnostico, 
  type DiagnosticoResponse
} from '../api/diagnostico'; // Ajusta esta ruta según donde guardaste el Paso 1

function BeansDeteccion() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl] = useState<string | null>(null);
  
  // Nuevos estados para manejar la petición API
  const [loading, setLoading] = useState<boolean>(false);
  const [resultado, setResultado] = useState<DiagnosticoResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    setSelectedFile(file);
    // Limpiamos resultados anteriores si el usuario cambia la imagen
    setResultado(null);
    setError(null);
    
    if (file) {
      console.log('Archivo seleccionado:', file.name);
    } else {
      console.log('Imagen borrada/no seleccionada.');
    }
  };

  // Función asíncrona para manejar el click del botón
  const handleDiagnostico = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setResultado(null);

    try {
      // Llamamos a la función de la API
      const data = await enviarImagenDiagnostico(selectedFile);
      setResultado(data);
      console.log("Diagnóstico recibido:", data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ocurrió un error inesperado al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Cargue su Foto</h1>
        
        <ImageUploader 
          onImageChange={handleImageChange} 
          initialImagePreview={previewUrl} 
        />

        {selectedFile && !resultado && !loading && (
          <p className="mt-4 text-sm text-green-700">
            ✅ Archivo listo para subir: <strong>{selectedFile.name}</strong>
          </p>
        )}

        {/* Mensaje de Error */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
            ⚠️ {error}
          </div>
        )}
        
        <button 
          onClick={handleDiagnostico} // Conectamos la función aquí
          className={`mt-6 w-full px-4 py-3 text-white font-semibold rounded-lg transition-colors duration-200 
            ${loading || !selectedFile 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700'}`}
          disabled={!selectedFile || loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analizando...
            </span>
          ) : (
            'Enviar para Diagnóstico'
          )}
        </button>

        {/* Sección de Resultados */}
        {resultado && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Resultados del Análisis</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
              <p className="text-sm text-gray-500 uppercase font-semibold">Diagnóstico General</p>
              <p className="text-lg font-medium text-gray-900 mt-1">{resultado.diagnostico_general}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
               <p className="text-blue-800">
                 Se detectaron <strong>{resultado.cantidad_hojas}</strong> hojas en la imagen.
               </p>
            </div>

            {/* Lista de detalles por hoja */}
            {resultado.detalles_por_hoja.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700">Detalles por hoja:</h3>
                {resultado.detalles_por_hoja.map((hoja, index) => (
                  <div key={index} className="p-3 bg-white border border-gray-200 rounded shadow-sm text-sm">
                    <p><strong>Hoja #{index + 1}:</strong> <span className={hoja.clase === 'Sana' ? 'text-green-600' : 'text-red-600'}>{hoja.clase}</span></p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-500">
                      <div>Prob. Sana: {(hoja.prob_sana * 100).toFixed(1)}%</div>
                      <div>Prob. Enferma: {(hoja.prob_mosaico_dorado * 100).toFixed(1)}%</div>
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