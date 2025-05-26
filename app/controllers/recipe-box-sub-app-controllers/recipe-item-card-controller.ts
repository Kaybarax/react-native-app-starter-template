/* eslint-disable @typescript-eslint/no-unused-vars */
//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { RECIPE_BOX_VIEWS_ACTIONS_ENUM } from '../../stores/actions-and-stores-data';
import appNavigation from '../../routing-and-navigation/app-navigation';

/**
 * sd _ Kaybarax
 * @param recipeDetails
 * @param navigation
 * @param navStore
 * @param activity
 * @param recipeBoxStore
 */
export function viewRecipeFullDetailsClick(recipeDetails, recipeBoxStore, navigation, navStore, activity = null) {
  recipeBoxStore.selectedRecipe = recipeDetails.recipe;
  recipeBoxStore.selectedRecipePhotos = recipeDetails.recipePhotos;
  recipeBoxStore.viewAction = RECIPE_BOX_VIEWS_ACTIONS_ENUM.VIEW_SINGLE_RECIPE;
  appNavigation.navigateToRecipeDetails(navigation, recipeDetails);
}

/**
 * sd _ Kaybarax
 * @param activity
 * @param recipe
 * @param navigation
 * @param recipeBoxStore
 */
export function editRecipeClick(recipe, recipePhotos, recipeBoxStore, navigation, activity = null) {
  recipeBoxStore.selectedRecipe = recipe;
  recipeBoxStore.selectedRecipePhotos = recipePhotos;
  recipeBoxStore.viewAction = RECIPE_BOX_VIEWS_ACTIONS_ENUM.EDIT_RECIPE;
  appNavigation.navigateToCreateEditRecipe(navigation, {
    recipe: recipeBoxStore.selectedRecipe,
    recipePhotos: recipeBoxStore.selectedRecipePhotos,
  });
}

/**
 * sd _ Kaybarax
 * @param rootStore
 */
export function beforeEnterHomepage(rootStore) {
  rootStore.appStores.recipeBoxStore.viewAction = null;
  rootStore.appStores.recipeBoxStore.selectedRecipe = null;
}
