import { useState } from 'react';
import ImageUploader from '../components/beans/ImageUploader'; // Ajusta la ruta

function BeansDeteccion() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl] = useState<string | null>(null);

  // Función callback que se ejecutará cada vez que se seleccione una imagen.
  const handleImageChange = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      console.log('Archivo seleccionado:', file.name);
      // Aquí podrías, por ejemplo, subir el archivo a un servidor.
    } else {
      console.log('Imagen borrada/no seleccionada.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Cargue su Foto </h1>
        
        {/* Aquí usas el componente ImageUploader */}
        <ImageUploader 
          onImageChange={handleImageChange} 
          initialImagePreview={previewUrl} // Puedes pasar una URL si el usuario ya tiene una imagen
        />

        {selectedFile && (
          <p className="mt-4 text-sm text-green-700">
            ✅ Archivo listo para subir: **{selectedFile.name}**
          </p>
        )}
        
        <button 
          className="mt-6 w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
          disabled={!selectedFile}
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}

export default BeansDeteccion
