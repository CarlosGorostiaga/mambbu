import { useState } from 'react';

interface SearchBoxProps {
  className?: string;
}

export default function SearchBox({ className = '' }: SearchBoxProps) {
  const [location, setLocation] = useState('La Habana');
  const [propertyType, setPropertyType] = useState('Todos');
  const [priceRange, setPriceRange] = useState('Todos');
  const [bedrooms, setBedrooms] = useState('Todas');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica de búsqueda
    console.log({ location, propertyType, priceRange, bedrooms });
  };

  return (
    <div className={`bg-white postcard-border p-2 shadow-2xl ${className}`}>
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="p-4 border-r border-gray-100 flex flex-col justify-center">
            <label className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Ubicación
            </label>
            <select 
              className="border-0 p-0 text-sm font-semibold focus:ring-0 w-full bg-transparent"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option>La Habana</option>
              <option>Varadero</option>
              <option>Trinidad</option>
              <option>Santiago</option>
            </select>
          </div>
          <div className="p-4 border-r border-gray-100 flex flex-col justify-center">
            <label className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Tipo
            </label>
            <select 
              className="border-0 p-0 text-sm font-semibold focus:ring-0 w-full bg-transparent"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option>Todos</option>
              <option>Casa</option>
              <option>Apartamento</option>
              <option>Villa</option>
            </select>
          </div>
          <div className="p-4 border-r border-gray-100 flex flex-col justify-center">
            <label className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Precio
            </label>
            <select 
              className="border-0 p-0 text-sm font-semibold focus:ring-0 w-full bg-transparent"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option>Todos</option>
              <option>$50k - $150k</option>
              <option>$150k - $300k</option>
              <option>$300k+</option>
            </select>
          </div>
          <div className="p-4 flex flex-col justify-center">
            <label className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Habitaciones
            </label>
            <select 
              className="border-0 p-0 text-sm font-semibold focus:ring-0 w-full bg-transparent"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            >
              <option>Todas</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
            </select>
          </div>
        </div>
        <button 
          type="submit"
          className="bg-primary text-white px-10 py-5 font-bold uppercase tracking-wider text-xs hover:bg-sea-glass hover:text-primary transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-base">search</span>
          Buscar
        </button>
      </form>
    </div>
  );
}
