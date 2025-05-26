//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { isEmptyArray, isEmptyString, isNullUndefined, isNumberType } from '../../util/util';
import { toJS } from '../../stores';
import { Recipe, RecipeImage, UserRecipe } from '../../app-management/data-manager/models-manager';
import { showToast } from '../../util/react-native-based-utils';
import { APP_SQLITE_DATABASE } from '../../app-management/data-manager/db-config';
import { notificationCallback } from '../../shared-components-and-modules/notification-center/notifications-controller';
import { appSQLiteDb } from '../../app-management/data-manager/embeddedDb-manager';
import { serviceWorkerThread } from '../app-controller';
import { TIME_OUT } from '../../app-config';
import appNavigation from '../../routing-and-navigation/app-navigation';
import { fetchUserRecipes } from './recipe-box-controller';
import { invokeLoader } from '../../shared-components-and-modules/loaders';

/**
 * sd _ Kaybarax
 * @param formData
 * @param onUpdate
 * @param recipeFormValidityTree
 */
export const isValidRecipeFormData = (formData, onUpdate = false, recipeFormValidityTree) => {
  let { recipe, recipePhotos }: { recipe: Recipe; recipePhotos: Array<RecipeImage> } = formData;

  console.log('recipeFormValidityTree at isValidRecipeFormData:', recipeFormValidityTree);

  let validForm = true;

  //check recipe form validity

  if (isEmptyString(recipe.name)) {
    console.log('name');
    recipeFormValidityTree.name = false;
    console.log('RAN recipeFormValidityTree', recipeFormValidityTree);
    validForm = false;
    return validForm;
  }

  if (
    isEmptyArray(recipe.cooking_instructions) ||
    (!isEmptyArray(recipe.cooking_instructions) && recipe.cooking_instructions?.includes(''))
  ) {
    console.log('cooking_instructions');
    recipeFormValidityTree.cooking_instructions = false;
    console.log('recipeFormValidityTree', recipeFormValidityTree);
    validForm = false;
    return validForm;
  }

  if (isEmptyArray(recipe.ingredients) || (!isEmptyArray(recipe.ingredients) && recipe.ingredients?.includes(''))) {
    console.log('ingredients');
    recipeFormValidityTree.ingredients = false;
    console.log('recipeFormValidityTree', recipeFormValidityTree);
    validForm = false;
    return validForm;
  }

  if (!isEmptyArray(recipe.groups_suitable) && recipe.groups_suitable?.includes('')) {
    console.log('ingredients');
    recipeFormValidityTree.groups_suitable = false;
    console.log('recipeFormValidityTree', recipeFormValidityTree);
    validForm = false;
    return validForm;
  }

  //recipe photos
  if (
    isEmptyArray(recipePhotos) ||
    (!isEmptyArray(recipePhotos) &&
      isNullUndefined(recipePhotos.find(item => !isEmptyString(item.image_url) || !isEmptyString(item.image_file))))
  ) {
    console.log('recipePhotos', toJS(recipePhotos));
    recipeFormValidityTree.recipePhotos = false;
    console.log('recipeFormValidityTree', recipeFormValidityTree);
    validForm = false;
    return validForm;
  }

  if (isEmptyString(recipe.date_created)) {
    console.log('date_created');
    recipeFormValidityTree.date_created = false;
    console.log('recipeFormValidityTree', recipeFormValidityTree);
    validForm = false;
    showToast('Date not provided', 'long');
    return validForm;
  }

  //faulty
  // if (!isBoolean(recipe['is_vegetarian']) ||
  //     // @ts-ignore
  //     (isNumberType(recipe['is_vegetarian']) && (recipe['is_vegetarian'] != 1 && recipe['is_vegetarian'] != 0))
  // ) {
  //     console.log(`recipe['is_vegetarian']`, recipe['is_vegetarian'])
  //     console.log(`OORR`,
  //         (!isBoolean(recipe['is_vegetarian']) ||
  //             // @ts-ignore
  //             (isNumberType(recipe['is_vegetarian']) && (recipe['is_vegetarian'] != 1 && recipe['is_vegetarian'] != 0)))
  //     );
  //     console.log(`isNumberType(recipe['is_vegetarian']`, isNumberType(recipe['is_vegetarian']))
  //     recipeFormValidityTree['is_vegetarian'] = false;
  //     console.log('recipeFormValidityTree', recipeFormValidityTree);
  //     validForm = false;
  //     return validForm;
  // }
  //
  // if (!isBoolean(recipe['is_vegan']) ||
  //     // @ts-ignore
  //     (isNumberType(recipe['is_vegan']) && (recipe['is_vegan'] !== 1 || recipe['is_vegan'] !== 0))
  // ) {
  //     console.log('is_vegan')
  //     recipeFormValidityTree['is_vegan'] = false;
  //     console.log('recipeFormValidityTree', recipeFormValidityTree);
  //     validForm = false;
  //     return validForm;
  // }

  if (isEmptyString(recipe.status_ref_key_key)) {
    console.log('status_ref_key_key');
    recipeFormValidityTree.status_ref_key_key = false;
    console.log('recipeFormValidityTree', recipeFormValidityTree);
    validForm = false;
    showToast('Status key not provided', 'long');
    return validForm;
  }

  if (isEmptyString(recipe.status_ref_key_value)) {
    console.log('status_ref_key_value');
    recipeFormValidityTree.status_ref_key_value = false;
    console.log('recipeFormValidityTree', recipeFormValidityTree);
    validForm = false;
    showToast('Status value not provided', 'long');
    return validForm;
  }

  if (!isNumberType(recipe.rating)) {
    console.log('rating');
    recipeFormValidityTree.rating = false;
    console.log('recipeFormValidityTree', recipeFormValidityTree);
    validForm = false;
    showToast('Initial rating not provided', 'long');
    return validForm;
  }

  console.log('recipe validForm::', validForm);

  return validForm;
};

export function addIngredient(recipe, activity = null) {
  recipe.ingredients.push('');
  console.log('addIngredient', toJS(recipe));
}

export function removeIngredient(recipe, index, activity = null) {
  recipe.ingredients.splice(index, 1);
}

export function addCookingInstruction(recipe, activity = null) {
  recipe.cooking_instructions.push('');
}

export function removeCookingInstruction(recipe, index, activity = null) {
  recipe.cooking_instructions.splice(index, 1);
}

export function submitRecipeClick(formData, notificationAlert, recipeBoxStore, navigator, activity = null) {
  console.log('submitRecipeClick');
  let { recipe, recipePhotos }: { recipe: Recipe; recipePhotos: Array<RecipeImage> } = formData;
  let userId = recipeBoxStore.user.id;

  invokeLoader(recipeBoxStore);

  let validPhotos = recipePhotos.filter(item => !isEmptyString(item.image_file) || !isEmptyString(item.image_url));

  let threadWorkListener = {
    recipeSaved: false,
    recipePhotosSaved: 0,
    allRecipePhotosSaved: false,
    recipeUserSaved: false,
    saveRecipeTransactionComplete: false,
  };

  let threadPool = [];

  let db = APP_SQLITE_DATABASE.DB_REFERENCE;

  serviceWorkerThread(
    () => {
      invokeLoader(recipeBoxStore);
      appSQLiteDb.transactionSuccess = false;
      appSQLiteDb.addRecipeStmt(db, recipe);
    },
    (): boolean => {
      return appSQLiteDb.transactionSuccess;
    },
    () => {
      let workMessage = 'Recipe saved';

      showToast(workMessage);

      threadWorkListener.recipeSaved = true;
    },
    () => {
      let workMessage = 'Save recipe failed!';
      showToast(workMessage);
      notificationCallback('err', workMessage, notificationAlert);
    },
    TIME_OUT,
    1000,
    threadPool,
  );

  //now save photos
  for (let item of validPhotos) {
    let idx = validPhotos.indexOf(item);
    saveRecipePhoto(item, idx);
  }

  function saveRecipePhoto(recipePhoto: RecipeImage, idx: number) {
    serviceWorkerThread(
      () => {
        invokeLoader(recipeBoxStore);
        console.log('Start save recipe photo:', recipePhoto);
        appSQLiteDb.transactionSuccess = false;
        appSQLiteDb.addRecipeImageStmt(db, recipePhoto);
      },
      (): boolean => {
        return appSQLiteDb.transactionSuccess;
      },
      () => {
        let workMessage = `Recipe photo ${idx + 1} saved`;

        showToast(workMessage);

        if (idx === validPhotos.length - 1) {
          threadWorkListener.allRecipePhotosSaved = true;
        }
      },
      () => {
        let workMessage = `Failed to save recipe photo ${idx + 1}`;
        showToast(workMessage);
      },
      TIME_OUT * (idx + 1) * 2,
      1000,
      threadPool,
      (): boolean => {
        return threadWorkListener.recipeSaved;
      },
    );
  }

  //now save recipe user
  serviceWorkerThread(
    () => {
      let userRecipe: UserRecipe = {
        user_id: userId,
        recipe_id: recipe.id,
      };

      invokeLoader(recipeBoxStore);

      appSQLiteDb.transactionSuccess = false;

      appSQLiteDb.addUserRecipeStmt(db, userRecipe);
    },
    (): boolean => {
      return appSQLiteDb.transactionSuccess;
    },
    () => {
      let workMessage = 'Added recipe for user';

      showToast(workMessage);

      threadWorkListener.saveRecipeTransactionComplete = true;
    },
    () => {
      let workMessage = 'Failed to add recipe for user';
      showToast(workMessage);
    },
    TIME_OUT * (validPhotos.length + 1),
    1000,
    threadPool,
    (): boolean => {
      return threadWorkListener.allRecipePhotosSaved;
    },
  );

  //reload db
  serviceWorkerThread(
    _ => {
      invokeLoader(recipeBoxStore);
      console.log('Recipe Transaction complete, start reload');
      appSQLiteDb.dbLoadedAndInitialized = false;
      appSQLiteDb.loadAndInitDB();
    },
    _ => {
      return appSQLiteDb.dbLoadedAndInitialized;
    },
    _ => {
      let workMessage = 'Save recipe transaction success!';
      showToast(workMessage);
      notificationCallback('succ', workMessage, notificationAlert);
      //update user recipes
      recipeBoxStore.recipeItems = fetchUserRecipes(userId);
      // appNavigation.navigateBack(navigator)
      appNavigation.navigateToRecipeBoxHome(navigator);
    },
    _ => {
      let workMessage = 'Failed to reload data';
      showToast(workMessage);
      notificationCallback('err', workMessage, notificationAlert);
    },
    TIME_OUT * 2 * (validPhotos.length + 1),
    1000,
    threadPool,
    (): boolean => {
      console.log('Ready run reload');
      return threadWorkListener.saveRecipeTransactionComplete;
    },
  );
}

export const updateRecipeClick = (formData, notificationAlert, activity: object | any = null) => {
  notificationCallback('succ', "Hey mate! You've gotten the gist by now from this starter template", notificationAlert);
};
