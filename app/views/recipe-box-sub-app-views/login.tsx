//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { isNullUndefined, isTrue, makeId } from '../../util/util';
import AppNotificationToastAlert from '../../shared-components-and-modules/notification-center/app-notification-toast-alert';
import LoginForm from '../login-and-registration-views/login-form';
import SignUpForm from '../login-and-registration-views/sign-up-form';
import { displayFieldExpectationSatisfied } from '../../controllers/app-controller';
import { AUTHENTICATION_ACTIONS_ENUM } from '../../stores/actions-and-stores-data';
import { User } from '../../app-management/data-manager/models-manager';
import RN, { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Loader from '../../shared-components-and-modules/loaders';
import {
  AlignCenterContentCN,
  AlignCenterTextCN,
  FlexColumnContainerCN,
  FlexContainerChildItemFullWidthCN,
  FlexFluidRowContainerCN,
} from '../../theme/app-layout-styles-classnames';
import className from '../../util/react-native-based-utils';
import { UnderlinedTextCN } from '../../theme/app-text-styles-classnames';
import WithStoresHoc from '../../stores/with-stores-hoc';
import { toJS } from '../../stores';
import { persistStoreToAsyncStorage } from '../../stores';

export default function Login(props) {
  console.log('props at login:', toJS(props));

  const {
    navigation,
    loginStore,
    loginStore: { notificationAlert },
  } = props;

  const showLoginForm = () => {
    loginStore.viewAction = AUTHENTICATION_ACTIONS_ENUM.LOGIN;
  };

  const showSignUpForm = () => {
    let user: User = { id: makeId(32) };
    user.name = '';
    user.email = '';
    user.username = '';
    loginStore.signUpForm.user = user;
    loginStore.viewAction = AUTHENTICATION_ACTIONS_ENUM.SIGN_UP;
  };

  // const showResetPasswordForm = () => {
  //     loginStore.viewAction = AUTHENTICATION_ACTIONS_ENUM.RESET_PASSWORD;
  // };

  let showLogin =
    displayFieldExpectationSatisfied('viewAction', loginStore, eOfX => isNullUndefined(eOfX)) ||
    displayFieldExpectationSatisfied('viewAction', loginStore, eOfX => eOfX === AUTHENTICATION_ACTIONS_ENUM.LOGIN);

  let showSignUp = displayFieldExpectationSatisfied(
    'viewAction',
    loginStore,
    eOfX => eOfX === AUTHENTICATION_ACTIONS_ENUM.SIGN_UP,
  );

  // let showResetPassword = displayFieldExpectationSatisfied('viewAction', loginStore,
  //     eOfX => eOfX === AUTHENTICATION_ACTIONS_ENUM.RESET_PASSWORD);

  let LoginFormWithStores = WithStoresHoc(LoginForm, ['recipeBoxStore', 'loginStore']);
  let SignUpFormWithStores = WithStoresHoc(SignUpForm, ['recipeBoxStore', 'loginStore']);

  //persist login store
  persistStoreToAsyncStorage(loginStore).then(null);

  return (
    <RN.ImageBackground
      source={require('../../media/images/cake-1971556_1920.jpg')}
      style={[
        {
          flex: 1,
          justifyContent: 'center',
        },
      ]}
    >
      <ScrollView
        contentInsetAdjustmentBehavior={'automatic'}
        style={[className(FlexColumnContainerCN), { backgroundColor: 'transparent' }]}
      >
        <View style={[className(FlexContainerChildItemFullWidthCN)]}>
          <View style={[className(FlexFluidRowContainerCN)]}>
            <View style={[className(FlexContainerChildItemFullWidthCN)]}>
              <View style={[className(FlexFluidRowContainerCN)]}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={[className(FlexContainerChildItemFullWidthCN, AlignCenterContentCN)]}
                  onPress={_ => {
                    if (showLogin) {
                      showSignUpForm();
                    } else if (showSignUp) {
                      showLoginForm();
                    }
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
                    {showLogin && (
                      <RN.Text
                        style={[
                          {
                            color: 'teal',
                          },
                        ]}
                      >
                        Don't have an account?&nbsp;
                        <RN.Text
                          style={[
                            className(UnderlinedTextCN),
                            {
                              color: 'maroon',
                            },
                          ]}
                        >
                          Register
                        </RN.Text>
                      </RN.Text>
                    )}
                    {showSignUp && (
                      <RN.Text
                        style={[
                          className(AlignCenterTextCN),
                          {
                            color: 'teal',
                          },
                        ]}
                      >
                        Already have an account?&nbsp;
                        <RN.Text
                          style={[
                            className(UnderlinedTextCN),
                            {
                              color: 'maroon',
                            },
                          ]}
                        >
                          Login
                        </RN.Text>
                      </RN.Text>
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {showLogin && (
            <View style={[className(FlexContainerChildItemFullWidthCN)]}>
              <View style={[className(FlexFluidRowContainerCN)]}>
                <View style={[className(FlexContainerChildItemFullWidthCN)]}>
                  <LoginFormWithStores navigation={navigation} />
                </View>
              </View>
            </View>
          )}

          {showSignUp && (
            <View style={[className(FlexContainerChildItemFullWidthCN)]}>
              <View style={[className(FlexFluidRowContainerCN)]}>
                <View style={[className(FlexContainerChildItemFullWidthCN)]}>
                  <SignUpFormWithStores showLoginForm={showLoginForm} />
                </View>
              </View>
            </View>
          )}
        </View>

        {loginStore.loading && <Loader message={loginStore.loadingMessage} />}

        {displayFieldExpectationSatisfied('alert', notificationAlert, eOfX => isTrue(eOfX)) && (
          <View
            style={[
              {
                position: 'absolute',
                top: 0,
                width: '100%',
              },
            ]}
          >
            <AppNotificationToastAlert dropDownProps={notificationAlert} />
          </View>
        )}
      </ScrollView>
    </RN.ImageBackground>
  );
}
