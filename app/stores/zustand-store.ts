/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the namespace for all stores
const namespace = 'AppStores_';

// Define store types
interface AppState {
  loading: boolean;
  loadingMessage: string;
  user: any | null;
  setLoading: (loading: boolean) => void;
  setLoadingMessage: (loadingMessage: string) => void;
  setUser: (user: any) => void;
  reset: () => void;
}

// Create the store with persistence
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      loading: false,
      loadingMessage: '',
      user: null,
      setLoading: (loading: boolean) => set({ loading }),
      setLoadingMessage: (loadingMessage: string) => set({ loadingMessage }),
      setUser: (user: any) => set({ user }),
      reset: () => set({ loading: false, loadingMessage: '', user: null }),
    }),
    {
      name: `${namespace}AppStore`,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Example of a store without persistence
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));