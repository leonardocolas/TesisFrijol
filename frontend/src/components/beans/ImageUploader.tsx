import React, {
  useState,
  useRef,
  useCallback,
  type DragEvent,
  type ChangeEvent,
} from 'react';
import { Upload, Image as ImageIcon, X, Camera } from 'lucide-react';

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  initialImagePreview?: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageChange,
  initialImagePreview = null,
}) => {
  const [preview, setPreview] = useState<string | null>(initialImagePreview);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (file: File) => {
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          onImageChange(file);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Por favor, selecciona una imagen válida.');
        setPreview(null);
        onImageChange(null);
      }
    },
    [onImageChange],
  );

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
    event.target.value = '';
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClearImage = () => {
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraInput = () => {
    cameraInputRef.current?.click();
  };

  const baseClasses =
    'relative border-2 rounded-lg cursor-pointer transition-colors duration-200';
  const dropActiveClasses = 'border-green-600 bg-green-50';
  const dropInactiveClasses = 'border-gray-300 hover:border-green-500 hover:bg-gray-50';
  const iconClasses = 'w-10 h-10 text-green-600';
  const clearButtonClasses =
    'absolute top-2 right-2 p-1 bg-white/70 hover:bg-white rounded-full shadow-lg text-red-600 z-10 transition-opacity opacity-100 hover:opacity-80';
  const cameraButtonClasses =
    'w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 shadow-md';
  const fileButtonClasses =
    'w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors duration-200 border border-gray-300';

  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white shadow-lg rounded-xl">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Cargar imagen</h3>

      <input
        type="file"
        id="image-upload-input"
        accept="image/*"
        ref={fileInputRef}
        onChange={onSelectFile}
        className="hidden"
      />

      <input
        type="file"
        id="image-camera-input"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        onChange={onSelectFile}
        className="hidden"
      />

      <div
        className={`${baseClasses} ${isDragging ? dropActiveClasses : dropInactiveClasses}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        style={{ minHeight: preview ? 'auto' : '200px' }}
      >
        {preview ? (
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Vista previa de la imagen"
              className="object-cover w-full h-auto max-h-96 rounded-lg"
            />

            <button
              onClick={(event) => {
                event.stopPropagation();
                handleClearImage();
              }}
              className={clearButtonClasses}
              aria-label="Borrar imagen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center h-full">
            <Upload className={iconClasses} />
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium text-green-700">Haz clic para seleccionar</span> o
              arrastra y suelta la imagen aquí.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              En móvil puedes tomar una foto ahora o subir una imagen desde la galería.
            </p>
          </div>
        )}
      </div>

      {!preview && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button onClick={triggerCameraInput} className={cameraButtonClasses}>
            <div className="flex items-center justify-center">
              <Camera className="w-5 h-5 mr-2" />
              Tomar foto ahora
            </div>
          </button>
          <button onClick={triggerFileInput} className={fileButtonClasses}>
            <div className="flex items-center justify-center">
              <ImageIcon className="w-5 h-5 mr-2" />
              Subir desde archivos
            </div>
          </button>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <p>* Solo se permiten imágenes (JPG, PNG, WEBP, etc.).</p>
      </div>
    </div>
  );
};

export default ImageUploader;
