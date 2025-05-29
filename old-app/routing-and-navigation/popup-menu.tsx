/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React, { useRef } from 'react';
import { Alert, StyleProp, Text, TouchableOpacity, UIManager, View, ViewStyle, findNodeHandle } from 'react-native';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { SECONDARY_COLOR } from '../theme/app-theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import appNavigation from './app-navigation';
import WithStoresHoc from '../stores/with-stores-hoc';
import { handleLogOut, LoginStore } from '../controllers/recipe-box-sub-app-controllers/recipe-box-login-controller';

interface PopupMenuProps {
  actions: string[];
  onPress: (e: any, i: number) => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function PopupMenu(props: PopupMenuProps): React.ReactElement {
  const { actions, onPress, children, style } = props;
  const menu = useRef<Text | null>(null);

  const handleShowPopupError = (): void => {
    // todo: show error here
  };

  const handleMenuPress = (): void => {
    const node = findNodeHandle(menu.current);
    if (node) {
      // @ts-ignore: UIManager.showPopupMenu exists at runtime but is missing from type definitions
      UIManager.showPopupMenu(node, actions, handleShowPopupError, onPress);
    }
  };

  return (
    <View style={[{ paddingBottom: 10 }, style]}>
      {children}
      <TouchableOpacity
        onPress={handleMenuPress}
        style={[
          {
            alignSelf: 'center',
            backgroundColor: 'transparent',
            height: 45,
            width: 45,
            borderRadius: 45,
            borderColor: 'transparent',
          },
        ]}
      >
        <Text ref={menu}>
          <FontAwesomeIcon icon={faEllipsisV} color={SECONDARY_COLOR} size={30} />
        </Text>
      </TouchableOpacity>
    </View>
  );
}

interface RecipeBoxStoreType {
  user: any;
  recipeItems: Array<any>;
  selectedRecipe: any;
  selectedRecipePhotos: Array<any>;
  [key: string]: any;
}

interface RecipeBoxPopupMenuProps {
  recipeBoxStore: RecipeBoxStoreType;
  loginStore: LoginStore;
}

export function RecipeBoxPopupMenu(props: RecipeBoxPopupMenuProps): React.ReactElement {
  console.log('RecipeBoxPopupMenu props', props);
  const { recipeBoxStore, loginStore } = props;
  const { navigator } = appNavigation.globalNavigationProps;
  console.log('RecipeBoxPopupMenu globalNavigationProps', appNavigation.globalNavigationProps);

  return (
    <View
      style={[
        {
          marginTop: 30,
        },
      ]}
    >
      <PopupMenu
        style={{ backgroundColor: '#A880A1' }}
        actions={['Anything', 'Logout']}
        onPress={(e, i) => {
          if (i === 0) {
            //todo: whatever you want
            return;
          }
          if (i === 1) {
            // Logout
            try {
              //turn on logout
              appNavigation.globalNavigationProps.internalLogout = true;
              //logout
              handleLogOut(recipeBoxStore, loginStore, navigator);
            } catch (err) {
              Alert.alert('Go back error!', 'Custom back navigation, after halting, not registered!');
            }
          }
        }}
      />
    </View>
  );
}

export const RecipeBoxPopupMenuWithStores = WithStoresHoc(RecipeBoxPopupMenu, ['recipeBoxStore', 'loginStore']);

export default PopupMenu;
