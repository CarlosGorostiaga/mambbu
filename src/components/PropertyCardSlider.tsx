import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Image {
  url: string;
  alt: string;
}

interface PropertyCardSliderProps {
  images: Image[];
  title: string;
}

export default function PropertyCardSlider({ images, title }: PropertyCardSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Refs para swipe (evita el lag del state)
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goToPrevious = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const x = e.targetTouches[0]?.clientX ?? 0;
    touchStartX.current = x;
    touchEndX.current = x; // importante: inicializa end
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0]?.clientX ?? touchEndX.current;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();

    const start = touchStartX.current;
    const end = touchEndX.current;

    if (start == null || end == null) return;

    const distance = start - end;
    const threshold = 40; // un pelín más sensible que 50

    if (distance > threshold) goToNext();       // swipe izquierda
    else if (distance < -threshold) goToPrevious(); // swipe derecha

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">Sin imágenes</span>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full group touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={images[currentIndex].url}
        alt={images[currentIndex].alt || title}
        className="w-full h-full object-cover select-none"
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 size-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={20} className="text-primary" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
            aria-label="Siguiente imagen"
          >
            <ChevronRight size={20} className="text-primary" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => goToSlide(index, e)}
                className={`size-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-6' : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}