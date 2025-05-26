//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import RN, { View } from 'react-native';
import { BlankSpaceDivider, Spacer } from '../../shared-components-and-modules/shared-components';
import { displayFieldExpectationSatisfied } from '../../controllers/app-controller';
import { isEmptyArray, isEmptyString, isTrue, makeId } from '../../util/util';
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
import AppNotificationToastAlert from '../../shared-components-and-modules/notification-center/app-notification-toast-alert';
import { RecipeImage } from '../../app-management/data-manager/models-manager';
import StarRatings from '../../shared-components-and-modules/form-controls/star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { toJS } from 'mobx';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../App';
import {
  editRecipeClick,
  viewRecipeFullDetailsClick,
} from '../../controllers/recipe-box-sub-app-controllers/recipe-item-card-controller';
import { DetailsButtonCN, DetailsButtonTextCN, EditButtonCN, EditButtonTextCN } from '../../theme/component-themes';

export default function RecipeListItemCard(props) {
  console.log('PROPS AT RecipeListItemCard:', toJS(props));

  let {
    recipeBoxStore,
    navigation,
    appStore: { navStore },
    recipe,
    recipePhotos,
    recipeBoxStore: { notificationAlert },
  } = props;

  console.log('!!! recipePhotos !!!:', recipePhotos);

  return (
    <RN.ScrollView style={[className(FlexColumnContainerCN)]} contentInsetAdjustmentBehavior={'automatic'}>
      <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
        <RN.ScrollView
          horizontal={true}
          style={[className(FlexFluidRowContainerCN)]}
          contentContainerStyle={[className(AlignCenterContentCN)]}
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

        <BlankSpaceDivider />

        <RN.View style={[className(FlexFluidRowContainerCN)]}>
          <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
            <RN.View style={[className(FlexFluidRowContainerCN, AlignRightFlexContainerContentCN)]}>
              <RN.TouchableOpacity
                activeOpacity={0.6}
                onPress={_ => {
                  viewRecipeFullDetailsClick(
                    {
                      recipe,
                      recipePhotos,
                    },
                    recipeBoxStore,
                    navigation,
                    navStore,
                  );
                }}
                style={[
                  className(
                    FlexContainerChildItemNoGrowCN,
                    FlexContainerChildItemOneThirdWidthCN,
                    AlignCenterContentCN,
                    DetailsButtonCN,
                  ),
                ]}
              >
                <RN.Text style={[className(DetailsButtonTextCN)]}>Details</RN.Text>
              </RN.TouchableOpacity>

              <Spacer />

              <RN.TouchableOpacity
                activeOpacity={0.6}
                onPress={_ => {
                  editRecipeClick(recipe, recipePhotos, recipeBoxStore, navigation);
                }}
                style={[
                  className(
                    FlexContainerChildItemNoGrowCN,
                    FlexContainerChildItemOneThirdWidthCN,
                    AlignCenterContentCN,
                    EditButtonCN,
                  ),
                ]}
              >
                <RN.Text style={[className(EditButtonTextCN)]}>Edit</RN.Text>
              </RN.TouchableOpacity>
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
