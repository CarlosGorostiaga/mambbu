import { useRef, useState } from 'react';
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

  const startX = useRef<number | null>(null);
  const isPointerDown = useRef(false);

  const goToPrevious = (e?: React.MouseEvent | React.PointerEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e?: React.MouseEvent | React.PointerEvent) => {
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

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Solo swipe táctil
    if (e.pointerType !== 'touch') return;

    isPointerDown.current = true;
    startX.current = e.clientX;

    // Captura el pointer aunque el dedo pase por overlays
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'touch') return;
    if (!isPointerDown.current || startX.current === null) return;

    const diff = startX.current - e.clientX;
    const threshold = 35;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) goToNext();
      else goToPrevious();
    }

    isPointerDown.current = false;
    startX.current = null;
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
      className="relative w-full h-full group select-none"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <img
        src={images[currentIndex].url}
        alt={images[currentIndex].alt || title}
        className="w-full h-full object-cover pointer-events-none select-none"
        draggable={false}
        loading="lazy"
        decoding="async"
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 size-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg z-20"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} className="text-primary" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg z-20"
            aria-label="Siguiente"
          >
            <ChevronRight size={20} className="text-primary" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
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

          <div className="absolute top-4 right-4 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm z-20">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}