//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import RN, { Alert, View } from 'react-native';
import className from '../../util/react-native-based-utils';
import {
  AlignCenterContentCN,
  AlignLeftFlexContainerContentCN,
  AlignRightFlexContainerContentCN,
  FlexColumnContainerCN,
  FlexContainerChildItemFullWidthCN,
  FlexContainerChildItemNoGrowCN,
  FlexContainerChildItemOneHalfWidthCN,
  FlexContainerChildItemOneThirdWidthCN,
  FlexFluidRowContainerCN,
} from '../../theme/app-layout-styles-classnames';
import {
  isEmptyArray,
  isEmptyString,
  isTrue,
  localeDateStringFormatFromDatetime,
  localeTimeStringFormatFromDatetime,
  makeId,
  numberItem,
} from '../../util/util';
import { Recipe, RecipeImage } from '../../app-management/data-manager/models-manager';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../App';
import StarRatings from '../../shared-components-and-modules/form-controls/star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { BlankSpaceDivider, Spacer } from '../../shared-components-and-modules/shared-components';
import appNavigation from '../../routing-and-navigation/app-navigation';
import { displayFieldExpectationSatisfied } from '../../controllers/app-controller';
import AppNotificationToastAlert from '../../shared-components-and-modules/notification-center/app-notification-toast-alert';
import { toJS } from 'mobx';
import {
  BackButtonCN,
  BackButtonTextCN,
  DeleteButtonCN,
  DeleteButtonTextCN,
  EditButtonCN,
  EditButtonTextCN,
} from '../../theme/component-themes';
import { editRecipeClick } from '../../controllers/recipe-box-sub-app-controllers/recipe-item-card-controller';
import { deleteRecipe } from '../../controllers/recipe-box-sub-app-controllers/recipe-box-controller';
import { RecipeGroupsSuitable } from '../../app-management/data-manager/list-manager';

export default function RecipeDetails(props) {
  console.log('PROPS AT RecipeDetails:', toJS(props));

  let {
    recipeBoxStore,
    navigation,
    route: { params },
    recipeBoxStore: { notificationAlert },
  } = props;

  let recipe: Recipe = params.recipe;
  let recipePhotos: Array<RecipeImage> = params.recipePhotos;

  let enumeratorArray = [];

  return (
    <RN.ScrollView style={[className(FlexColumnContainerCN)]} contentInsetAdjustmentBehavior={'automatic'}>
      <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
        <RN.ScrollView
          horizontal={true}
          contentContainerStyle={[className(FlexFluidRowContainerCN, AlignCenterContentCN)]}
        >
          {!isEmptyArray(recipePhotos) &&
            recipePhotos.map((item: RecipeImage) => {
              let photo = !isEmptyString(item.image_url)
                ? 'data:image/jpeg;base64,' + item.image_url
                : !isEmptyString(item.image_file)
                  ? 'data:image/jpeg;base64,' + item.image_file
                  : null;

              return (
                <RN.View
                  style={[
                    className(FlexContainerChildItemFullWidthCN),
                    {
                      height: SCREEN_HEIGHT * 0.21,
                    },
                  ]}
                  key={makeId(16)}
                >
                  <RN.Image
                    source={
                      !isEmptyString(photo)
                        ? {
                            uri: photo,
                          }
                        : require('../../media/images/image.png')
                    }
                    style={[
                      {
                        width: SCREEN_WIDTH * 0.92,
                        height: SCREEN_HEIGHT * 0.2,
                        resizeMode: 'cover',
                      },
                    ]}
                  />
                </RN.View>
              );
            })}
        </RN.ScrollView>

        <RN.View style={[className(FlexFluidRowContainerCN)]}>
          <RN.Text style={[className(FlexContainerChildItemFullWidthCN, AlignLeftFlexContainerContentCN)]}>
            {recipe.name}
          </RN.Text>
        </RN.View>

        <RN.View style={[className(FlexFluidRowContainerCN)]}>
          <RN.View style={[className(FlexContainerChildItemOneHalfWidthCN, AlignLeftFlexContainerContentCN)]}>
            <RN.Text>
              <StarRatings disabled={null} ratings={recipe?.rating || 0} />
            </RN.Text>
          </RN.View>

          {displayFieldExpectationSatisfied('is_vegetarian', recipe, eOfX => isTrue(eOfX) || eOfX === 1) && (
            <RN.View style={[className(FlexContainerChildItemOneHalfWidthCN, AlignRightFlexContainerContentCN)]}>
              <RN.Text>
                <FontAwesomeIcon icon={faLeaf} color={'forestgreen'} size={30} />
                <Spacer />
                Vegetarian
              </RN.Text>
            </RN.View>
          )}
        </RN.View>

        <RN.View style={[className(FlexFluidRowContainerCN)]}>
          <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
            <RN.View style={[className(FlexFluidRowContainerCN)]}>
              <RN.Text style={[className(FlexContainerChildItemFullWidthCN, AlignLeftFlexContainerContentCN)]}>
                Created on:&nbsp;
                {`${localeDateStringFormatFromDatetime(recipe.date_created)}`}
                &nbsp;
                {`${localeTimeStringFormatFromDatetime(recipe.date_created)}`}
              </RN.Text>

              <BlankSpaceDivider />

              <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                <RN.View style={[className(FlexFluidRowContainerCN)]}>
                  <RN.Text style={[className(FlexContainerChildItemFullWidthCN)]}>Ingredients</RN.Text>

                  <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                    <RN.FlatList
                      data={recipe.ingredients}
                      renderItem={({ item }) => {
                        console.log('ingredient:', item);
                        return (
                          <RN.Text>
                            <FontAwesomeIcon icon={faCircle} color={'black'} size={10} />
                            &nbsp;{item}
                          </RN.Text>
                        );
                      }}
                      keyExtractor={_ => makeId(16)}
                    />
                  </RN.View>
                </RN.View>
              </RN.View>

              <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                <RN.View style={[className(FlexFluidRowContainerCN)]}>
                  <RN.Text style={[className(FlexContainerChildItemFullWidthCN)]}>Cooking Instructions</RN.Text>

                  <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                    <RN.FlatList
                      data={recipe.cooking_instructions}
                      renderItem={({ item }) => {
                        return (
                          <RN.Text>
                            {`${numberItem(enumeratorArray) + '. '}`}&nbsp;
                            {item}
                          </RN.Text>
                        );
                      }}
                      keyExtractor={_ => makeId(16)}
                    />
                  </RN.View>
                </RN.View>
              </RN.View>

              {!isEmptyArray(recipe.groups_suitable) && (
                <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                  <RN.View style={[className(FlexFluidRowContainerCN)]}>
                    <RN.Text style={[className(FlexContainerChildItemFullWidthCN)]}>Okay for</RN.Text>

                    <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                      <RN.FlatList
                        data={recipe.groups_suitable}
                        renderItem={({ item }) => {
                          return (
                            <RN.Text>
                              <FontAwesomeIcon icon={faCircle} color={'black'} size={10} />
                              <Spacer />
                              {RecipeGroupsSuitable.find(it => it.value === item)?.['label']}
                            </RN.Text>
                          );
                        }}
                        keyExtractor={_ => makeId(16)}
                      />
                    </RN.View>
                  </RN.View>
                </RN.View>
              )}
            </RN.View>
          </RN.View>
        </RN.View>

        <BlankSpaceDivider />

        <RN.View style={[className(FlexFluidRowContainerCN)]}>
          <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
            <RN.View style={[className(FlexFluidRowContainerCN, AlignCenterContentCN)]}>
              <RN.View style={[className(FlexContainerChildItemNoGrowCN, FlexContainerChildItemOneThirdWidthCN)]}>
                <RN.TouchableOpacity
                  activeOpacity={0.6}
                  onPress={_ => {
                    recipeBoxStore.viewAction = null;
                    appNavigation.navigateBack(navigation);
                  }}
                  style={[className(FlexContainerChildItemFullWidthCN, AlignCenterContentCN, BackButtonCN)]}
                >
                  <RN.Text style={[className(BackButtonTextCN)]}>Back</RN.Text>
                </RN.TouchableOpacity>
              </RN.View>

              <RN.View style={[className(FlexContainerChildItemNoGrowCN, FlexContainerChildItemOneThirdWidthCN)]}>
                <RN.TouchableOpacity
                  activeOpacity={0.6}
                  onPress={_ => {
                    editRecipeClick(recipe, recipePhotos, recipeBoxStore, navigation);
                  }}
                  style={[className(FlexContainerChildItemFullWidthCN, AlignCenterContentCN, EditButtonCN)]}
                >
                  <RN.Text style={[className(EditButtonTextCN)]}>Edit</RN.Text>
                </RN.TouchableOpacity>
              </RN.View>

              <RN.View style={[className(FlexContainerChildItemNoGrowCN, FlexContainerChildItemOneThirdWidthCN)]}>
                <RN.TouchableOpacity
                  activeOpacity={0.6}
                  onPress={_ => {
                    Alert.alert(`Delete ${recipe.name}`, 'Confirm deletion (non-functional)', [
                      {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => {
                          deleteRecipe(recipe);
                          //go back
                          appNavigation.navigateBack(navigation);
                        },
                      },
                      {
                        text: 'Cancel',
                        style: 'default',
                        onPress: () => {
                          //do nothing
                        },
                      },
                    ]);
                  }}
                  style={[className(FlexContainerChildItemFullWidthCN, AlignCenterContentCN, DeleteButtonCN)]}
                >
                  <RN.Text style={[className(DeleteButtonTextCN)]}>Delete</RN.Text>
                </RN.TouchableOpacity>
              </RN.View>
            </RN.View>
          </RN.View>
        </RN.View>

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
      </RN.View>
    </RN.ScrollView>
  );
}
