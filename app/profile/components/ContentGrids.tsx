import { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface GridProps {
  isEditing: boolean;
}

export function VideoGrid({ isEditing }: GridProps) {
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

  return (
    <div className="w-full h-full relative">
      <div 
        ref={scrollContainerRef}
        className="w-full h-full overflow-x-auto hide-scrollbar"
      >
        <div className="flex gap-4 min-w-max p-1">
          {/* Primera imagen con botón flotante */}
          <div className="w-[260px] h-[518px] relative shrink-0">
            <div className="h-full rounded-2xl overflow-hidden">
              <img
                src="/images/profile/image1.png"
                alt="DJ Performance"
                className="w-full h-full object-cover"
              />
              {/* Botón flotante */}
              <button className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 15L12 7L20 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Grid de imágenes derecha */}
          <div className="w-[171px] grid grid-cols-1 gap-2 shrink-0">
            <div className="h-[293px] relative rounded-2xl overflow-hidden">
              <img
                src="/images/profile/image2.png"
                alt="DJ Performance"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-[210px] relative rounded-2xl overflow-hidden">
              <img
                src="/images/profile/image3.png"
                alt="DJ Performance"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-[171px] grid grid-cols-1 gap-2 shrink-0">
            <div className="h-[170px] relative rounded-2xl overflow-hidden">
              <img
                src="/images/profile/image4.png"
                alt="DJ Performance"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-[332px] relative rounded-2xl overflow-hidden">
              <img
                src="/images/profile/image5.png"
                alt="DJ Performance"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-[171px] grid grid-cols-1 gap-2 shrink-0">
            <div className="h-[234px] relative rounded-2xl overflow-hidden">
              <img
                src="/images/profile/image6.png"
                alt="DJ Performance"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-[268px] relative rounded-2xl overflow-hidden">
              <img
                src="/images/profile/image7.png"
                alt="DJ Performance"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-[171px] grid grid-cols-1 gap-2 shrink-0">
            <div className="h-[340px] relative rounded-2xl overflow-hidden">
              <img
                src="/images/profile/image8.png"
                alt="DJ Performance"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-[162px] relative rounded-2xl overflow-hidden">
              <img
                src="/images/profile/image9.png"
                alt="DJ Performance"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
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
            className={`absolute left-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 pointer-events-auto ${
              showLeftButton ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
            }`}
          >
            <ArrowRight className="w-5 h-5 text-white rotate-180" />
          </button>

          {/* Botón derecho */}
          <button 
            onClick={() => scrollTo('right')}
            className={`absolute right-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 pointer-events-auto ${
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
