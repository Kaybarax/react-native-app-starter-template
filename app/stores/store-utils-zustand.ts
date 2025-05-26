//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { deepCloneObject } from '../util/util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _StoreKey_, _StoreSnapshot_ } from './actions-and-stores-data';

/**
 * A replacement for MobX's toJS function
 * Since zustand stores are already plain JavaScript objects, we just need to deep clone them
 * @param obj - The object to convert to a plain JavaScript object
 * @returns A plain JavaScript object
 */
export function toJS(obj: any): any {
  return deepCloneObject(obj);
}

/**
 * Persists a store to AsyncStorage
 * This function is kept for backward compatibility, but it's not needed with zustand
 * as zustand has built-in persistence
 * @param store - The store to persist
 */
export async function persistStoreToAsyncStorage(store: any): Promise<void> {
  // No-op as zustand handles persistence automatically
  return Promise.resolve();
}

/**
 * Persists multiple stores to AsyncStorage
 * This function is kept for backward compatibility, but it's not needed with zustand
 * as zustand has built-in persistence
 * @param stores - The stores to persist
 */
export async function persistStoresToAsyncStorage(stores: any[]): Promise<void> {
  // No-op as zustand handles persistence automatically
  return Promise.resolve();
}

/**
 * Clears all persisted stores from AsyncStorage
 */
export async function clearAllPersistedStoresToAsyncStorage(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const storeKeys = keys.filter(key => 
      key.includes(_StoreKey_) || key.includes(_StoreSnapshot_)
    );

    if (storeKeys.length > 0) {
      await AsyncStorage.multiRemove(storeKeys);
    }
  } catch (e) {
    console.log('clearAllPersistedStoresToAsyncStorage failed!!', e);
  }
}

/**
 * Gets a persisted store key
 * @param namespaceProvider - The namespace provider
 * @param assignedName - The assigned name
 * @returns The persisted store key
 */
export function getPersistedStoreKey(namespaceProvider: string, assignedName: string): string {
  return namespaceProvider + assignedName;
}
