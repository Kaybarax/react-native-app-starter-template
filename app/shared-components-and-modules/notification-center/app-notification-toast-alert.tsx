//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { DropDownNotificationAlertDefaultProps, NotificationAlertProps } from './notifications-controller';
import DropdownAlert, { DropdownAlertType } from 'react-native-dropdownalert';
import RN from 'react-native';

declare interface DropdownNotificationAlertProps {
  dropDownProps: NotificationAlertProps;
}

export default class AppNotificationToastAlert extends React.Component<DropdownNotificationAlertProps> {
  componentDidMount() {
    this._fireAlert();
  }

  componentWillUnmount() {
    this.dropDownAlertRef = null;
  }

  dropDownAlertRef;

  _fireAlert = () => {
    let { message, type } = this.props.dropDownProps;

    try {
      // alertWithType parameters: type, title, message, payload, interval.
      // payload object that includes a source property overrides the image source prop. (optional: object)
      // interval takes precedence over the closeInterval prop. (optional: number)

      let typeOfNotification = 'custom'; //default to this
      let title = 'Alert'; //default to this
      let typeOfNotificationMessage = 'Undefined message'; //default to this

      if (type === 'err' || type === 'error') {
        typeOfNotification = 'error';
        title = 'Error';
      }
      if (type === 'failure' || type === 'fail') {
        typeOfNotification = 'error';
        title = 'Error';
      }
      if (type === 'succ' || type === 'success') {
        typeOfNotification = 'success';
        title = 'Success';
      }
      if (type === 'warn' || type === 'warning') {
        typeOfNotification = 'warn';
        title = 'Warning';
      }
      if (type === 'info' || type === 'information') {
        typeOfNotification = 'info';
        title = 'Info';
      }

      this.dropDownAlertRef.alertWithType(
        typeOfNotification as DropdownAlertType,
        title,
        message || typeOfNotificationMessage,
      );
      //todo: Unmount alert on close
      // this.dropDownAlertRef.closeAction('automatic', () => {
      //     this.dropDownAlertRef = null;
      // });
    } catch (error) {
      this.dropDownAlertRef.alertWithType('error', 'Error', error);
    }
  };

  render() {
    // DropdownAlert must be last component in the document tree.
    // This ensures that it overlaps other UI components.

    let { duration, position } = this.props.dropDownProps;

    return (
      <RN.View>
        <DropdownAlert
          ref={ref => (this.dropDownAlertRef = ref)}
          closeInterval={duration || DropDownNotificationAlertDefaultProps.closeInterval}
          startDelta={position || DropDownNotificationAlertDefaultProps.startDelta}
          warnColor={DropDownNotificationAlertDefaultProps.warnColor}
          infoColor={DropDownNotificationAlertDefaultProps.infoColor}
          showCancel={DropDownNotificationAlertDefaultProps.showCancel}
          messageNumOfLines={DropDownNotificationAlertDefaultProps.messageNumOfLines}
          tapToCloseEnabled={DropDownNotificationAlertDefaultProps.tapToCloseEnabled}
          updateStatusBar={DropDownNotificationAlertDefaultProps.updateStatusBar}
          zIndex={DropDownNotificationAlertDefaultProps.zIndex}
          titleStyle={DropDownNotificationAlertDefaultProps.titleStyle}
        />
      </RN.View>
    );
  }
}
