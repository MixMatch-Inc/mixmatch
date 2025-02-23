import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Trash } from 'lucide-react';
import React from 'react';
import { useProfileStore } from '@/app/store/useProfileStore';

  

export function VideoGrid() {
  const isEditing = useProfileStore((state) => state.isEditing);
  const { images, addImage, removeImage } = useProfileStore();
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
    if (images.length === 1) {
      return (
        <div className="w-[260px] h-[518px] relative shrink-0">
          <div className="h-full rounded-2xl overflow-hidden">
            {isEditing && (
              <div className="absolute top-4 right-4">
                <button className="bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 pointer-events-auto" onClick={() => removeImage(images[0].id)}>
                <Trash className="w-8 h-8 bg-white p-1 rounded-full" color="#6E3FF3" />
                </button>
              </div>
            )}
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    }

    const result = [];
    let currentIndex = 0;

    while (currentIndex < images.length) {
      if (currentIndex % 9 === 0 || (currentIndex === images.length - 1 && currentIndex % 2 === 0)) {
        result.push(
          <div key={images[currentIndex].id} className="w-[260px] h-[518px] relative shrink-0">
            <div className="h-full rounded-2xl overflow-hidden">
              {isEditing && (
                <div className="absolute top-4 right-4">
                  <button className="bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 pointer-events-auto" onClick={() => console.log(images, currentIndex % 9)}>
                    <Trash className="w-8 h-8 bg-white p-1 rounded-full" color="#6E3FF3" />
                  </button>
                </div>
              )}
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
                {isEditing && (
                  <div className="absolute top-4 right-4">
                    <button className="bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 pointer-events-auto" onClick={() => removeImage(image.id)}>
                      <Trash className="w-8 h-8 bg-white p-1 rounded-full" color="#6E3FF3" />
                    </button>
                  </div>
                )}
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

  return (
    <div className="w-full h-full relative">
      <div 
        ref={scrollContainerRef}
        className="w-full h-full overflow-x-auto hide-scrollbar"
      >
        <div className="flex gap-4 min-w-max p-1">
          {renderImageColumns()}
        </div>

        <div 
          className={`absolute -left-1 top-0 h-full w-40 bg-gradient-to-r from-[#21202D] via-[#21202D]/75 to-transparent pointer-events-none transition-opacity duration-300 ${
            showLeftButton ? 'opacity-100' : 'opacity-0'
          }`} 
        />

        <div 
          className={`absolute -right-1 top-0 h-full w-40 bg-gradient-to-l from-[#21202D] via-[#21202D]/75 to-transparent pointer-events-none transition-opacity duration-300 ${
            showRightButton ? 'opacity-100' : 'opacity-0'
          }`} 
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full max-w-[1480px] mx-auto">
          <button 
            onClick={() => scrollTo('left')}
            className={`w-16 h-16 absolute left-5 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 pointer-events-auto ${
              showLeftButton ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
            }`}
          >
            <ArrowRight className="w-5 h-5 text-white rotate-180" />
          </button>

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

export function SampleGrid() {
  return <VideoGrid />;
}

export function PhotoGrid() {
  return <VideoGrid />;
}
