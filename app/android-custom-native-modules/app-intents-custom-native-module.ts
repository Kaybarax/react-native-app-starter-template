//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { DeviceEventEmitter } from 'react-native';
import { notificationCallback } from '../shared-components-and-modules/notification-center/notifications-controller';
import { AppIntentsModule } from './custom-native-modules';

export function openWebPageIntent(url: string, notificationAlert: any): void {
  DeviceEventEmitter.addListener('password_hash_result', eventResult =>
    openWebPageIntentListener(eventResult, notificationAlert),
  );

  AppIntentsModule.openWebPageIntent(url, (message: string) => openWebPageIntentCallback(message, notificationAlert));
}

export function openWebPageIntentListener(passwordToValidate: any, hash: any, salt: any): void {
  // TODO: will be done
}

export function openWebPageIntentCallback(message: string, notificationAlert: any): void {
  if (message === 'SUCCESS') {
    notificationCallback('succ', 'Validate password success', notificationAlert);
  } else if (message === 'FAILURE') {
    notificationCallback('warn', 'Password failed validation', notificationAlert);
    //and unregister listener
    DeviceEventEmitter.removeListener('password_validation_result', null);
  } else {
    notificationCallback('err', 'Cannot perform password validation', notificationAlert);
    //and unregister listener
    DeviceEventEmitter.removeListener('password_validation_result', null);
  }
}
