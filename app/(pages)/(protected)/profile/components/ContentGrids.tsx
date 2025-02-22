import { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import React from 'react';

interface GridProps {
  isEditing: boolean;
}

interface ImageItem {
  id: string;
  src: string;
  alt: string;
  height: string;
}

const GAP_HEIGHT = 8; // gap-2 en Tailwind equivale a 8px

// Alturas predefinidas para el patrón base de 9 imágenes
const PREDEFINED_HEIGHTS = [
  'h-[518px]', // Primera imagen (sola)
  'h-[293px]', // Columna 1, imagen 1
  'h-[210px]', // Columna 1, imagen 2
  'h-[170px]', // Columna 2, imagen 1
  'h-[332px]', // Columna 2, imagen 2
  'h-[234px]', // Columna 3, imagen 1
  'h-[268px]', // Columna 3, imagen 2
  'h-[340px]', // Columna 4, imagen 1
  'h-[162px]', // Columna 4, imagen 2
];

// Pares de alturas adicionales que suman exactamente 518px
const HEIGHT_PAIRS = [
  [320, 190], // 320 + 190 + 8 = 518px
  [290, 220], // 290 + 220 + 8 = 518px
  [270, 240], // 270 + 240 + 8 = 518px
  [310, 200], // 310 + 200 + 8 = 518px
  [280, 230], // 280 + 230 + 8 = 518px
];

// Función auxiliar para determinar la altura de una imagen
const getImageHeight = (index: number): string => {
  // Usar módulo para repetir el patrón cada 9 imágenes
  const patternIndex = index % PREDEFINED_HEIGHTS.length;
  return PREDEFINED_HEIGHTS[patternIndex];
};

// Función para crear un objeto de imagen
const createImageItem = (id: string, src: string, index: number): ImageItem => {
  return {
    id,
    src,
    alt: 'DJ Performance',
    height: getImageHeight(index)
  };
};

// Array inicial de imágenes
const INITIAL_IMAGES: ImageItem[] = [
  createImageItem('1', '/images/profile/image1.png', 0),
  createImageItem('2', '/images/profile/image2.png', 1),
  createImageItem('3', '/images/profile/image3.png', 2),
  createImageItem('4', '/images/profile/image4.png', 3),
  createImageItem('5', '/images/profile/image5.png', 4),
  createImageItem('6', '/images/profile/image6.png', 5),
  createImageItem('7', '/images/profile/image7.png', 6),
  createImageItem('8', '/images/profile/image8.png', 7),
  createImageItem('9', '/images/profile/image9.png', 8),
  createImageItem('10', '/images/profile/image3.png', 9),
  createImageItem('11', '/images/profile/image1.png', 10),
  createImageItem('12', '/images/profile/image7.png', 11),
  createImageItem('13', '/images/profile/image9.png', 12),
  createImageItem('14', '/images/profile/image2.png', 13),
  createImageItem('15', '/images/profile/image5.png', 14),
  createImageItem('16', '/images/profile/image8.png', 15),
  createImageItem('17', '/images/profile/image4.png', 16),
];

export function VideoGrid({ isEditing }: GridProps) {
  const [images, setImages] = useState<ImageItem[]>(INITIAL_IMAGES);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 20);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const scrollTo = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === 'right' ? clientWidth : -clientWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const renderImageColumns = () => {
    // Si solo hay una imagen, renderizarla grande
    if (images.length === 1) {
      return (
        <div className="w-[260px] h-[518px] relative shrink-0">
          <div className="h-full rounded-2xl overflow-hidden">
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    }

    // Procesar las imágenes normalmente
    const result = [];
    let currentIndex = 0;

    while (currentIndex < images.length) {
      // Si es la primera imagen de un grupo de 9 o si es la última imagen sola
      if (currentIndex % 9 === 0 || (currentIndex === images.length - 1 && currentIndex % 2 === 0)) {
        result.push(
          <div key={images[currentIndex].id} className="w-[260px] h-[518px] relative shrink-0">
            <div className="h-full rounded-2xl overflow-hidden">
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
        currentIndex++;
      } else {
        // Procesar par de imágenes
        const pair = images.slice(currentIndex, currentIndex + 2);
        result.push(
          <div 
            key={`pair-${currentIndex}`}
            className="w-[171px] grid grid-cols-1 gap-2 shrink-0"
          >
            {pair.map((image) => (
              <div 
                key={image.id}
                className={`${image.height} relative rounded-2xl overflow-hidden`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        );
        currentIndex += 2;
      }
    }

    return result;
  };

  // Función para añadir una nueva imagen
  const addNewImage = () => {
    const newIndex = images.length;
    const newImage = createImageItem(
      `${newIndex + 1}`,
      `/images/profile/new-image-${newIndex + 1}.png`,
      newIndex
    );
    setImages([...images, newImage]);
  };

  return (
    <div className="w-full h-full relative">
      <div 
        ref={scrollContainerRef}
        className="w-full h-full overflow-x-auto hide-scrollbar"
      >
        <div className="flex gap-4 min-w-max p-1">
          {renderImageColumns()}
        </div>

        {/* Gradiente izquierdo */}
        <div 
          className={`absolute -left-1 top-0 h-full w-40 bg-gradient-to-r from-[#21202D] via-[#21202D]/75 to-transparent pointer-events-none transition-opacity duration-300 ${
            showLeftButton ? 'opacity-100' : 'opacity-0'
          }`} 
        />

        {/* Gradiente derecho */}
        <div 
          className={`absolute -right-1 top-0 h-full w-40 bg-gradient-to-l from-[#21202D] via-[#21202D]/75 to-transparent pointer-events-none transition-opacity duration-300 ${
            showRightButton ? 'opacity-100' : 'opacity-0'
          }`} 
        />
      </div>

      {/* Contenedor de botones fuera del scroll */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full max-w-[1480px] mx-auto">
          {/* Botón izquierdo */}
          <button 
            onClick={() => scrollTo('left')}
            className={`w-16 h-16 absolute left-5 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 pointer-events-auto ${
              showLeftButton ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
            }`}
          >
            <ArrowRight className="w-5 h-5 text-white rotate-180" />
          </button>

          {/* Botón derecho */}
          <button 
            onClick={() => scrollTo('right')}
            className={`w-16 h-16 absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 pointer-events-auto ${
              showRightButton ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function SampleGrid({ isEditing }: GridProps) {
  return <VideoGrid isEditing={isEditing} />;
}

export function PhotoGrid({ isEditing }: GridProps) {
  return <VideoGrid isEditing={isEditing} />;
}
