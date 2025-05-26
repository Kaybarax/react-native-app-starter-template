/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */
import React from 'react';
import { storeHooks } from './zustand-stores';
import { StoreNames } from './store-schemas';

// Type for the store hooks
type StoreHook = () => any;

// Type for the store hooks map
type StoreHooksMap = {
  [key: string]: StoreHook;
};

/**
 * A hook that provides access to the specified stores
 * @param storeNames - Array of store names to access
 * @returns An object with the stores
 */
export const useStores = (storeNames: string[]) => {
  // Create an object to hold the stores
  const stores: Record<string, any> = {};

  // Add each requested store to the stores object
  storeNames.forEach(storeName => {
    if (storeHooks[storeName]) {
      stores[storeName] = storeHooks[storeName]();
    } else {
      console.warn(`Store ${storeName} not found`);
    }
  });

  return stores;
};

/**
 * A higher-order component that provides the specified stores to the wrapped component
 * This is a replacement for the WithStoresHoc from mobx-react
 * @param Wrapped - The component to wrap
 * @param storeNames - Array of store names to provide to the component
 * @returns A new component with the stores provided as props
 */
const WithStoresHoc = (Wrapped: React.ComponentType<any>, storeNames: string[]) => {
  // Return a new component
  return function WithStores(props: any) {
    // Use the useStores hook to get the stores
    const stores = useStores(storeNames);

    // Pass the stores and the original props to the wrapped component
    return <Wrapped {...props} {...stores} />;
  };
};

export default WithStoresHoc;
