//key
//sd - self described
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
export { default } from './with-stores-hoc';

// Export utility functions
export { toJS, clearAllPersistedStoresToAsyncStorage, getPersistedStoreKey } from './store-utils-zustand';
