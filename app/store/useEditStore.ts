import { create } from 'zustand';

interface EditState {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  toggleEditing: () => void;
}

export const useEditStore = create<EditState>((set) => ({
  isEditing: false,
  setIsEditing: (value) => set({ isEditing: value }),
  toggleEditing: () => set((state) => ({ isEditing: !state.isEditing })),
})); 