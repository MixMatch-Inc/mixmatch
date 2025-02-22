interface GridProps {
  isEditing: boolean;
}

export function VideoGrid({ isEditing }: GridProps) {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full overflow-x-auto hide-scrollbar">
        <div className="flex gap-4 min-w-max p-1">
          {/* Imagen grande */}
          <div className="w-[260px] h-[518px] relative shrink-0">
            <div className="h-full rounded-2xl overflow-hidden">
              <img
                src="/images/profile/image1.png"
                alt="DJ Performance"
                className="w-full h-full object-cover"
              />
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
