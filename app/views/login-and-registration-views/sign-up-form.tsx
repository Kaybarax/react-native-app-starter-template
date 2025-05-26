//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { textValueChanged } from '../../util/react-native-data-collection-utils';
import { isEmptyString } from '../../util/util';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import AppTextInput from '../../shared-components-and-modules/form-controls/app-text-input';
import { SCREEN_HEIGHT } from '../../App';
import {
  AlignCenterTextCN,
  FlexColumnContainerCN,
  FlexContainerChildItemFullWidthCN,
  FlexFluidRowContainerCN,
} from '../../theme/app-layout-styles-classnames';
import { handleSignUp } from '../../controllers/recipe-box-sub-app-controllers/recipe-box-login-controller';
import className from '../../util/react-native-based-utils';
import { BlankSpaceDivider } from '../../shared-components-and-modules/shared-components';
import { RegistrationButtonTextCN } from '../../theme/component-themes';

export default function SignUpForm(props) {
  let {
    showLoginForm,
    loginStore: { notificationAlert, signUpForm },
    loginStore,
  } = props;

  let [submit_pressed, set_press_submit] = React.useState(false);
  let [credentials, updateCredentials] = React.useState({
    password: '',
    confirm_password: '',
  });

  let isValidFormData = () => {
    let validForm = true;
    set_press_submit(false); //assume not pressed

    if (isEmptyString(signUpForm.user['name'])) {
      validForm = false;
      set_press_submit(true);
      return validForm;
    }
    if (isEmptyString(signUpForm.user['email'])) {
      validForm = false;
      set_press_submit(true);
      return validForm;
    }
    if (isEmptyString(signUpForm.user['username'])) {
      validForm = false;
      set_press_submit(true);
      return validForm;
    }
    if (isEmptyString(credentials.password)) {
      validForm = false;
      set_press_submit(true);
      return validForm;
    }
    if (isEmptyString(credentials.confirm_password)) {
      validForm = false;
      set_press_submit(true);
      return validForm;
    }
    if (credentials.password !== credentials.confirm_password) {
      validForm = false;
      set_press_submit(true);
      return validForm;
    }

    return validForm;
  };

  return (
    <ScrollView style={[className(FlexColumnContainerCN)]}>
      {submit_pressed && isEmptyString(signUpForm.user.name) && (
        <Text style={{ color: 'red' }}> * This field is required.</Text>
      )}
      <BlankSpaceDivider />
      <AppTextInput label="Name" onChangeText={value => textValueChanged(signUpForm.user, value, 'name', null)} />
      <BlankSpaceDivider />
      {submit_pressed && isEmptyString(signUpForm.user.username) && (
        <Text style={{ color: 'red' }}> * This field is required.</Text>
      )}
      <BlankSpaceDivider />
      <AppTextInput
        label="Username"
        onChangeText={value => textValueChanged(signUpForm.user, value, 'username', null)}
      />
      {submit_pressed && isEmptyString(signUpForm.user.email) && (
        <Text style={{ color: 'red' }}> * This field is required.</Text>
      )}
      <BlankSpaceDivider />
      <AppTextInput label="Email" onChangeText={value => textValueChanged(signUpForm.user, value, 'email', null)} />
      <BlankSpaceDivider />
      {submit_pressed && isEmptyString(credentials.password) && (
        <Text style={{ color: 'red' }}> * This field is required.</Text>
      )}
      <BlankSpaceDivider />
      <AppTextInput
        secureTextEntry={true}
        label="Password"
        onChangeText={value => {
          textValueChanged(credentials, value, 'password', null);
          updateCredentials(credentials);
        }}
      />
      <BlankSpaceDivider />
      {submit_pressed && isEmptyString(credentials.confirm_password) && (
        <Text style={{ color: 'red' }}> * This field is required.</Text>
      )}
      <BlankSpaceDivider />
      <AppTextInput
        secureTextEntry={true}
        label="Confirm Password"
        onChangeText={value => {
          textValueChanged(credentials, value, 'confirm_password', null);
          updateCredentials(credentials);
        }}
      />
      <BlankSpaceDivider />
      {submit_pressed && credentials.password !== credentials.confirm_password && (
        <Text style={{ color: 'red' }}>Passwords do not match.</Text>
      )}
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
        onPress={async _ => {
          if (!isValidFormData()) {
            return;
          }
          signUpForm.user.status_ref_key_key = 'STATUS';
          signUpForm.user.status_ref_key_value = 'ACT';
          handleSignUp(signUpForm.user, credentials.password, loginStore, notificationAlert, showLoginForm);
        }}
      >
        <Text style={[className(FlexContainerChildItemFullWidthCN, AlignCenterTextCN, RegistrationButtonTextCN)]}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <BlankSpaceDivider />
      <Text>Your sign up data is stored locally in SQLite Storage</Text>
    </ScrollView>
  );
}
