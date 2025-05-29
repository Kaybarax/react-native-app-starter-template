//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { isEmptyArray, isEmptyString, isNullUndefined, isNumberType } from '../../util/util';
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

// Define types for activity and form data
type Activity = Record<string, any>;
type RecipeFormData = {
  recipe: Recipe;
  recipePhotos: Array<RecipeImage>;
};

/**
 * sd _ Kaybarax
 * @param formData - Recipe form data
 * @param onUpdate - Whether this is an update operation
 * @param recipeFormValidityTree - Object to track form validity
 * @returns boolean indicating if the form data is valid
 */
export const isValidRecipeFormData = (
  formData: RecipeFormData,
  onUpdate: boolean = false,
  recipeFormValidityTree: Record<string, boolean>,
): boolean => {
  let { recipe, recipePhotos } = formData;

  let validForm = true;

  //check recipe form validity

  if (isEmptyString(recipe.name)) {
    recipeFormValidityTree.name = false;
    validForm = false;
    return validForm;
  }

  if (
    !recipe.cooking_instructions ||
    isEmptyArray(recipe.cooking_instructions) ||
    (!isEmptyArray(recipe.cooking_instructions) && recipe.cooking_instructions.includes(''))
  ) {
    recipeFormValidityTree.cooking_instructions = false;
    validForm = false;
    return validForm;
  }

  if (
    !recipe.ingredients ||
    isEmptyArray(recipe.ingredients) ||
    (!isEmptyArray(recipe.ingredients) && recipe.ingredients.includes(''))
  ) {
    recipeFormValidityTree.ingredients = false;
    validForm = false;
    return validForm;
  }

  if (recipe.groups_suitable && !isEmptyArray(recipe.groups_suitable) && recipe.groups_suitable.includes('')) {
    recipeFormValidityTree.groups_suitable = false;
    validForm = false;
    return validForm;
  }

  //recipe photos
  if (
    isEmptyArray(recipePhotos) ||
    (!isEmptyArray(recipePhotos) &&
      isNullUndefined(recipePhotos.find(item => !isEmptyString(item.image_url) || !isEmptyString(item.image_file))))
  ) {
    recipeFormValidityTree.recipePhotos = false;
    validForm = false;
    return validForm;
  }

  if (isEmptyString(recipe.date_created)) {
    recipeFormValidityTree.date_created = false;
    validForm = false;
    showToast('Date not provided', 'long');
    return validForm;
  }

  // Check is_vegetarian and is_vegan values
  if (recipe.is_vegetarian !== undefined && 
      ((typeof recipe.is_vegetarian === 'number' && recipe.is_vegetarian !== 1 && recipe.is_vegetarian !== 0) ||
       (typeof recipe.is_vegetarian === 'boolean' && recipe.is_vegetarian !== true && recipe.is_vegetarian !== false))) {
    recipeFormValidityTree.is_vegetarian = false;
    validForm = false;
    return validForm;
  }

  if (recipe.is_vegan !== undefined && 
      ((typeof recipe.is_vegan === 'number' && recipe.is_vegan !== 1 && recipe.is_vegan !== 0) ||
       (typeof recipe.is_vegan === 'boolean' && recipe.is_vegan !== true && recipe.is_vegan !== false))) {
    recipeFormValidityTree.is_vegan = false;
    validForm = false;
    return validForm;
  }

  if (isEmptyString(recipe.status_ref_key_key)) {
    recipeFormValidityTree.status_ref_key_key = false;
    validForm = false;
    showToast('Status key not provided', 'long');
    return validForm;
  }

  if (isEmptyString(recipe.status_ref_key_value)) {
    recipeFormValidityTree.status_ref_key_value = false;
    validForm = false;
    showToast('Status value not provided', 'long');
    return validForm;
  }

  if (!isNumberType(recipe.rating)) {
    recipeFormValidityTree.rating = false;
    validForm = false;
    showToast('Initial rating not provided', 'long');
    return validForm;
  }

  return validForm;
};

/**
 * Add a new empty ingredient to the recipe
 * @param recipe - The recipe object
 * @param activity - Optional activity context
 */
export function addIngredient(recipe: Recipe, activity: Activity | null = null): void {
  if (!recipe.ingredients) {
    recipe.ingredients = [];
  }
  recipe.ingredients.push('');
}

/**
 * Remove an ingredient from the recipe
 * @param recipe - The recipe object
 * @param index - Index of the ingredient to remove
 * @param activity - Optional activity context
 */
export function removeIngredient(recipe: Recipe, index: number, activity: Activity | null = null): void {
  if (recipe.ingredients) {
    recipe.ingredients.splice(index, 1);
  }
}

/**
 * Add a new empty cooking instruction to the recipe
 * @param recipe - The recipe object
 * @param activity - Optional activity context
 */
export function addCookingInstruction(recipe: Recipe, activity: Activity | null = null): void {
  if (!recipe.cooking_instructions) {
    recipe.cooking_instructions = [];
  }
  recipe.cooking_instructions.push('');
}

/**
 * Remove a cooking instruction from the recipe
 * @param recipe - The recipe object
 * @param index - Index of the cooking instruction to remove
 * @param activity - Optional activity context
 */
export function removeCookingInstruction(recipe: Recipe, index: number, activity: Activity | null = null): void {
  if (recipe.cooking_instructions) {
    recipe.cooking_instructions.splice(index, 1);
  }
}

/**
 * Handle recipe submission
 * @param formData - Recipe form data
 * @param notificationAlert - Notification alert object
 * @param recipeBoxStore - Recipe box store
 * @param navigator - Navigation object
 * @param activity - Optional activity context
 */
export function submitRecipeClick(
  formData: RecipeFormData,
  notificationAlert: any,
  recipeBoxStore: any,
  navigator: any,
  activity: Activity | null = null,
): void {
  let { recipe, recipePhotos } = formData;
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
      return threadWorkListener.saveRecipeTransactionComplete;
    },
  );
}

/**
 * Handle recipe update
 * @param formData - Recipe form data
 * @param notificationAlert - Notification alert object
 * @param recipeBoxStore - Recipe box store
 * @param navigator - Navigation object
 * @param activity - Optional activity context
 */
export function updateRecipeClick(
  formData: RecipeFormData,
  notificationAlert: any,
  recipeBoxStore: any,
  navigator: any,
  activity: Activity | null = null,
): void {
  const { recipe, recipePhotos } = formData;
  const userId = recipeBoxStore.user.id;

  invokeLoader(recipeBoxStore);

  const db = APP_SQLITE_DATABASE.DB_REFERENCE;

  // Update recipe in database
  appSQLiteDb.transactionSuccess = false;
  appSQLiteDb.updateRecipeStmt(db, recipe);

  if (appSQLiteDb.transactionSuccess) {
    // Update recipe photos
    const validPhotos = recipePhotos.filter(item => !isEmptyString(item.image_file) || !isEmptyString(item.image_url));

    for (const photo of validPhotos) {
      appSQLiteDb.updateRecipeImageStmt(db, photo);
    }

    // Reload database
    appSQLiteDb.dbLoadedAndInitialized = false;
    appSQLiteDb.loadAndInitDB();

    if (appSQLiteDb.dbLoadedAndInitialized) {
      // Update user recipes
      recipeBoxStore.recipeItems = fetchUserRecipes(userId);

      // Show success notification
      const workMessage = 'Recipe updated successfully!';
      showToast(workMessage);
      notificationCallback('succ', workMessage, notificationAlert);

      // Navigate back to recipe box home
      appNavigation.navigateToRecipeBoxHome(navigator);
    } else {
      const errorMessage = 'Failed to reload data after update';
      showToast(errorMessage);
      notificationCallback('err', errorMessage, notificationAlert);
    }
  } else {
    const errorMessage = 'Failed to update recipe';
    showToast(errorMessage);
    notificationCallback('err', errorMessage, notificationAlert);
  }
}
