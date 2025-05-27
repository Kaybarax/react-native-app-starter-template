/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Clears all persisted stores from AsyncStorage
 */
export async function clearAllPersistedStoresToAsyncStorage(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const storeKeys = keys.filter(key => key.includes('AppStores_'));

    if (storeKeys.length > 0) {
      await AsyncStorage.multiRemove(storeKeys);
    }
  } catch (e) {
    console.log('clearAllPersistedStoresToAsyncStorage failed!!', e);
  }
}
