//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import RN, {Alert} from 'react-native';
import PropTypes from 'prop-types';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import {SECONDARY_COLOR} from '../theme/app-theme';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import appNavigation from './app-navigation';
import WithStoresHoc from '../stores/with-stores-hoc';
import {handleLogOut} from '../controllers/recipe-box-sub-app-controllers/recipe-box-login-controller';

interface PopupMenuProps {
  actions: string[];
  onPress: (e: any, i: number) => void;
  children?: React.ReactNode;
  style?: RN.StyleProp<RN.ViewStyle>;
}

export class PopupMenu extends React.Component<PopupMenuProps> {
  private menu: React.RefObject<RN.Text>;

  constructor(props: PopupMenuProps) {
    super(props);
    this.menu = React.createRef();
  }

  handleShowPopupError = (): void => {
    // todo: show error here
  };

  handleMenuPress = (): void => {
    const {actions, onPress} = this.props;
    RN.UIManager.showPopupMenu(
      RN.findNodeHandle(this.menu.current as any),
      actions,
      this.handleShowPopupError,
      onPress,
    );
  };

  render(): React.ReactNode {
    return (
      <RN.View style={[{paddingBottom: 10}]}>
        {this.props.children}
        <RN.TouchableOpacity
          onPress={this.handleMenuPress}
          style={[
            {
              alignSelf: 'center',
              backgroundColor: 'transparent',
              height: 45,
              width: 45,
              borderRadius: 45,
              borderColor: 'transparent',
            },
          ]}>
          <RN.Text ref={this.menu}>
            <FontAwesomeIcon
              icon={faEllipsisV}
              color={SECONDARY_COLOR}
              size={30}
            />
          </RN.Text>
        </RN.TouchableOpacity>
      </RN.View>
    );
  }
}

// PropTypes are kept for backward compatibility
PopupMenu.propTypes = {
  actions: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  children: PropTypes.object,
};

interface RecipeBoxStoreType {
  // Add properties as needed
}

interface LoginStoreType {
  // Add properties as needed
}

interface RecipeBoxPopupMenuProps {
  recipeBoxStore: RecipeBoxStoreType;
  loginStore: LoginStoreType;
}

export function RecipeBoxPopupMenu(props: RecipeBoxPopupMenuProps): JSX.Element {
  console.log('RecipeBoxPopupMenu props', props);
  let {recipeBoxStore, loginStore} = props;
  let {
    drawerProps,
    executeHaltedBackNavigation,
    navigator,
  } = appNavigation.globalNavigationProps;
  console.log(
    'RecipeBoxPopupMenu globalNavigationProps',
    appNavigation.globalNavigationProps,
  );

  return (
    <RN.View
      style={[
        {
          marginTop: 30,
        },
      ]}>
      <PopupMenu
        style={{backgroundColor: '#A880A1'}}
        actions={['Anything', 'Logout']}
        onPress={(e, i) => {
          if (i === 0) {
            //todo: whatever you want
            return;
          }
          if (i === 1) {
            // Logout
            console.log('RecipeBoxPopupMenu GlobalDrawerProps', drawerProps);
            try {
              //turn on logout
              appNavigation.globalNavigationProps.internalLogout = true;
              //logout
              handleLogOut(recipeBoxStore, loginStore, navigator);
            } catch (err) {
              Alert.alert(
                'Go back error!',
                'Custom back navigation, after halting, not registered!',
              );
            }
          }
        }}
      />
    </RN.View>
  );
}

export const RecipeBoxPopupMenuWithStores = WithStoresHoc(RecipeBoxPopupMenu, [
  'recipeBoxStore',
  'loginStore',
]);

export default PopupMenu;