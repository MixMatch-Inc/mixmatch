import { PlusCircle } from "lucide-react";

interface GridProps {
  isEditing: boolean;
}

export function VideoGrid({ isEditing }: GridProps) {
  return (
    <div className="relative">
      <div className="flex gap-4">
        {/* Imagen grande izquierda */}
        <div className="w-[400px] relative">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden">
            <img
              src="/images/profile/image1.png"
              alt="DJ Performance"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Grid de imágenes derecha */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <img
              src="/images/profile/image2.png"
              alt="DJ Performance"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <img
              src="/images/profile/image3.png"
              alt="DJ Performance"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <img
              src="/images/profile/image4.png"
              alt="DJ Performance"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <img
              src="/images/profile/image5.png"
              alt="DJ Performance"
              className="w-full h-full object-cover"
            />
          </div>
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
