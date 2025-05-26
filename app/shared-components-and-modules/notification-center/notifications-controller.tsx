//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { isEmptyString, isNullUndefined } from '../../util/util';
import { Alert } from 'react-native';

/**
 * sd _ Kaybarax
 * Utility function to handle the custom display of messages.
 * @param notificationType
 * @param message
 * @param notificationAlert
 * @param position
 * @param duration
 */
export function notificationCallback(
  notificationType,
  message,
  notificationAlert: NotificationAlertProps,
  position = -100,
  duration = 3500,
) {
  if (isNullUndefined(notificationAlert)) {
    // console.log('Toast Notification not Specified');
    Alert.alert('Alert Error!');
    return;
  }

  let typeOfNotification = 'custom'; //default to this
  let typeOfNotificationMessage = 'Undefined message'; //default to this

  notificationAlert.position = position;
  notificationAlert.duration = duration;
  notificationAlert.message = !isEmptyString(message) ? message : typeOfNotificationMessage;
  notificationAlert.type = !isEmptyString(notificationType) ? notificationType : typeOfNotification;
  notificationAlert.alert = true;
  setTimeout(() => {
    notificationAlert.alert = false;
    notificationAlert.message = '';
  }, notificationAlert.duration);
}

export interface NotificationAlertProps {
  alert: boolean;
  message: string;
  type: string;
  duration?: number;
  position?: number;
  activity?: object;
}

/**
 * sd _ Kaybarax
 * @type {{duration: number, activity: null, alert: boolean, position: string, message: null, type: null}}
 */
export const notificationAlertProps: NotificationAlertProps = {
  alert: false,
  message: '',
  type: '',
  duration: 3500,
  position: -100,
  activity: undefined,
};

export interface DropDownNotificationProps {
  closeInterval: number;
  startDelta: number;
  warnColor: string;
  infoColor: string;
  showCancel?: boolean;
  messageNumOfLines: number;
  tapToCloseEnabled: boolean;
  replaceEnabled: boolean;
  updateStatusBar: boolean;
  zIndex: number;
  titleStyle?: object;
}

export const DropDownNotificationAlertDefaultProps: DropDownNotificationProps = {
  closeInterval: 3500,
  startDelta: -100,
  warnColor: '#FFC300',
  infoColor: '#5BC0DE',
  showCancel: true,
  messageNumOfLines: 4,
  tapToCloseEnabled: false,
  replaceEnabled: true,
  updateStatusBar: false,
  zIndex: 1000000,
  titleStyle: {
    fontSize: 17,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'transparent',
  },
};
