import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Trash, Plus, Video, Music, Image } from 'lucide-react';
import React from 'react';
import { useProfileStore } from '@/app/store/useProfileStore';
import { UploadModal } from '@/app/components/upload-modal';
import { motion, AnimatePresence } from 'framer-motion';

const getEmptyStateIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <Video className="w-8 h-8 text-white/50" />;
    case 'sample':
      return <Music className="w-8 h-8 text-white/50" />;
    case 'photo':
      return <Image className="w-8 h-8 text-white/50" />;
    default:
      return <Plus className="w-8 h-8 text-white/50" />;
  }
};

export function VideoGrid({ type = 'video' }: { type: 'video' | 'sample' | 'photo' }) {
  const isEditing = useProfileStore((state) => state.isEditing);
  const { images, addImage, removeImage } = useProfileStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    handleScroll();
  }, [images.length]);

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

  const handleUpload = async (file: File) => {
    await addImage(file, type);
    
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: scrollContainerRef.current.scrollWidth,
          behavior: 'smooth'
        });
      }
    }, 400);
  };

  const renderImageColumns = () => {
    if (images.length === 0) return null;

    const result = [];
    let currentIndex = 0;

    // Primera imagen siempre es grande
    result.push(
      <div key={images[0].id} className="w-[260px] h-[518px] relative shrink-0">
        <div className="h-full rounded-2xl overflow-hidden">
          {isEditing && (
            <div className="absolute top-4 right-4">
              <button 
                className="bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 pointer-events-auto"
                onClick={() => removeImage(images[0].id)}
              >
                <Trash className="w-8 h-8 bg-white p-1 rounded-full" color="#6E3FF3" />
              </button>
            </div>
          )}
          <motion.img
            src={images[0].src}
            alt={images[0].alt}
            className="w-full h-full object-cover"
            layoutId={images[0].id}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    );
    currentIndex = 1;

    // Resto de imágenes en pares
    while (currentIndex < images.length) {
      const pair = images.slice(currentIndex, currentIndex + 2);
      result.push(
        <div key={`pair-${currentIndex}`} className="w-[171px] grid grid-cols-1 gap-2 shrink-0">
          {pair.map((image) => (
            <AnimatePresence key={image.id} mode="popLayout">
              <div className={`${image.height} relative rounded-2xl overflow-hidden`}>
                {isEditing && (
                  <div className="absolute top-4 right-4">
                    <button 
                      className="bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 pointer-events-auto"
                      onClick={() => removeImage(image.id)}
                    >
                      <Trash className="w-8 h-8 bg-white p-1 rounded-full" color="#6E3FF3" />
                    </button>
                  </div>
                )}
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  layoutId={image.id}
                  initial={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </AnimatePresence>
          ))}
        </div>
      );
      currentIndex += 2;
    }

    return result;
  };

  return (
    <div className="w-full h-full relative">
      <div 
        ref={scrollContainerRef}
        className="w-full h-full overflow-x-auto hide-scrollbar"
        onScroll={handleScroll}
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

      {
        images.length > 0 && (
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
        )
      }

      {images.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-center px-4">
          <div className="bg-white/5 rounded-full p-4 mb-4">
            {getEmptyStateIcon(type)}
          </div>
          <h3 className="text-xl text-white font-bold mb-2">
            No {type}s yet
          </h3>
          <p className="text-white/70 mb-6 max-w-md">
            Share your {type === 'video' ? 'performances and mixes' : 
                       type === 'sample' ? 'sample mixes and tracks' : 
                       'event photos and moments'} with your audience
          </p>
          {isEditing && (
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-[20px] transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Upload your first {type}
            </button>
          )}
        </div>
      )}

      {isEditing && images.length > 0 && (
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="mt-4 h-[200px] w-full border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center hover:border-white/50 transition-colors"
          >
            <Plus className="w-8 h-8 text-white/50" />
          </button>
      )}

      <UploadModal
            isOpen={isUploadModalOpen}
            onClose={() => setIsUploadModalOpen(false)}
            onUpload={handleUpload}
            title="Upload New Video"
          />
    </div>
  );
}

export function SampleGrid() {
  return <VideoGrid type="sample" />;
}

export function PhotoGrid() {
  return <VideoGrid type="photo" />;
}
