/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

// Export all the zustand stores
export {
  useAppStore,
  useLoginStore,
  usePage1ExampleStore,
  usePage2ExampleStore,
  usePage3ExampleStore,
  usePage4ExampleStore,
  useRecipeBoxStore,
  storeHooks,
} from './zustand-stores';

// Export the useStores hook for accessing multiple stores
export { useStores } from './with-stores-hook';

// Export the WithStoresHoc for backward compatibility
export { default as WithStoresHoc } from './with-stores-hoc';

// Export utility functions
export { clearAllPersistedStoresToAsyncStorage } from './store-utils-zustand';

// Create a singleton instance of all stores for compatibility with the old approach
import {
  useAppStore,
  useLoginStore,
  usePage1ExampleStore,
  usePage2ExampleStore,
  usePage3ExampleStore,
  usePage4ExampleStore,
  useRecipeBoxStore,
} from './zustand-stores';

class AppStores {
  stores: Record<string, any>;
  appStoresLoaded: boolean;

  constructor() {
    this.stores = {
      appStore: useAppStore.getState(),
      loginStore: useLoginStore.getState(),
      page1ExampleStore: usePage1ExampleStore.getState(),
      page2ExampleStore: usePage2ExampleStore.getState(),
      page3ExampleStore: usePage3ExampleStore.getState(),
      page4ExampleStore: usePage4ExampleStore.getState(),
      recipeBoxStore: useRecipeBoxStore.getState(),
    };
    this.appStoresLoaded = true;
  }

  loadAppStores = async (): Promise<void> => {
    // This is a no-op now as zustand handles persistence
    //  update the store object with the current state
    this.stores = {
      appStore: useAppStore.getState(),
      loginStore: useLoginStore.getState(),
      page1ExampleStore: usePage1ExampleStore.getState(),
      page2ExampleStore: usePage2ExampleStore.getState(),
      page3ExampleStore: usePage3ExampleStore.getState(),
      page4ExampleStore: usePage4ExampleStore.getState(),
      recipeBoxStore: useRecipeBoxStore.getState(),
    };
    this.appStoresLoaded = true;
    return Promise.resolve();
  };
}

export default new AppStores();
