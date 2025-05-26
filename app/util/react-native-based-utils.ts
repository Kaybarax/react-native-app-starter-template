/* eslint-disable prettier/prettier */
//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import {Alert, ToastAndroid} from 'react-native';
import {isEmptyArray, isEmptyString, isNullUndefined, isObject, stringifyObject} from './util';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * sd _ Kaybarax
 * The following mimics React's natural state update behavior.
 * This function might be required to be executed in instances where
 * MobX has run too fast at ~50ms - 100ms, beyond React's state update speed
 * Also useful in ensuring imported components are loaded,
 * in the case in which they cannot be accessed
 */
export function enforceReactNaturalStateUpdateBehavior(self: any): void {
  if (isNullUndefined(self) || typeof self !== 'object') {
    console.log('State update failed');
    return;
  }
  if (typeof self.state !== 'object') {
    self.state = {updated: false};
  }
  self.setState({updated: true});
}

/**
 * sd _ Kaybarax
 * @param classNames
 * @returns {*[]}
 */
export default function className(...classNames: string[]): string[] | undefined {
  if (!isEmptyArray(classNames)) {
    return [...classNames];
  }
  return undefined;
}

/**
 * sd _ Kaybarax
 * Show an android toast message
 * @param message - text to display
 * @param toastDuration - short (default), long
 */
export function showToast(message: string, toastDuration: 'short' | 'long' = 'short'): void {
  let duration = toastDuration === 'long' ? ToastAndroid.LONG : ToastAndroid.SHORT;
  ToastAndroid.show(message, duration);
}

/**
 * sd _ Kaybaarx
 * @param message
 */
export function alertLog(message: string): void {
  Alert.alert('Alert Log', message);
}

/**
 * sd _ Kaybarax
 * @param key
 * @param item
 */
export async function storeObjectToAsyncStorage(key: string, item: any): Promise<void> {
  await AsyncStorage.setItem(key, stringifyObject(item));
}

/**
 * sd _ Kaybarax
 * @param key
 * @param item
 */
export async function storeItemToAsyncStorage(key: string, item: string): Promise<void> {
  await AsyncStorage.setItem(key, item);
}

/**
 * sd _ Kaybarax
 * @param key
 */
export async function removeItemFromAsyncStorage(key: string): Promise<void> {
  await AsyncStorage.removeItem('' + key);
}

/**
 * sd _ Kaybarax
 * @param key
 * @returns {string|null}
 */
export async function getItemFromAsyncStorage(key: string): Promise<string | null> {
  const value = await AsyncStorage.getItem('' + key);
  return value;
}

/**
 * sd _ Kaybarax
 * @param key
 * @returns {Promise<null|any>}
 */
export async function getObjectFromAsyncStorage(key: string): Promise<any | null> {
  let item = await getItemFromAsyncStorage(key);
  if (!isEmptyString(item)) {
    try {
      let jsonItem = JSON.parse(item as string);
      if (isObject(jsonItem)) {
        return jsonItem;
      }
      return null;
    } catch (e) {
      return null;
    }
  }
  return null;
}