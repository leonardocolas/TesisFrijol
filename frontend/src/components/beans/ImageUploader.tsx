import React, { 
    useState, 
    useRef, 
    useCallback, 
    type DragEvent, 
    type ChangeEvent 
} from 'react'; 
import { Upload, Image, X } from 'lucide-react'
// Definición de props para el componente
interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  initialImagePreview?: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, initialImagePreview = null }) => {
  const [preview, setPreview] = useState<string | null>(initialImagePreview);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Manejar la selección de archivo
  const handleFileChange = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onImageChange(file);
      };
      reader.readAsDataURL(file);
    } else {
      // Opcional: Manejar archivos no-imagen o nulos
      alert('Por favor, selecciona un archivo de imagen válido.');
      setPreview(null);
      onImageChange(null);
    }
  }, [onImageChange]);

  // 2. Evento para el input de archivo
  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
    // Restablecer el valor del input para permitir la recarga del mismo archivo
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  // 3. Funciones para Drag and Drop
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necesario para permitir el drop
  };

  // 4. Limpiar la imagen
  const handleClearImage = () => {
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Limpiar el input file
    }
  };

  // 5. Simular click en el input oculto
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Clases Tailwind basadas en la paleta blanco/verde
  const baseClasses = "relative border-2 rounded-lg cursor-pointer transition-colors duration-200";
  const dropActiveClasses = "border-green-600 bg-green-50"; // Verde claro al arrastrar
  const dropInactiveClasses = "border-gray-300 hover:border-green-500 hover:bg-gray-50";
  const iconClasses = "w-10 h-10 text-green-600";
  const buttonClasses = "mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 shadow-md";
  const clearButtonClasses = "absolute top-2 right-2 p-1 bg-white/70 hover:bg-white rounded-full shadow-lg text-red-600 z-10 transition-opacity opacity-100 hover:opacity-80";
  

  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white shadow-lg rounded-xl">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">🖼️ Cargar Imagen</h3>
      
      {/* Input de archivo oculto */}
      <input
        type="file"
        id="image-upload-input"
        accept="image/*"
        // 'capture' es un atributo HTML que puede sugerir al dispositivo la fuente de captura (ej. cámara)
        // El comportamiento exacto depende del navegador y sistema operativo
        capture="environment" 
        ref={fileInputRef}
        onChange={onSelectFile}
        className="hidden"
      />

      <div
        className={`${baseClasses} ${isDragging ? dropActiveClasses : dropInactiveClasses}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={triggerFileInput} // Permite hacer click en toda el área
        style={{ minHeight: preview ? 'auto' : '200px' }} // Altura mínima si no hay imagen
      >
        {preview ? (
          // Vista previa de la imagen
          <div className="relative w-full h-full">
            <img src={preview} alt="Vista previa de la imagen" className="object-cover w-full h-auto max-h-96 rounded-lg" />
            
            {/* Botón para borrar la imagen */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Evita que el click se propague al div de arriba (triggerFileInput)
                handleClearImage();
              }}
              className={clearButtonClasses}
              aria-label="Borrar imagen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          // Área de carga (vacía)
          <div className="flex flex-col items-center justify-center p-6 text-center h-full">
            <Upload className={iconClasses} />
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium text-green-700">Haz click para seleccionar</span> o arrastra y suelta la imagen aquí.
            </p>
            <p className="text-xs text-gray-500 mt-1">Soporte para **cámara** o **galería** en móvil.</p>
          </div>
        )}
      </div>

      {!preview && (
        <button
          onClick={triggerFileInput}
          className={buttonClasses}
        >
          <div className="flex items-center justify-center">
            <Image className="w-5 h-5 mr-2" />
            Seleccionar Imagen
          </div>
        </button>
      )}
      
      {/* Info para el usuario */}
      <div className="mt-4 text-xs text-gray-500">
        <p>* Solo se permite la carga de archivos de imagen (JPG, PNG, etc.).</p>
      </div>
    </div>
  );
};

export default ImageUploader;