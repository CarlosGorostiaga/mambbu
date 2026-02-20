import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  locationDistrict: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  images: Array<{ url: string; alt: string }>;
  featured?: boolean;
  newListing?: boolean;
  verified?: boolean;
  quickResponse?: boolean;
}

interface PropertyCarouselProps {
  properties: Property[];
}

export default function PropertyCarousel({ properties }: PropertyCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [visibleCards, setVisibleCards] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Swipe refs (robusto iOS)
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const lastX = useRef<number | null>(null);
  const isSwiping = useRef(false);

  const total = properties?.length ?? 0;

  // --- Helpers ---
  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1280) return 3; // xl
    if (window.innerWidth >= 768) return 2; // md
    return 1;
  };

  // Ajusta visibleCards al resize
  useEffect(() => {
    const handleResize = () => setVisibleCards(getVisibleCards());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Número de “grupos” para dots en móvil
  const groupsCount = useMemo(() => {
    if (!total) return 0;
    return Math.max(1, Math.ceil(total / visibleCards));
  }, [total, visibleCards]);

  const clampIndex = (i: number) => {
    if (total <= 0) return 0;
    const maxStart = Math.max(0, total - visibleCards);
    return Math.min(Math.max(i, 0), maxStart);
  };

  const getCards = () => {
    const container = scrollContainerRef.current;
    if (!container) return [];
    return Array.from(container.querySelectorAll<HTMLElement>('[data-card="true"]'));
  };

  const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = getCards();
    if (!cards.length) return;

    const safe = clampIndex(index);
    const target = cards[safe];
    if (!target) return;

    container.scrollTo({ left: target.offsetLeft, behavior });
    setCurrentIndex(safe);
  };

  const scrollLeft = () => scrollToIndex(currentIndex - visibleCards);
  const scrollRight = () => scrollToIndex(currentIndex + visibleCards);

  // Update botones + currentIndex en base al scroll real
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let raf = 0;

    const update = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      setCanScrollLeft(container.scrollLeft > 2);
      setCanScrollRight(container.scrollLeft < maxScrollLeft - 2);

      // Calcula índice “más cercano” por offsetLeft real
      const cards = getCards();
      if (!cards.length) return;

      const x = container.scrollLeft;
      let nearest = 0;
      let best = Number.POSITIVE_INFINITY;

      for (let i = 0; i < cards.length; i++) {
        const d = Math.abs(cards[i].offsetLeft - x);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }

      // OJO: nearest puede estar fuera del rango de inicio válido
      setCurrentIndex(clampIndex(nearest));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, visibleCards]);

  // Si cambian properties (por render SSR o fetch), resetea a 0 y recalcula
  useEffect(() => {
    setCurrentIndex(0);
    // Espera a que pinte y existan los cards
    requestAnimationFrame(() => scrollToIndex(0, 'auto'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  // Swipe touch (iOS-friendly: touchmove passive:false)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || total <= 1) return;

    const threshold = 40;
    const lockAngle = 12;

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
      if (startX.current == null || startY.current == null) return;

      const t = e.touches[0];
      const dx = t.clientX - startX.current;
      const dy = t.clientY - startY.current;
      lastX.current = t.clientX;

      // gesto claramente horizontal => swipe
      if (Math.abs(dx) > Math.abs(dy) + lockAngle) {
        isSwiping.current = true;
        e.preventDefault(); // clave (requiere passive:false)
      }
    };

    const onEnd = () => {
      if (!isSwiping.current) {
        startX.current = null;
        startY.current = null;
        lastX.current = null;
        return;
      }

      if (startX.current == null || lastX.current == null) return;
      const dx = lastX.current - startX.current;

      if (dx < -threshold) scrollRight();
      else if (dx > threshold) scrollLeft();

      isSwiping.current = false;
      startX.current = null;
      startY.current = null;
      lastX.current = null;
    };

    container.addEventListener('touchstart', onStart, { passive: true });
    container.addEventListener('touchmove', onMove, { passive: false });
    container.addEventListener('touchend', onEnd, { passive: true });
    container.addEventListener('touchcancel', onEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', onStart);
      container.removeEventListener('touchmove', onMove);
      container.removeEventListener('touchend', onEnd);
      container.removeEventListener('touchcancel', onEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, visibleCards, total]);

  if (!properties || properties.length === 0) return null;

  return (
    <div className="relative group">
      {/* Botón izquierdo */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            scrollLeft();
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 size-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white border border-gray-200"
          aria-label="Anterior"
        >
          <ChevronLeft size={24} className="text-primary" />
        </button>
      )}

      {/* Contenedor scroll */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          touchAction: 'pan-y', // permite scroll vertical normal
        }}
      >
        {properties.map((property) => {
          const img0 = property.images?.[0];
          return (
            <a
              key={property.id}
              data-card="true"
              href={`/propiedades/${property.slug}`}
              className="flex-none w-[85vw] md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)] snap-start"
            >
              <div className="bg-white postcard-border group/card flex flex-col h-full relative overflow-hidden hover:shadow-xl transition-shadow">
                {/* Imagen */}
                <div className="relative h-72 overflow-hidden border-b border-gray-100">
                  <img
                    src={img0?.url || '/placeholder.jpg'}
                    alt={img0?.alt || property.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                    loading="lazy"
                    draggable={false}
                  />

                  {/* Badges */}
                  <div className="absolute top-6 left-6 z-10 flex flex-col gap-2 pointer-events-none">
                    {property.featured && <span className="cuba-badge">★ Anuncio Destacado</span>}
                    {property.verified && (
                      <div className="verified-stamp">
                        <span className="text-xs mr-1">✓</span>
                        Agencia
                        <br />
                        Verificada
                      </div>
                    )}
                  </div>

                  {/* Precio */}
                  <div className="absolute top-6 right-0 bg-primary text-white py-2 px-6 font-serif italic text-xl ticket-cut shadow-xl z-10 pointer-events-none">
                    {property.price}
                  </div>

                  {/* Badge inferior */}
                  <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                    {property.newListing && (
                      <span className="bg-sea-glass text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                        Nuevo Ingreso
                      </span>
                    )}
                    {property.quickResponse && (
                      <span className="bg-amber-500 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                        ⚡ Respuesta Rápida
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif font-bold text-xl italic leading-tight mb-2">
                    {property.title}
                  </h3>

                  <div className="postal-stamp rotate-2 inline-block mb-4">
                    <span className="text-[10px] block uppercase tracking-tighter font-sans not-italic text-gray-400 leading-none mb-1">
                      Zona Postal
                    </span>
                    <span className="text-sm">
                      {property.location}, {property.locationDistrict}
                    </span>
                  </div>

                  <div className="mt-auto flex items-center gap-4 text-sm text-gray-600 pt-4 border-t border-gray-50">
                    <span>{property.bedrooms} hab</span>
                    <span>•</span>
                    <span>{property.bathrooms} baños</span>
                    <span>•</span>
                    <span>{property.area}</span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Botón derecho */}
      {canScrollRight && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            scrollRight();
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 size-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white border border-gray-200"
          aria-label="Siguiente"
        >
          <ChevronRight size={24} className="text-primary" />
        </button>
      )}

      {/* Dots (solo móvil) */}
      {groupsCount > 1 && (
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {Array.from({ length: groupsCount }).map((_, i) => {
            const activeGroup = Math.floor(currentIndex / visibleCards);
            const isActive = activeGroup === i;

            return (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i * visibleCards)}
                className={`size-2 rounded-full transition-all ${
                  isActive ? 'bg-primary w-6' : 'bg-gray-300'
                }`}
                aria-label={`Ir a grupo ${i + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
