//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { PermissionsAndroid } from 'react-native';

export const CAMERA_PERMISSION = PermissionsAndroid.PERMISSIONS.CAMERA;

/**
 * sd _ Kaybarax
 * @param permission
 * @param title
 * @param message
 * @returns {Promise<boolean>}
 */
export async function requestPermission(permission: string, title: string, message: string): Promise<boolean> {
  try {
    const granted = await PermissionsAndroid.request(permission, {
      title: title,
      message: message,
    });
    if (granted === true) {
      // already got permissions from manifest
      return true;
    } else {
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (err) {
    console.log('requestPermission', err);
    return false;
  }
}
