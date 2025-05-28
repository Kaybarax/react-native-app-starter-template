//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import RN from 'react-native';
import RecipeListItemCard from './recipe-list-item-card';
import AppNotificationToastAlert from '../../shared-components-and-modules/notification-center/app-notification-toast-alert';
import { displayFieldExpectationSatisfied } from '../../controllers/app-controller';
import { isEmptyArray, isNullUndefined, isTrue, makeId } from '../../util/util';
import className from '../../util/react-native-based-utils';
import {
  AlignCenterTextCN,
  FlexColumnContainerCN,
  FlexContainerChildItemFullWidthCN,
  FlexFluidRowContainerCN,
} from '../../theme/app-layout-styles-classnames';
import WithStoresHoc from '../../stores/with-stores-hoc';
import appNavigation from '../../routing-and-navigation/app-navigation';
import { toJS } from '../../stores';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { BlankSpaceDivider } from '../../shared-components-and-modules/shared-components';
import { createRecipe } from '../../controllers/recipe-box-sub-app-controllers/recipe-box-controller';
import { notificationCallback } from '../../shared-components-and-modules/notification-center/notifications-controller';
import { RECIPE_BOX_VIEWS_ACTIONS_ENUM } from '../../stores/actions-and-stores-data';
import { NEGATIVE_ACTION_COLOR } from '../../theme/app-theme';
import { SCREEN_HEIGHT } from '../../App';
import { persistStoreToAsyncStorage } from '../../stores';

export default function RecipeHome(props) {
  console.log('props at RecipeHome:', toJS(props));

  let {
    recipeBoxStore,
    navigation,
    recipeBoxStore: { notificationAlert },
  } = props;

  let { recipeItems } = recipeBoxStore;

  console.log('recipeItems!', recipeItems);

  //inject needed appStore and recipeBoxStore
  let RecipeListItemCardWithStores = WithStoresHoc(RecipeListItemCard, ['recipeBoxStore', 'appStore']);

  //persist this store
  persistStoreToAsyncStorage(recipeBoxStore).then(null);

  //prevent android hardware go back,
  //to handle going back on your own, for logout cleanliness
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
        //logout if only doing so without back button
        if (appNavigation.globalNavigationProps.internalLogout) {
          navigation.dispatch(e.data.action);
        }
      }),
    [navigation],
  );

  return (
    <RN.View style={[className(FlexColumnContainerCN)]}>
      {isEmptyArray(recipeItems) && <NoRecipesDisplay />}

      {!isEmptyArray(recipeItems) && (
        <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
          <RN.FlatList
            data={recipeItems}
            renderItem={(item: any) => (
              <RecipeListItemCardWithStores
                recipe={item.item.recipe}
                recipePhotos={item.item.recipePhotos}
                navigation={navigation}
              />
            )}
            keyExtractor={_ => makeId(16)}
          />
          <BlankSpaceDivider height={SCREEN_HEIGHT * 0.1} />
        </RN.View>
      )}

      <RN.TouchableOpacity
        style={[
          {
            borderRadius: 50,
            backgroundColor: 'teal',
            position: 'absolute',
            bottom: '12%',
            height: 80,
            width: 80,
            right: 20,
          },
        ]}
        onPress={_ => {
          //clear former
          recipeBoxStore.selectedRecipe = null;
          recipeBoxStore.selectedRecipePhotos = [];
          //create new
          createRecipe(recipeBoxStore);
          if (isNullUndefined(recipeBoxStore.selectedRecipe) || isEmptyArray(recipeBoxStore.selectedRecipePhotos)) {
            notificationCallback('warn', 'Failed to create new recipe', notificationAlert);
            return;
          }
          recipeBoxStore.viewAction = RECIPE_BOX_VIEWS_ACTIONS_ENUM.CREATE_RECIPE;
          appNavigation.navigateToCreateEditRecipe(navigation, {
            recipe: recipeBoxStore.selectedRecipe,
            recipePhotos: recipeBoxStore.selectedRecipePhotos,
          });
        }}
      >
        <RN.Text
          style={[
            {
              position: 'absolute',
              top: 24,
              right: 25,
            },
          ]}
        >
          <FontAwesomeIcon icon={faPlus} color={'white'} size={30} />
        </RN.Text>
      </RN.TouchableOpacity>

      {displayFieldExpectationSatisfied('alert', notificationAlert, eOfX => isTrue(eOfX)) && (
        <RN.View
          style={[
            {
              position: 'absolute',
              top: 0,
              width: '100%',
            },
          ]}
        >
          <AppNotificationToastAlert dropDownProps={notificationAlert} />
        </RN.View>
      )}
    </RN.View>
  );
}

export function NoRecipesDisplay() {
  return (
    <RN.ScrollView style={[className(FlexColumnContainerCN)]}>
      <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
        <RN.View style={[className(FlexFluidRowContainerCN)]}>
          <RN.Text
            style={[
              className(FlexContainerChildItemFullWidthCN, AlignCenterTextCN),
              {
                fontSize: 18,
                fontWeight: 'bold',
                color: NEGATIVE_ACTION_COLOR,
              },
            ]}
          >
            You don't have any recipes!
          </RN.Text>
        </RN.View>
      </RN.View>
    </RN.ScrollView>
  );
}
