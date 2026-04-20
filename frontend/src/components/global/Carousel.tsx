import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  images: string[];
  interval?: number;
  altPrefix?: string;
  className?: string;
  imageClassName?: string;
}

const Carousel = ({
  images,
  interval = 5000,
  altPrefix = 'Imagen',
  className = '',
  imageClassName = 'aspect-[16/9]',
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images.length) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [images.length, interval]);

  useEffect(() => {
    if (currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, images.length]);

  if (!images.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center text-slate-500 shadow-sm">
        No hay imagenes para mostrar.
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div
      className={`relative mx-auto w-full overflow-hidden rounded-[2rem] bg-slate-100 shadow-[0_20px_70px_-30px_rgba(15,23,42,0.45)] ${className}`}
    >
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt={`${altPrefix} ${index + 1}`}
            className={`h-full w-full shrink-0 object-cover ${imageClassName}`}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 to-transparent" />

      {images.length > 1 && (
        <>
          <div className="absolute inset-y-0 left-0 flex items-center px-4">
            <button
              type="button"
              onClick={goToPrevious}
              className="rounded-full border border-white/35 bg-black/35 p-2.5 text-white backdrop-blur transition hover:bg-black/55"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center px-4">
            <button
              type="button"
              onClick={goToNext}
              className="rounded-full border border-white/35 bg-black/35 p-2.5 text-white backdrop-blur transition hover:bg-black/55"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {images.map((_, index) => (
              <button
                key={`indicator-${index}`}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Ir a la imagen ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute bottom-5 right-5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
