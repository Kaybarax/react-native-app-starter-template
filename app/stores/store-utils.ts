/* eslint-disable prettier/prettier */
//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {
    deepCloneObject,
    isNullUndefined,
    objectAHasSameKeysAsObjectB,
    objectKeyExists,
    stringifyObject,
} from '../util/util';
import {_StoreKey_, _StoreSnapshot_} from './actions-and-stores-data';
import AsyncStorage from '@react-native-community/async-storage';
import {
    getItemFromAsyncStorage,
    getObjectFromAsyncStorage,
    removeItemFromAsyncStorage,
    storeObjectToAsyncStorage,
} from '../util/react-native-based-utils';
import StoreProviders from './stores-providers';
import {toJS} from 'mobx';

// Define types for store provider and store
interface StoreProvider {
    storeKey: (namespace: string) => string;
    storeProvidedBy: (namespace: string) => any;
    storeModelSnapshot: Promise<any>;
}

interface Store {
    storeName: string;
    storeKey: string;
    namespace: string;
    [key: string]: any;
}

/**
 * sd _ Kaybarax
 * @param storeKey
 * @param storeProvider
 * @param storeNamespace
 * @returns {Promise<null|*>}
 */
export const persistedStoreFromAsyncStorage = async (
    storeKey: string, 
    storeProvider: StoreProvider, 
    storeNamespace: string
): Promise<Store | null> => {

    let savedStore = await getObjectFromAsyncStorage(storeKey);
    console.log('FOUND PERSISTED STORE', savedStore);

    if (isNullUndefined(savedStore)) {
        return null;
    }

    //if store schema is updated, then update persisted store model
    let storeFromSchema = storeProvider.storeProvidedBy(storeNamespace);
    let matchingKeys = objectAHasSameKeysAsObjectB(savedStore, storeFromSchema);
    console.log('Store schema has not changed', matchingKeys);
    console.log('For store', storeFromSchema['storeName']);

    if (!matchingKeys) {

        //remove deleted/renamed keys
        for (let key in savedStore) {
            if (!objectKeyExists(storeFromSchema, key)) {
                delete savedStore[key];
            }
        }

        //add added keys
        for (let key in storeFromSchema) {
            if (!objectKeyExists(savedStore, key)) {
                savedStore[key] = storeFromSchema[key];
            }
        }

        //break memory reference
        savedStore = deepCloneObject(savedStore);

        //update persisted store
        await storeObjectToAsyncStorage(storeKey, storeFromSchema);

    }

    //if internal structure has changed, also do an update
    let storeModelSnapshot = await storeProvider.storeModelSnapshot;
    console.log('storeModelSnapshot', storeModelSnapshot);

    if (isNullUndefined(storeModelSnapshot)) {
        return savedStore;
    }

    let fromStoreSchema = deepCloneObject(storeFromSchema);
    delete fromStoreSchema['storeName'];
    delete fromStoreSchema['storeKey'];
    delete fromStoreSchema['namespace'];

    let fromStoreModelSnapshot = deepCloneObject(storeModelSnapshot);
    delete fromStoreModelSnapshot['storeName'];
    delete fromStoreModelSnapshot['storeKey'];
    delete fromStoreModelSnapshot['namespace'];

    console.log('fromStoreSchema', fromStoreSchema);
    console.log('fromStoreModelSnapshot', fromStoreModelSnapshot);

    if (stringifyObject(fromStoreSchema) !== stringifyObject(fromStoreModelSnapshot)) {

        console.log('internalStructureChanged');

        //update internal changes
        for (let key in fromStoreSchema) {
            if (
                objectKeyExists(fromStoreModelSnapshot, key) &&
                (stringifyObject(fromStoreSchema[key] !== stringifyObject(fromStoreModelSnapshot[key])))
            ) {
                //don't care about data, override,
                // because structure has changed
                savedStore[key] = fromStoreSchema[key];
            }
        }

        //break memory reference
        savedStore = deepCloneObject(savedStore);

        //update persisted store
        await storeObjectToAsyncStorage(storeKey, savedStore);

        //update snapshot
        await storeObjectToAsyncStorage(_StoreSnapshot_ + storeFromSchema.storeName, storeFromSchema);

    }

    return savedStore;

};

/**
 * sd _ Kaybarax
 * @param store
 */
export async function persistStoreToAsyncStorage(store: Store): Promise<void> {
    console.log('persistStoreToAsyncStorage store', toJS(store));
    try {
        let storeKey = store.storeKey;
        //only persist if data has changed
        let oldStoreData = await getObjectFromAsyncStorage(storeKey);
        let newStoreData = toJS(store);
        console.log('persistStoreToAsyncStorage oldStoreData', oldStoreData);
        console.log('persistStoreToAsyncStorage newStoreData', newStoreData);
        if (stringifyObject(oldStoreData) === stringifyObject(newStoreData)) {
            return;
        }
        console.log('persistStoreToAsyncStorage DATA CHANGE FOR STORE', store.storeName);
        await storeObjectToAsyncStorage(storeKey, store);
        console.log('persistStoreToAsyncStorage storeKey', storeKey);
        //store the current store model snapshot, if not there already,
        //for store object's internal structural changes, monitoring and update
        let storeModelStructure = await getItemFromAsyncStorage(store.storeName);
        console.log('persistStoreToAsyncStorage storeModelStructure', storeModelStructure);
        if (isNullUndefined(storeModelStructure)) {
            let storeProvider = (StoreProviders as Record<string, StoreProvider>)[store.storeName];
            console.log('persistStoreToAsyncStorage storeProvider', storeProvider);
            await storeObjectToAsyncStorage(_StoreSnapshot_ + store.storeName, storeProvider.storeProvidedBy(store.namespace));
            console.log('persistStoreToAsyncStorage storeModelStructure added');
        }
        console.log('persistStoreToAsyncStorage SUCCESS');
    } catch (err) {
        console.log('persistStoreToAsyncStorage failure!!');
        console.log('Critical failure in persistence of store!!');
        //and stop persistence
        await clearAllPersistedStoresToAsyncStorage();
    }
}

/**
 * sd _ Kaybarax
 * @param stores
 * @returns {Promise<void>}
 */
export async function persistStoresToAsyncStorage(stores: Store[]): Promise<void> {
    console.log('persistStoresToAsyncStorage stores', stores);
    try {
        for (let store of stores) {
            await persistStoreToAsyncStorage(store);
        }
    } catch (err) {
        console.log('persistStoresToAsyncStorage failure!!');
        console.log('Critical failure in persistence of stores!!');
        //and stop persistence
        await clearAllPersistedStoresToAsyncStorage();
    }
}

/**
 * sd _ Kaybarax
 */
export async function clearAllPersistedStoresToAsyncStorage(): Promise<void> {
    try {
        let keys = Object.keys(AsyncStorage);
        for (let key of keys) {
            let storeKey = '' + key;
            if (storeKey.includes(_StoreKey_) ||
                storeKey.includes(_StoreSnapshot_)) {
                await removeItemFromAsyncStorage(storeKey);
            }
        }
    } catch (e) {
        console.log('clearAllPersistedStoresToAsyncStorage failed!!');
    }
}

/**
 * sd _ Kaybarax
 * @param namespaceProvider
 * @param assignedName
 * @returns {*}
 */
export function getPersistedStoreKey(namespaceProvider: string, assignedName: string): string {
    return namespaceProvider + assignedName;
}

/**
 * sd _ Kaybarax
 * @param storeName
 * @param storeSchemaInstance
 * @returns {Promise<T | *>}
 */
export function createStoreModelSnapshot(storeName: string, storeSchemaInstance: any): Promise<any> {
    return getObjectFromAsyncStorage(_StoreSnapshot_ + storeName)
        .then(item => item || storeSchemaInstance)
        .catch(error => {
            console.log('createStoreModelSnapshot error', error);
            return storeSchemaInstance;
        });
}