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
import { Recipe, RecipeImage } from '../../app-management/data-manager/models-manager';

// Define types
type Activity = Record<string, any>;
type RecipeBoxStore = {
  selectedRecipe: Recipe | null;
  selectedRecipePhotos: Array<RecipeImage>;
  viewAction: string | null;
  [key: string]: any;
};
type NavStore = Record<string, any>;
type RecipeDetails = {
  recipe: Recipe;
  recipePhotos: Array<RecipeImage>;
};

/**
 * Navigate to recipe details view
 * @param recipeDetails - Recipe details object
 * @param recipeBoxStore - Recipe box store
 * @param navigation - Navigation object
 * @param navStore - Navigation store
 * @param activity - Optional activity context
 */
export function viewRecipeFullDetailsClick(
  recipeDetails: RecipeDetails,
  recipeBoxStore: RecipeBoxStore,
  navigation: any,
  navStore: NavStore,
  activity: Activity | null = null
): void {
  recipeBoxStore.selectedRecipe = recipeDetails.recipe;
  recipeBoxStore.selectedRecipePhotos = recipeDetails.recipePhotos;
  recipeBoxStore.viewAction = RECIPE_BOX_VIEWS_ACTIONS_ENUM.VIEW_SINGLE_RECIPE;
  appNavigation.navigateToRecipeDetails(navigation, recipeDetails);
}

/**
 * Navigate to edit recipe view
 * @param recipe - Recipe object
 * @param recipePhotos - Recipe photos array
 * @param recipeBoxStore - Recipe box store
 * @param navigation - Navigation object
 * @param activity - Optional activity context
 */
export function editRecipeClick(
  recipe: Recipe,
  recipePhotos: Array<RecipeImage>,
  recipeBoxStore: RecipeBoxStore,
  navigation: any,
  activity: Activity | null = null
): void {
  recipeBoxStore.selectedRecipe = recipe;
  recipeBoxStore.selectedRecipePhotos = recipePhotos;
  recipeBoxStore.viewAction = RECIPE_BOX_VIEWS_ACTIONS_ENUM.EDIT_RECIPE;
  appNavigation.navigateToCreateEditRecipe(navigation, {
    recipe: recipeBoxStore.selectedRecipe,
    recipePhotos: recipeBoxStore.selectedRecipePhotos,
  });
}

/**
 * Reset store state before entering homepage
 * @param rootStore - Root store containing app stores
 */
export function beforeEnterHomepage(rootStore: { appStores: { recipeBoxStore: RecipeBoxStore } }): void {
  rootStore.appStores.recipeBoxStore.viewAction = null;
  rootStore.appStores.recipeBoxStore.selectedRecipe = null;
}
