import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SocialLink {
  id: string;
  platform: 'instagram' | 'soundcloud' | 'spotify' | 'email';
  url: string;
  text: string;
}

export interface ProfileData {
  name: string;
  location: string;
  avatar: string;
  coverImage: string;
  tags: string[];
  description: string;
  socialLinks: SocialLink[];
}

interface ImageItem {
  id: string;
  src: string;
  alt: string;
  index: number;
  type: 'video' | 'sample' | 'photo';
}

interface ImageItemView {
  id: string;
  src: string;
  alt: string;
  height: string;
}

interface ProfileState {
  isEditing: boolean;
  profile: ProfileData;
  toggleEditing: () => void;
  updateProfile: (data: Partial<ProfileData>) => void;
  updateAvatar: (file: File) => Promise<void>;
  updateCoverImage: (file: File) => Promise<void>;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  updateSocialLink: (id: string, data: Partial<SocialLink>) => void;
  images: ImageItemView[];
  addImage: (file: File, type: 'video' | 'sample' | 'photo') => Promise<void>;
  removeImage: (imageId: string) => void;
}

const initialProfile: ProfileData = {
  name: "MIXER",
  location: "Los Angeles, CA",
  avatar: "/images/profile/main.png",
  coverImage: "/images/profile/background.png",
  tags: ['Pop', 'Electronic', 'Hip-hop'],
  description: "Elevate your party experience with DJ Beats Pro - the ultimate DJ app for mixing tracks and creating the perfect atmosphere for any event.",
  socialLinks: [
    { id: '1', platform: 'instagram', url: 'https://instagram.com/mixer', text: '@mixer' },
    { id: '2', platform: 'soundcloud', url: 'https://soundcloud.com/mixer', text: 'Mixes Vibe Master Mixes' },
    { id: '3', platform: 'spotify', url: 'https://spotify.com/mixer', text: 'DJ Vibe Master' },
    { id: '4', platform: 'email', url: 'mailto:djvibemaster@gmail.com', text: 'djvibemaster@gmail.com' },
  ]
};

const initialImages: ImageItem[] = [
  { 
    id: '1', 
    src: '/images/profile/image1.png', 
    alt: 'DJ Performance Night Club', 
    index: 0,
    type: 'video' 
  },
  { 
    id: '2', 
    src: '/images/profile/image2.png', 
    alt: 'Festival Performance', 
    index: 1,
    type: 'video' 
  },
  { 
    id: '3', 
    src: '/images/profile/image3.png', 
    alt: 'Concert Stage', 
    index: 2,
    type: 'video' 
  },
  { 
    id: '4', 
    src: '/images/profile/image4.png', 
    alt: 'DJ Set Performance', 
    index: 3, 
    type: 'video' 
  },
  { 
    id: '5', 
    src: '/images/profile/image5.png', 
    alt: 'Live Music Event', 
    index: 4, 
    type: 'video' 
  },
  { 
    id: '6', 
    src: '/images/profile/image6.png', 
    alt: 'Studio Session', 
    index: 5, 
    type: 'sample' 
  },
  { 
    id: '7', 
    src: '/images/profile/image7.png', 
    alt: 'Music Production', 
    index: 6, 
    type: 'sample' 
  },
  { 
    id: '8', 
    src: '/images/profile/image8.png', 
    alt: 'Mixing Console', 
    index: 7, 
    type: 'sample' 
  },
  { 
    id: '9', 
    src: '/images/profile/image9.png', 
    alt: 'Recording Session', 
    index: 8, 
    type: 'sample' 
  },
  { 
    id: '10', 
    src: '/images/profile/image3.png', 
    alt: 'Artist Portrait', 
    index: 9, 
    type: 'photo' 
  },
  { 
    id: '11', 
    src: '/images/profile/image1.png', 
    alt: 'Backstage Moment', 
    index: 10, 
    type: 'photo' 
  },
  { 
    id: '12', 
    src: '/images/profile/image7.png', 
    alt: 'Fan Interaction', 
    index: 11, 
    type: 'photo' 
  },
  { 
    id: '13', 
    src: '/images/profile/image9.png', 
    alt: 'Event Preparation', 
    index: 12, 
    type: 'photo' 
  },
  { 
    id: '14', 
    src: '/images/profile/image2.png', 
    alt: 'Stage Setup', 
    index: 13, 
    type: 'photo' 
  },
  { 
    id: '15', 
    src: '/images/profile/image5.png', 
    alt: 'Equipment Setup', 
    index: 14, 
    type: 'photo' 
  },
  { 
    id: '16', 
    src: '/images/profile/image8.png', 
    alt: 'Venue Overview', 
    index: 15, 
    type: 'photo' 
  },
  { 
    id: '17', 
    src: '/images/profile/image4.png', 
    alt: 'Crowd Interaction', 
    index: 16, 
    type: 'photo' 
  }
];

export const PREDEFINED_HEIGHTS = [
  'h-[518px]', 
  'h-[293px]', 
  'h-[210px]', 
  'h-[170px]', 
  'h-[332px]', 
  'h-[234px]', 
  'h-[268px]', 
  'h-[340px]', 
  'h-[162px]', 
];


const getImageHeight = (index: number): string => {
  const patternIndex = index % PREDEFINED_HEIGHTS.length;
  return PREDEFINED_HEIGHTS[patternIndex];
};

const createImageItem = (id: string, src: string, index: number): ImageItemView => {
  return {
    id,
    src,
    alt: 'DJ Performance',
    height: getImageHeight(index)
  };
};

export const useProfileStore = create(
  persist<ProfileState>(
    (set, get) => ({
      isEditing: false,
      profile: initialProfile,
      toggleEditing: () => set((state) => ({ isEditing: !state.isEditing })),
      
      updateProfile: (data) => 
        set((state) => ({
          profile: { ...state.profile, ...data }
        })),
      
      updateAvatar: async (file) => {
        const imageUrl = await fileToDataUrl(file);
        set((state) => ({
          profile: { ...state.profile, avatar: imageUrl }
        }));
      },

      updateCoverImage: async (file) => {
        const imageUrl = await fileToDataUrl(file);
        set((state) => ({
          profile: { ...state.profile, coverImage: imageUrl }
        }));
      },

      addTag: (tag) =>
        set((state) => ({
          profile: {
            ...state.profile,
            tags: [...state.profile.tags, tag]
          }
        })),

      removeTag: (tag) =>
        set((state) => ({
          profile: {
            ...state.profile,
            tags: state.profile.tags.filter((t) => t !== tag)
          }
        })),

      updateSocialLink: (id, data) =>
        set((state) => ({
          profile: {
            ...state.profile,
            socialLinks: state.profile.socialLinks.map((link) =>
              link.id === id ? { ...link, ...data } : link
            )
          }
        })),

      images: initialImages.map(image => createImageItem(image.id, image.src, image.index)),
      
      addImage: async (file: File, type) => { 
        const imageUrl = await fileToDataUrl(file);
        const newImage: ImageItem = {
          id: `new-${Date.now()}`,
          src: imageUrl,
          alt: file.name,
          index: get().images.length + 1,
          type
        };
        
        set((state) => ({
          images: [...state.images, createImageItem(newImage.id, newImage.src, newImage.index)]
        }));
      },

      removeImage: (imageId: string) => 
        set((state) => ({
          images: state.images.filter(img => img.id !== imageId).map((img, index) => createImageItem(img.id, img.src, index))
        })),
    }),
    {
      name: 'profile-storage',
    }
  )
);

// Función auxiliar para convertir File a Data URL
const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}; 