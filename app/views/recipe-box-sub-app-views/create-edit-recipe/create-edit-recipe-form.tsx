/* eslint-disable react-hooks/exhaustive-deps */
//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import RN, { Alert } from 'react-native';
import { BlankSpaceDivider, Spacer } from '../../../shared-components-and-modules/shared-components';
import AppNotificationToastAlert from '../../../shared-components-and-modules/notification-center/app-notification-toast-alert';
import { Checkbox } from '../../../shared-components-and-modules/form-controls/checkboxes-and-radio-buttons';
import AppTextInput from '../../../shared-components-and-modules/form-controls/app-text-input';
import { displayFieldExpectationSatisfied } from '../../../controllers/app-controller';
import { isEmptyArray, isEmptyObject, isEmptyString, isTrue, makeId } from '../../../util/util';
import className, { showToast } from '../../../util/react-native-based-utils';
import {
  AlignCenterContentCN,
  AlignCenterTextCN,
  AlignLeftFlexContainerContentCN,
  AlignLeftTextCN,
  FlexColumnContainerCN,
  FlexContainerChildItemFullWidthCN,
  FlexContainerChildItemOneThirdWidthCN,
  FlexFluidRowContainerCN,
  FlexRowContainerCN,
} from '../../../theme/app-layout-styles-classnames';
import {
  checkboxItemValueChanged,
  textValue,
  textValueChanged,
} from '../../../util/react-native-data-collection-utils';
import {
  addCookingInstruction,
  addIngredient,
  isValidRecipeFormData,
  removeCookingInstruction,
  removeIngredient,
  submitRecipeClick,
  updateRecipeClick,
} from '../../../controllers/recipe-box-sub-app-controllers/create-edit-recipe-controller';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { RecipeGroupsSuitable } from '../../../app-management/data-manager/list-manager';
import { RecipeImage } from '../../../app-management/data-manager/models-manager';
import { toJS } from 'mobx';
import RnMultiSelectKaybarax from '../../../shared-components-and-modules/form-controls/rn-multi-select-kaybarax';
import { RECIPE_BOX_VIEWS_ACTIONS_ENUM } from '../../../stores/actions-and-stores-data';
import { POSITIVE_ACTION_COLOR } from '../../../theme/app-theme';
import ReactNativeCameraModule from '../../../shared-components-and-modules/camera-photo-capture-module/react-native-camera-module';
import {
  CAMERA_PERMISSION,
  requestPermission,
} from '../../../shared-components-and-modules/camera-photo-capture-module/camera-capture-util';
import PhotoInput from './recipe-photo-input';
import { NUMBER_OF_RECIPE_PHOTOS } from '../../../app-config';
import { addRecipePhoto } from '../../../controllers/recipe-box-sub-app-controllers/recipe-box-controller';
import Loader from '../../../shared-components-and-modules/loaders';

export default function CreateEditRecipeForm(props) {
  console.log('props at CreateEditRecipeForm:', toJS(props));
  console.log('CreateEditRecipeForm rn count!');

  let {
    recipeBoxStore,
    route: { params },
    navigation,
  } = props;
  let { recipe, recipePhotos }: { recipe: any; recipePhotos: Array<RecipeImage> } = params;
  let { notificationAlert, viewAction } = recipeBoxStore;

  let [submitPressed, setSubmitPressed] = React.useState(false);
  let [recipeFormValidityTree, updateFormValidityTree] = React.useState({
    ...recipe,
  });
  let [multiSelectDialogIsOpen, toggleOpenMultiSelectDialog] = React.useState(false);
  //camera-photo-capture state
  let [cameraModuleProps, updateCameraModule] = React.useState({
    //basic props
    cameraFlashOn: false,
    cameraLaunched: false,
    backCamera: true,
    imagePreview: null,
    acceptPhoto: false,
    //extra props for this use case, because I am capturing, several photos
    // identified by their assigned numbers, and other parameters as needed
    photoFor: 0,
  });
  let [photoCaptureModuleTrigger, InvokePhotoCaptureModuleTrigger] = React.useState(1);

  let updateCameraModuleProps = props => {
    updateCameraModule(props);
    photoCaptureModuleTrigger += 1;
    InvokePhotoCaptureModuleTrigger(photoCaptureModuleTrigger);
  };

  let setCapturedImage = photo => {
    if (isEmptyArray(recipePhotos)) {
      let photo: RecipeImage = {
        id: makeId(32),
        recipe_id: recipe.id,
        // @ts-ignore
        image_file: photo.base64,
        image_url: '',
      };
      recipePhotos.push(photo);
    } else {
      recipePhotos[cameraModuleProps.photoFor] = {
        id: makeId(32),
        recipe_id: recipe.id,
        // @ts-ignore
        image_file: photo.base64,
        image_url: '',
      };
    }
  };

  let showCameraModal = (photoFor: number) => {
    requestPermission(
      CAMERA_PERMISSION,
      'Application needs access to the camera',
      'Application needs access to the camera to take person photo.',
    ).then(accessGranted => {
      if (accessGranted) {
        cameraModuleProps.cameraLaunched = true;
        cameraModuleProps.imagePreview = null;
        cameraModuleProps.photoFor = photoFor;
        updateCameraModuleProps(cameraModuleProps);
        console.log('showCameraModal cameraModuleProps', cameraModuleProps);
      } else {
        showToast('Camera Permissions have been denied', 'short');
      }
    });
  };

  let removePhoto = (photoFor: number) => {
    let photo: RecipeImage = {
      id: makeId(32),
      recipe_id: recipe.id,
      image_file: '',
      image_url: '',
    };
    cameraModuleProps.imagePreview = null;
    cameraModuleProps.photoFor = 0;
    updateCameraModuleProps(cameraModuleProps);
    recipePhotos[photoFor] = photo;
  };
  //end

  let ingredients: any = [];
  if (!isEmptyArray(recipe.ingredients)) {
    for (let ing of recipe.ingredients) {
      ingredients.push({ txt: ing });
    }
  } else {
    ingredients.push({ txt: '' });
  }

  let setupFormValidation = () => {
    //reset if it had data
    recipeFormValidityTree = {};

    let recipeFormKeys = Object.keys(recipe);
    console.log('recipeFormKeys:', recipeFormKeys);

    //assume all valid at beginning
    for (let key of recipeFormKeys) {
      recipeFormValidityTree['' + key] = true;
    }
    recipeFormValidityTree.recipePhotos = true;

    updateFormValidityTree(recipeFormValidityTree);
    console.log('empty obj recipeFormValidityTree:', isEmptyObject(recipeFormValidityTree));
  };

  //for initial
  React.useEffect(() => {
    setupFormValidation();
    console.log('recipeFormValidityTree at CreateEditRecipeForm:', recipeFormValidityTree);
    console.log('VALIDITY CALLED:', submitPressed);
    console.log('NAME VALIDITY:', recipeFormValidityTree.name);
  }, [recipeFormValidityTree, setupFormValidation, submitPressed]);

  const FormFieldIsRequiredMessage = props => (
    <RN.Text style={[{ color: 'red' }, className(FlexContainerChildItemFullWidthCN, AlignLeftFlexContainerContentCN)]}>
      {props?.message || '* This field is required.'}
    </RN.Text>
  );

  let photoCount = !isEmptyArray(recipePhotos) ? recipePhotos.length : NUMBER_OF_RECIPE_PHOTOS;

  return (
    <RN.ScrollView style={[className(FlexColumnContainerCN)]}>
      <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
        {displayFieldExpectationSatisfied('alert', notificationAlert, eOfX => isTrue(eOfX)) && (
          <RN.View
            style={[
              className(FlexRowContainerCN),
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

      <RN.ScrollView
        style={[
          className(FlexColumnContainerCN),
          {
            backgroundColor: '#dedede',
          },
        ]}
        contentInsetAdjustmentBehavior={'automatic'}
      >
        <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
          <RN.View style={[className(FlexFluidRowContainerCN)]}>
            <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
              <RN.View style={[className(FlexFluidRowContainerCN)]}>
                <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                  <RN.View style={[className(FlexFluidRowContainerCN)]}>
                    <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                      {submitPressed && !recipeFormValidityTree.name && (
                        <React.Fragment>
                          <FormFieldIsRequiredMessage />
                          <BlankSpaceDivider />
                        </React.Fragment>
                      )}

                      <AppTextInput
                        label="Name"
                        onChangeText={text => {
                          console.log('TEXT IS CHANGING', text);
                          textValueChanged(recipe, text, 'name');
                        }}
                        value={textValue(recipe, 'name')}
                      />
                    </RN.View>

                    {submitPressed && !recipeFormValidityTree.recipePhotos && (
                      <React.Fragment>
                        <FormFieldIsRequiredMessage message={'Please upload one or more recipe photos!'} />
                        <BlankSpaceDivider />
                      </React.Fragment>
                    )}

                    <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                      <RN.View style={[className(FlexFluidRowContainerCN)]}>
                        {(_ => {
                          let photos: Array<Element> = [];
                          for (let i = 0; i < photoCount; i++) {
                            photos.push(
                              <RN.View style={[className(FlexContainerChildItemOneThirdWidthCN)]} key={makeId(16)}>
                                <PhotoInput
                                  photoIndex={i}
                                  recipePhotos={recipePhotos}
                                  removePhoto={removePhoto}
                                  showCameraModal={showCameraModal}
                                />
                              </RN.View>,
                            );
                          }
                          return photos;
                        })()}

                        <RN.View style={[className(FlexContainerChildItemOneThirdWidthCN, AlignCenterContentCN)]}>
                          <RN.TouchableOpacity
                            activeOpacity={0.6}
                            style={[
                              {
                                borderRadius: 50,
                                backgroundColor: 'teal',
                                padding: 15,
                              },
                            ]}
                            onPress={_ => {
                              addRecipePhoto(recipePhotos, recipe);
                            }}
                          >
                            <RN.Text>
                              <FontAwesomeIcon icon={faPlus} color={'white'} size={30} />
                            </RN.Text>
                          </RN.TouchableOpacity>
                        </RN.View>
                      </RN.View>
                    </RN.View>

                    {submitPressed && !recipeFormValidityTree.is_vegetarian && (
                      <React.Fragment>
                        <FormFieldIsRequiredMessage />
                        <BlankSpaceDivider />
                      </React.Fragment>
                    )}

                    <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                      <Checkbox
                        label={'Is vegetarian'}
                        onCheckBoxChange={check => {
                          checkboxItemValueChanged(recipe, check, 'is_vegetarian', 1, 0);
                        }}
                        value={recipe.is_vegetarian}
                      />
                    </RN.View>

                    {submitPressed && !recipeFormValidityTree.is_vegan && (
                      <React.Fragment>
                        <FormFieldIsRequiredMessage />
                        <BlankSpaceDivider />
                      </React.Fragment>
                    )}

                    <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                      <Checkbox
                        label={'Is Vegan'}
                        onCheckBoxChange={check => {
                          checkboxItemValueChanged(recipe, check, 'is_vegan', 1, 0);
                        }}
                        value={recipe.is_vegan}
                      />
                    </RN.View>

                    {submitPressed && isEmptyArray(recipe.ingredients) && (
                      <React.Fragment>
                        <FormFieldIsRequiredMessage message={'Please fill out ingredients'} />
                        <BlankSpaceDivider />
                      </React.Fragment>
                    )}

                    <RN.Text style={[className(FlexContainerChildItemFullWidthCN, AlignLeftFlexContainerContentCN)]}>
                      Ingredients
                    </RN.Text>

                    {!isEmptyArray(recipe.ingredients) && (
                      <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                        {recipe.ingredients?.map((item, i) => {
                          let ingredient = recipe.ingredients[i];
                          return (
                            <RN.View style={[className(FlexFluidRowContainerCN)]} key={makeId(16)}>
                              <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                                {submitPressed && isEmptyString(ingredient) && (
                                  <React.Fragment>
                                    <FormFieldIsRequiredMessage />
                                    <BlankSpaceDivider />
                                  </React.Fragment>
                                )}

                                <AppTextInput
                                  label={`${'' + (i + 1) + '. '}`}
                                  value={recipe.ingredients[i]}
                                  onChangeText={text => {
                                    textValueChanged(ingredients[i], text, 'txt');
                                    recipe.ingredients[i] = ingredients[i].txt;
                                  }}
                                />
                              </RN.View>

                              <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                                <RN.View
                                  style={[
                                    className(FlexFluidRowContainerCN, AlignLeftFlexContainerContentCN),
                                    {
                                      flexDirection: 'row-reverse',
                                    },
                                  ]}
                                >
                                  {i === recipe.ingredients.length - 1 && (
                                    <RN.TouchableOpacity
                                      activeOpacity={0.6}
                                      onPress={_ => {
                                        addIngredient(recipe);
                                      }}
                                      style={[
                                        {
                                          borderRadius: 50,
                                          backgroundColor: 'forestgreen',
                                        },
                                        className(AlignCenterContentCN),
                                      ]}
                                    >
                                      <RN.Text
                                        style={[
                                          {
                                            padding: 5,
                                          },
                                        ]}
                                      >
                                        <FontAwesomeIcon icon={faPlus} color={'white'} size={30} />
                                      </RN.Text>
                                    </RN.TouchableOpacity>
                                  )}

                                  <Spacer />

                                  {recipe.ingredients.length >= 2 && (
                                    <RN.TouchableOpacity
                                      activeOpacity={0.6}
                                      onPress={_ => {
                                        removeIngredient(recipe, i);
                                      }}
                                      style={[
                                        {
                                          borderRadius: 50,
                                          backgroundColor: 'maroon',
                                        },
                                        className(AlignCenterContentCN),
                                      ]}
                                    >
                                      <RN.Text
                                        style={[
                                          {
                                            padding: 5,
                                          },
                                        ]}
                                      >
                                        <FontAwesomeIcon icon={faMinus} color={'white'} size={30} />
                                      </RN.Text>
                                    </RN.TouchableOpacity>
                                  )}
                                </RN.View>
                              </RN.View>
                            </RN.View>
                          );
                        })}
                      </RN.View>
                    )}

                    {submitPressed && isEmptyArray(recipe.cooking_instructions) && (
                      <React.Fragment>
                        <FormFieldIsRequiredMessage message={'Please fill out preparation instructions'} />
                        <BlankSpaceDivider />
                      </React.Fragment>
                    )}

                    <RN.Text style={[className(FlexContainerChildItemFullWidthCN, AlignLeftTextCN)]}>
                      Preparation Instructions
                    </RN.Text>

                    {!isEmptyArray(recipe.cooking_instructions) && (
                      <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                        {recipe.cooking_instructions?.map((item, i) => {
                          let cooking_instruction = recipe.cooking_instructions[i];
                          console.log('cooking_instruction', cooking_instruction);
                          return (
                            <RN.View style={[className(FlexFluidRowContainerCN)]} key={makeId(16)}>
                              <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                                {submitPressed && isEmptyString(cooking_instruction) && (
                                  <React.Fragment>
                                    <FormFieldIsRequiredMessage />
                                    <BlankSpaceDivider />
                                  </React.Fragment>
                                )}

                                <AppTextInput
                                  label={`${'' + (i + 1) + '. '}`}
                                  value={recipe.cooking_instructions[i]}
                                  onChangeText={text => {
                                    textValueChanged({ text: item }, text, 'text');
                                    recipe.cooking_instructions[i] = text;
                                  }}
                                />
                              </RN.View>

                              <RN.View
                                style={[
                                  className(FlexContainerChildItemFullWidthCN, AlignLeftFlexContainerContentCN),
                                  {
                                    flexDirection: 'row-reverse',
                                  },
                                ]}
                              >
                                {i === recipe.cooking_instructions.length - 1 && (
                                  <RN.TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={_ => {
                                      addCookingInstruction(recipe);
                                    }}
                                    style={[
                                      {
                                        borderRadius: 50,
                                        backgroundColor: 'forestgreen',
                                      },
                                      className(AlignCenterContentCN),
                                    ]}
                                  >
                                    <RN.Text style={[{ padding: 5 }]}>
                                      <FontAwesomeIcon icon={faPlus} color={'white'} size={30} />
                                    </RN.Text>
                                  </RN.TouchableOpacity>
                                )}

                                <Spacer />

                                {recipe.cooking_instructions.length >= 2 && (
                                  <RN.TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={_ => {
                                      removeCookingInstruction(recipe, i);
                                    }}
                                    style={[
                                      {
                                        borderRadius: 50,
                                        backgroundColor: 'maroon',
                                      },
                                      className(AlignCenterContentCN),
                                    ]}
                                  >
                                    <RN.Text style={[{ padding: 5 }]}>
                                      <FontAwesomeIcon icon={faMinus} color={'white'} size={30} />
                                    </RN.Text>
                                  </RN.TouchableOpacity>
                                )}
                              </RN.View>
                            </RN.View>
                          );
                        })}
                      </RN.View>
                    )}

                    <BlankSpaceDivider />

                    <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                      <RN.View style={[className(FlexFluidRowContainerCN)]}>
                        <RN.Text
                          style={[className(FlexContainerChildItemFullWidthCN, AlignLeftFlexContainerContentCN)]}
                        >
                          Okay for
                        </RN.Text>

                        <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                          <RnMultiSelectKaybarax
                            style={{ zIndex: 100 }}
                            itemsList={
                              isEmptyArray(recipe.groups_suitable)
                                ? [...RecipeGroupsSuitable]
                                : [...RecipeGroupsSuitable.filter(item => !recipe.groups_suitable.includes(item.value))]
                            }
                            selectedItems={[
                              ...RecipeGroupsSuitable.filter(item => recipe.groups_suitable.includes(item.value)),
                            ]}
                            onItemSelected={value => {
                              isEmptyArray(recipe.groups_suitable) && (recipe.groups_suitable = []); //ensure array
                              //if was there, do nothing
                              let idx = recipe.groups_suitable.indexOf(value);
                              if (idx != -1) {
                                //already there
                                return;
                              }
                              recipe.groups_suitable.push(value);
                            }}
                            onItemRemoved={value => {
                              isEmptyArray(recipe.groups_suitable) && (recipe.groups_suitable = []); //ensure array
                              let idx = recipe.groups_suitable.indexOf(value);
                              idx != -1 && recipe.groups_suitable.splice(idx, 1);
                            }}
                            multiSelectDialogIsOpen={multiSelectDialogIsOpen}
                            toggleOpenMultiSelectDialog={value => {
                              toggleOpenMultiSelectDialog(value);
                            }}
                          />
                        </RN.View>
                      </RN.View>
                    </RN.View>

                    <RN.View style={[className(FlexContainerChildItemFullWidthCN)]}>
                      <RN.View style={[className(FlexFluidRowContainerCN, AlignCenterContentCN)]}>
                        {viewAction === RECIPE_BOX_VIEWS_ACTIONS_ENUM.CREATE_RECIPE && (
                          <RN.TouchableOpacity
                            activeOpacity={0.6}
                            onPress={_ => {
                              Alert.alert('Confirm!', 'Confirm Submit?', [
                                {
                                  text: 'Submit',
                                  onPress: () => {
                                    let formData = {
                                      recipe,
                                      recipePhotos,
                                    };

                                    //reset, just in case
                                    setSubmitPressed(false);

                                    //set/re-setup form validation
                                    setupFormValidation();

                                    //validate
                                    if (!isEmptyObject(recipeFormValidityTree)) {
                                      if (!isValidRecipeFormData(formData, false, recipeFormValidityTree)) {
                                        setSubmitPressed(true);
                                        updateFormValidityTree(recipeFormValidityTree);
                                        return;
                                      }

                                      submitRecipeClick(formData, notificationAlert, recipeBoxStore, navigation);
                                    } else {
                                      Alert.alert('', 'Form validation delayed!');
                                    }
                                  },
                                },
                                {
                                  text: 'Cancel',
                                  onPress: () => {
                                    //do nothing
                                  },
                                },
                              ]);
                            }}
                            style={[
                              {
                                width: '60%',
                                backgroundColor: POSITIVE_ACTION_COLOR,
                                borderRadius: 5,
                              },
                            ]}
                          >
                            <RN.Text
                              style={[
                                {
                                  fontWeight: 'bold',
                                  fontSize: 28,
                                  color: 'white',
                                },
                                className(AlignCenterTextCN),
                              ]}
                            >
                              Save Recipe
                            </RN.Text>
                          </RN.TouchableOpacity>
                        )}

                        {viewAction === RECIPE_BOX_VIEWS_ACTIONS_ENUM.EDIT_RECIPE && (
                          <RN.TouchableOpacity
                            activeOpacity={0.6}
                            onPress={_ => {
                              updateRecipeClick(recipe, notificationAlert);
                            }}
                            style={[
                              {
                                width: '60%',
                                backgroundColor: POSITIVE_ACTION_COLOR,
                                borderRadius: 5,
                              },
                            ]}
                          >
                            <RN.Text
                              style={[
                                {
                                  fontWeight: 'bold',
                                  fontSize: 28,
                                  color: 'white',
                                },
                                className(AlignCenterTextCN),
                              ]}
                            >
                              Update Recipe
                            </RN.Text>
                          </RN.TouchableOpacity>
                        )}
                      </RN.View>
                    </RN.View>
                  </RN.View>
                </RN.View>
              </RN.View>
            </RN.View>
          </RN.View>

          <BlankSpaceDivider />
        </RN.View>

        <ReactNativeCameraModule
          setCapturedImage={photo => {
            console.log('base64StringPhoto: ', photo);
            setCapturedImage(photo);
          }}
          hideCameraModal={_ => {
            cameraModuleProps.cameraLaunched = false;
            updateCameraModuleProps(cameraModuleProps);
          }}
          cameraModuleProps={cameraModuleProps}
          updateCameraModuleProps={updateCameraModuleProps}
        />
      </RN.ScrollView>

      {recipeBoxStore.loading && <Loader message={recipeBoxStore.loadingMessage} />}
    </RN.ScrollView>
  );
}
