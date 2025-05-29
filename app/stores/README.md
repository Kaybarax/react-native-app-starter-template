# Zustand Stores

This directory contains the Zustand stores for state management in the application.

## What is Zustand?

[Zustand](https://github.com/pmndrs/zustand) is a small, fast and scalable state-management solution for React. It has a simple API based on hooks and doesn't require complex boilerplate code.

## Available Stores

### AppStore

The `AppStore` is a persistent store that manages application-wide state such as:
- Loading state
- Loading messages
- User information

```typescript
import { useAppStore } from '../stores';

// Reading state
const loading = useAppStore(state => state.loading);
const user = useAppStore(state => state.user);

// Updating state
useAppStore.getState().setLoading(true);
useAppStore.getState().setUser({ id: 1, name: 'John Doe' });

// Resetting state
useAppStore.getState().reset();
```

### CounterStore

The `CounterStore` is a simple example store that manages a counter:

```typescript
import { useCounterStore } from '../stores';

// Reading state
const count = useCounterStore(state => state.count);

// Updating state
useCounterStore.getState().increment();
useCounterStore.getState().decrement();

// Resetting state
useCounterStore.getState().reset();
```

## Creating New Stores

To create a new store, follow this pattern:

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the store's state and actions
interface MyStoreState {
  someValue: string;
  setSomeValue: (value: string) => void;
  reset: () => void;
}

// For non-persistent stores
export const useMyStore = create<MyStoreState>((set) => ({
  someValue: '',
  setSomeValue: (value: string) => set({ someValue: value }),
  reset: () => set({ someValue: '' }),
}));

// For persistent stores
export const useMyPersistentStore = create<MyStoreState>()(
  persist(
    (set) => ({
      someValue: '',
      setSomeValue: (value: string) => set({ someValue: value }),
      reset: () => set({ someValue: '' }),
    }),
    {
      name: 'my-store-name',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

Remember to export your new store from the `index.ts` file.