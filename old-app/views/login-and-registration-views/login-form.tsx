/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { textValue, textValueChanged } from '../../util/react-native-data-collection-utils';
import { isEmptyString } from '../../util/util';
import RN, { ScrollView, Text, TouchableOpacity } from 'react-native';
import AppTextInput from '../../shared-components-and-modules/form-controls/app-text-input';
import { SCREEN_HEIGHT } from '../../App';
import {
  AlignCenterTextCN,
  AlignRightFlexContainerContentCN,
  FlexColumnContainerCN,
  FlexContainerChildItemFullWidthCN,
  FlexFluidRowContainerCN,
} from '../../theme/app-layout-styles-classnames';
import { handleLogin } from '../../controllers/recipe-box-sub-app-controllers/recipe-box-login-controller';
import className from '../../util/react-native-based-utils';
import { UnderlinedTextCN } from '../../theme/app-text-styles-classnames';
import { BlankSpaceDivider } from '../../shared-components-and-modules/shared-components';
import { notificationCallback } from '../../shared-components-and-modules/notification-center/notifications-controller';
import { RegistrationButtonTextCN } from '../../theme/component-themes';

export default function LoginForm(props) {
  console.log('LoginForm props:', props);

  let {
    recipeBoxStore,
    loginStore,
    loginStore: { notificationAlert, loginForm },
    navigation,
  } = props;

  let [submit_pressed, set_press_submit] = React.useState(false);
  let [credentials, updateCredentials] = React.useState({
    password: '',
  });

  let isValidFormData = () => {
    let validForm = true;
    set_press_submit(false); //assume not pressed

    if (isEmptyString(loginForm['usernameOrEmail'])) {
      validForm = false;
      set_press_submit(true);
      return validForm;
    }
    if (isEmptyString(credentials.password)) {
      validForm = false;
      set_press_submit(true);
      return validForm;
    }

    return validForm;
  };

  return (
    <ScrollView style={[className(FlexColumnContainerCN)]}>
      {submit_pressed && isEmptyString(loginForm.usernameOrEmail) && (
        <Text style={{ color: 'red' }}> * This field is required.</Text>
      )}
      <BlankSpaceDivider />
      <AppTextInput
        label={'Username/Email'}
        value={textValue(loginForm, 'usernameOrEmail')}
        onChangeText={text => textValueChanged(loginForm, text, 'usernameOrEmail')}
      />
      <BlankSpaceDivider />
      {submit_pressed && isEmptyString(credentials.password) && (
        <Text style={{ color: 'red' }}> * This field is required.</Text>
      )}
      <BlankSpaceDivider />
      <AppTextInput
        label={'Password'}
        onChangeText={text => {
          textValueChanged(credentials, text, 'password', null);
          updateCredentials(credentials);
        }}
        secureTextEntry={true}
      />
      <BlankSpaceDivider />
      <TouchableOpacity
        activeOpacity={0.6}
        style={[
          className(FlexFluidRowContainerCN),
          {
            backgroundColor: 'orange',
            height: 0.06 * SCREEN_HEIGHT,
            elevation: 2,
            borderRadius: 8,
          },
        ]}
        onPress={_ => {
          if (!isValidFormData()) {
            return;
          }
          handleLogin(loginForm, credentials.password, notificationAlert, recipeBoxStore, loginStore, navigation);
        }}
      >
        <Text style={[className(FlexContainerChildItemFullWidthCN, AlignCenterTextCN, RegistrationButtonTextCN)]}>
          Login
        </Text>
      </TouchableOpacity>
      <BlankSpaceDivider height={25} />
      <TouchableOpacity
        activeOpacity={0.6}
        style={[className(FlexContainerChildItemFullWidthCN, AlignRightFlexContainerContentCN)]}
        onPress={_ => {
          //todo: will be done
          notificationCallback('info', 'I can leave this one to you mate! Cheers!', notificationAlert);
        }}
      >
        <Text
          style={[
            {
              fontSize: 18,
              padding: 5,
            },
          ]}
        >
          <RN.Text
            style={[
              {
                color: 'teal',
              },
              className(UnderlinedTextCN),
            ]}
          >
            Forgot password?&nbsp;
          </RN.Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
