import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Image { url: string; alt: string; }
interface PropertyCardSliderProps { images: Image[]; title: string; }

export default function PropertyCardSlider({ images, title }: PropertyCardSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const startX = useRef(0);
  const startY = useRef(0);
  const lastX = useRef(0);
  const isSwiping = useRef(false);

  const goPrev = () => setCurrentIndex((p) => (p === 0 ? images.length - 1 : p - 1));
  const goNext = () => setCurrentIndex((p) => (p === images.length - 1 ? 0 : p + 1));

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !images || images.length <= 1) return;

    const threshold = 35;      // distancia mínima horizontal
    const lockAngle = 12;      // cuánto más horizontal que vertical para “bloquear”
    
    const onStart = (e: TouchEvent) => {
      if (!e.touches?.length) return;
      const t = e.touches[0];
      startX.current = t.clientX;
      startY.current = t.clientY;
      lastX.current = t.clientX;
      isSwiping.current = false;
    };

    const onMove = (e: TouchEvent) => {
      if (!e.touches?.length) return;
      const t = e.touches[0];
      const dx = t.clientX - startX.current;
      const dy = t.clientY - startY.current;
      lastX.current = t.clientX;

      // Si el gesto es claramente horizontal, lo tratamos como swipe
      if (Math.abs(dx) > Math.abs(dy) + lockAngle) {
        isSwiping.current = true;
        // IMPORTANTE: esto requiere passive:false
        e.preventDefault();
      }
    };

    const onEnd = () => {
      const dx = lastX.current - startX.current;
      if (!isSwiping.current) return;

      if (dx < -threshold) goNext();
      else if (dx > threshold) goPrev();

      isSwiping.current = false;
    };

    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: false }); // clave
    el.addEventListener('touchend', onEnd, { passive: true });
    el.addEventListener('touchcancel', onEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onEnd);
      el.removeEventListener('touchcancel', onEnd);
    };
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">Sin imágenes</span>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="relative w-full h-full group select-none"
      style={{ touchAction: 'pan-y' }} // permite scroll vertical normal
    >
      <img
        src={images[currentIndex].url}
        alt={images[currentIndex].alt || title}
        className="w-full h-full object-cover pointer-events-none select-none"
        draggable={false}
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); goPrev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 size-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg z-20"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} className="text-primary" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); goNext(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg z-20"
            aria-label="Siguiente"
          >
            <ChevronRight size={20} className="text-primary" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex(i); }}
                className={`size-2 rounded-full transition-all ${i === currentIndex ? 'bg-white w-6' : 'bg-white/60'}`}
                aria-label={`Ir a imagen ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}