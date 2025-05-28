//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

//your app models here

export interface AppRefKeys {
  key: string;
  label: string;
  value: string;
}

export type User = {
  id: string;
  name?: string;
  email?: string;
  username?: string;
  status_ref_key_key?: string;
  status_ref_key_value?: string;
};

export interface UserCredentials {
  username: string;
  password_hash?: string;
  salt?: object;
}

export interface Recipe {
  id: string;
  name?: string;
  is_vegetarian?: false | true | 0 | 1;
  is_vegan?: false | true | 0 | 1;
  ingredients?: Array<string>;
  cooking_instructions?: Array<string>;
  groups_suitable?: Array<string>;
  date_created?: string;
  rating?: number;
  status_ref_key_key?: string;
  status_ref_key_value?: string;
}

export interface RecipeImage {
  id: string;
  recipe_id?: string;
  image_url: string;
  image_file: string;
}

export interface UserRecipe {
  user_id: string;
  recipe_id?: string;
}

/**
 * sd _ Kaybarax
 * @param code
 * @param label
 * @returns {{code: *, name: *}}
 * @constructor
 */
export function FoodGroupConsumer(code, label) {
  return {
    value: code,
    label: label,
  };
}
