/* eslint-disable @typescript-eslint/no-unused-vars */
//key
//sd - self described

import { isEmptyArray, isEmptyString, isNullUndefined, makeId } from '../../util/util';
import { Recipe, RecipeImage, UserRecipe } from '../../app-management/data-manager/models-manager';
import { NUMBER_OF_RECIPE_PHOTOS } from '../../app-config';
import { showToast } from '../../util/react-native-based-utils';
import { appSQLiteDb } from '../../app-management/data-manager/embeddedDb-manager';

/**
 * sd _ Kaybarax
 * @param recipeBoxStore
 * @param activity
 */
export function createRecipe(recipeBoxStore, activity = null) {
  //the recipe
  let recipe: Recipe = { id: makeId(32) };
  recipe.date_created = new Date().toISOString();
  recipe.ingredients = ['']; //add first initial entry
  recipe.cooking_instructions = ['']; //add first initial entry
  recipe.status_ref_key_key = 'STATUS'; //set status
  recipe.status_ref_key_value = 'ACT'; //set status
  recipe.groups_suitable = [];
  recipe.name = '';
  recipe.is_vegetarian = 0;
  recipe.is_vegan = 0;
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

export function addRecipePhoto(recipePhotos, recipe) {
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
 * sd _ Kaybarax
 * @param activity
 */
export function toggleDarkMode(activity) {
  activity.appStore.darkMode = !activity.appStore.darkMode;
  activity.$vuetify.theme.dark = activity.appStore.darkMode;
}

/**
 * sd _ Kaybarax
 * @param recipe
 * @param activity
 */
export function deleteRecipe(recipe: Recipe, activity = null) {
  recipe.status_ref_key_value = 'DEL';
}

export function fetchUserRecipes(userId) {
  let recipeItems: Array<any> = [];

  console.log('fetchUserRecipes userId', userId);

  if (isEmptyArray(appSQLiteDb.usersRecipesQueryResults)) {
    return recipeItems;
  }

  console.log('fetchUserRecipes urs', appSQLiteDb.usersRecipesQueryResults);

  let userRecipes: Array<UserRecipe> = appSQLiteDb.usersRecipesQueryResults.filter(
    (item: UserRecipe) => item.user_id === userId,
  );
  if (isEmptyArray(userRecipes)) {
    return recipeItems;
  }
  console.log('fetchUserRecipes userRecipes', userRecipes);

  let recipes: Array<Recipe> = appSQLiteDb.recipesQueryResults.filter((item: Recipe) => {
    return !isNullUndefined(userRecipes.find(it => it.recipe_id === item.id));
  });
  console.log('fetchUserRecipes recipes', recipes);

  if (isEmptyArray(recipes)) {
    return recipeItems;
  }

  recipeItems = recipes.map(item => {
    let recipeItem = {};
    let recipeItemPhotos: Array<RecipeImage> = [];
    for (let it of appSQLiteDb.recipesPhotosQueryResults) {
      if (item.id === it.recipe_id) {
        recipeItemPhotos.push(it);
      }
    }

    //because was saved as string
    // @ts-ignore
    let cooking_instructions: string = item.cooking_instructions;
    console.log('split cooking_instructions', cooking_instructions);
    !isEmptyString(cooking_instructions) && (item.cooking_instructions = cooking_instructions.split(','));
    // @ts-ignore
    let ingredients: string = item.ingredients;
    console.log('split ingredients', ingredients);
    !isEmptyString(ingredients) && (item.ingredients = ingredients.split(','));
    // @ts-ignore
    let groups_suitable: string = item.groups_suitable;
    console.log('split groups_suitable', groups_suitable);
    !isEmptyString(groups_suitable) && (item.groups_suitable = groups_suitable.split(','));

    console.log('item.groups_suitable', item.groups_suitable);

    // @ts-ignore
    recipeItem.recipe = item;
    // @ts-ignore
    recipeItem.recipePhotos = recipeItemPhotos;
    return recipeItem;
  });

  return recipeItems;
}
