/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { isEmptyArray, isEmptyString, isNullUndefined, makeId } from '../../util/util';
import { Recipe, RecipeImage, UserRecipe } from '../../app-management/data-manager/models-manager';
import { NUMBER_OF_RECIPE_PHOTOS } from '../../app-config';
import { showToast } from '../../util/react-native-based-utils';
import { appSQLiteDb } from '../../app-management/data-manager/embeddedDb-manager';

// Define types
type Activity = Record<string, any>;
type RecipeBoxStore = {
  user: any;
  selectedRecipe: Recipe | null;
  selectedRecipePhotos: Array<RecipeImage>;
  recipeItems: Array<any>;
};

/**
 * Create a new recipe
 * @param recipeBoxStore - Recipe box store
 * @param activity - Optional activity context
 */
export function createRecipe(recipeBoxStore: RecipeBoxStore, activity: Activity | null = null): void {
  //the recipe
  let recipe: Recipe = { id: makeId(32) };
  recipe.date_created = new Date().toISOString();
  recipe.ingredients = ['']; //add first initial entry
  recipe.cooking_instructions = ['']; //add first initial entry
  recipe.status_ref_key_key = 'STATUS'; //set status
  recipe.status_ref_key_value = 'ACT'; //set status
  recipe.groups_suitable = [];
  recipe.name = '';
  recipe.is_vegetarian = false;
  recipe.is_vegan = false;
  recipe.rating = 0;
  //the photos
  let recipePhotos: Array<RecipeImage> = [];
  for (let i = 0; i < NUMBER_OF_RECIPE_PHOTOS; i++) {
    let recipePhoto: RecipeImage = {
      id: makeId(32),
      recipe_id: recipe.id,
      image_url: '',
      image_file: '',
    };
    recipePhotos.push(recipePhoto);
  }
  recipeBoxStore.selectedRecipe = recipe;
  recipeBoxStore.selectedRecipePhotos = recipePhotos;
}

/**
 * Add a photo to a recipe
 * @param recipePhotos - Array of recipe photos
 * @param recipe - Recipe object
 */
export function addRecipePhoto(recipePhotos: Array<RecipeImage>, recipe: Recipe): void {
  if (isEmptyArray(recipePhotos)) {
    showToast('Cannot add recipe photo.');
    return;
  }
  if (recipePhotos.length >= 5) {
    showToast('Maximum recipe photos reached.');
    return;
  }

  let recipePhoto: RecipeImage = {
    id: makeId(32),
    recipe_id: recipe.id,
    image_url: '',
    image_file: '',
  };
  recipePhotos.push(recipePhoto);
}

/**
 * Toggle dark mode
 * @param activity - Activity with appStore
 */
export function toggleDarkMode(activity: Activity): void {
  if (activity && activity.appStore) {
    activity.appStore.darkMode = !activity.appStore.darkMode;

    // Check if $vuetify exists before accessing it
    if (activity.$vuetify && activity.$vuetify.theme) {
      activity.$vuetify.theme.dark = activity.appStore.darkMode;
    }
  }
}

/**
 * Mark a recipe as deleted
 * @param recipe - Recipe to delete
 * @param activity - Optional activity context
 */
export function deleteRecipe(recipe: Recipe, activity: Activity | null = null): void {
  recipe.status_ref_key_value = 'DEL';
}

/**
 * Fetch recipes for a specific user
 * @param userId - User ID
 * @returns Array of recipe items
 */
export function fetchUserRecipes(userId: string): Array<any> {
  let recipeItems: Array<any> = [];

  if (isEmptyArray(appSQLiteDb.usersRecipesQueryResults)) {
    return recipeItems;
  }

  let userRecipes: Array<UserRecipe> = appSQLiteDb.usersRecipesQueryResults.filter(
    (item: UserRecipe) => item.user_id === userId,
  );

  if (isEmptyArray(userRecipes)) {
    return recipeItems;
  }

  let recipes: Array<Recipe> = appSQLiteDb.recipesQueryResults.filter((item: Recipe) => {
    return !isNullUndefined(userRecipes.find(it => it.recipe_id === item.id));
  });

  if (isEmptyArray(recipes)) {
    return recipeItems;
  }

  recipeItems = recipes.map(item => {
    let recipeItem: { recipe?: Recipe; recipePhotos?: Array<RecipeImage> } = {};
    let recipeItemPhotos: Array<RecipeImage> = [];

    for (let it of appSQLiteDb.recipesPhotosQueryResults) {
      if (item.id === it.recipe_id) {
        recipeItemPhotos.push(it);
      }
    }

    // Process arrays that were saved as strings
    const cooking_instructions = item.cooking_instructions as unknown as string;
    if (!isEmptyString(cooking_instructions)) {
      item.cooking_instructions = cooking_instructions.split(',');
    }

    const ingredients = item.ingredients as unknown as string;
    if (!isEmptyString(ingredients)) {
      item.ingredients = ingredients.split(',');
    }

    const groups_suitable = item.groups_suitable as unknown as string;
    if (!isEmptyString(groups_suitable)) {
      item.groups_suitable = groups_suitable.split(',');
    }

    recipeItem.recipe = item;
    recipeItem.recipePhotos = recipeItemPhotos;
    return recipeItem;
  });

  return recipeItems;
}
