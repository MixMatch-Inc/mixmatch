import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialProfile, initialMediaItems } from '../lib/mock';
import { ImageItem, ImageItemView, ProfileData, SocialLink } from '../interfaces/pofile';

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
  videos: ImageItemView[];
  samples: ImageItemView[];
  photos: ImageItemView[];
  addVideo: (file: File) => Promise<void>;
  addSample: (file: File) => Promise<void>;
  addPhoto: (file: File) => Promise<void>;
  removeVideo: (imageId: string) => void;
  removeSample: (imageId: string) => void;
  removePhoto: (imageId: string) => void;
}

const PREDEFINED_HEIGHTS = [
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
  if (index === 0) {
    return 'h-[518px]';
  }

  const adjustedIndex = (index - 1) % PREDEFINED_HEIGHTS.length;
  return PREDEFINED_HEIGHTS[adjustedIndex];
};

const createImageItem = (id: string, src: string, index: number): ImageItemView => {
  return {
    id,
    src,
    alt: `DJ Performance ${index + 1}`,
    height: getImageHeight(index)
  };
};

export const useProfileStore = create(
  persist<ProfileState>(
    (set, get) => ({
      isEditing: false,
      profile: initialProfile,
      videos: initialMediaItems.filter(image => image.type === 'video').map((image, index) => createImageItem(image.id, image.src, index)),
      samples: initialMediaItems.filter(image => image.type === 'sample').map((image, index) => createImageItem(image.id, image.src, index)),
      photos: initialMediaItems.filter(image => image.type === 'photo').map((image, index) => createImageItem(image.id, image.src, index)),
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

      addVideo: async (file: File) => {
        const imageUrl = await fileToDataUrl(file);
        const newImage: ImageItem = {
          id: `new-${Date.now()}`,
          src: imageUrl,
          alt: file.name,
          index: get().videos.length + 1,
          type: 'video'
        };

        set((state) => ({
          videos: [...state.videos, newImage].map((img, index) => createImageItem(img.id, img.src, index))
        }));
      },

      removeVideo: (imageId: string) =>
        set((state) => ({
          videos: state.videos.filter(img => img.id !== imageId).map((img, index) => createImageItem(img.id, img.src, index))
        })),

      addSample: async (file: File) => {
        const imageUrl = await fileToDataUrl(file);
        const newImage: ImageItem = {
          id: `new-${Date.now()}`,
          src: imageUrl,
          alt: file.name,
          index: get().samples.length + 1,
          type: 'sample'
        };

        set((state) => ({
          samples: [...state.samples, newImage].map((img, index) => createImageItem(img.id, img.src, index))
        }));
      },

      removeSample: (imageId: string) =>
        set((state) => ({
          samples: state.samples.filter(img => img.id !== imageId).map((img, index) => createImageItem(img.id, img.src, index))
        })),

      addPhoto: async (file: File) => {
        const imageUrl = await fileToDataUrl(file);
        const newImage: ImageItem = {
          id: `new-${Date.now()}`,
          src: imageUrl,
          alt: file.name,
          index: get().photos.length + 1,
          type: 'photo'
        };

        set((state) => ({
          photos: [...state.photos, newImage].map((img, index) => createImageItem(img.id, img.src, index))
        }));
      },

      removePhoto: (imageId: string) =>
        set((state) => ({
          photos: state.photos.filter(img => img.id !== imageId).map((img, index) => createImageItem(img.id, img.src, index))
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