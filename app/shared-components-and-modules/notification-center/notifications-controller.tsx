//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import {isNullUndefined} from "../../util/util";
import {Alert} from "react-native";

/**
 * sd _ Kaybarax
 * Utility function to handle the custom display of messages.
 * @param notificationType
 * @param message
 * @param toastNotificationAlert
 * @param position
 * @param duration
 */
export function toastNotificationCallback(
    notificationType,
    message,
    toastNotificationAlert,
    position = 'top',
    duration = 3500,
) {

  if (isNullUndefined(toastNotificationAlert)) {
    // console.log('Toast Notification not Specified');
    return;
  }

  let typeOfNotification = 'info';//default to this
  let typeOfNotificationMessage = 'You have not specifiedMessage';//default to this

  if (notificationType === 'err' || notificationType === 'error') {
    typeOfNotification = 'error';
  }
  if (notificationType === 'failure' || notificationType === 'fail') {
    typeOfNotification = 'error';
  }
  if (notificationType === 'succ' || notificationType === 'success') {
    typeOfNotification = 'success';
  }
  if (notificationType === 'warn' || notificationType === 'warning') {
    typeOfNotification = 'warning';
  }
  if (notificationType === 'information') {
    typeOfNotification = 'info';
  }

  toastNotificationAlert.alert = true;
  toastNotificationAlert.position = position;
  toastNotificationAlert.duration = duration;
  toastNotificationAlert.message = message || typeOfNotificationMessage;
  toastNotificationAlert.type = typeOfNotification;
  setTimeout(() => {
    toastNotificationAlert.alert = false;
    toastNotificationAlert.message = null;
  }, toastNotificationAlert.duration);

}

/**
 * sd _ Kaybarax
 * @type {{duration: number, activity: null, alert: boolean, position: string, message: null, type: null}}
 */
export const toastNotificationAlertProps = {
  alert: false,
  message: null,
  type: null,
  duration: 3500,
  position: 'top',
  activity: null,
};
