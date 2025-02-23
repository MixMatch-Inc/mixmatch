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

export const useProfileStore = create(
  persist<ProfileState>(
    (set) => ({
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