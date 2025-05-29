//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { AppRefKeys, Recipe, RecipeImage, User, UserCredentials, UserRecipe } from './models-manager';
import { makeId } from '../../util/util';
import { SQLiteDatabase } from 'expo-sqlite';

export const APP_SQLITE_DATABASE = {
  DATABASE_VERSION: '1.0',
  DATABASE_SIZE: 200000,
  DB_REFERENCE: null as SQLiteDatabase | null,
  DATABASES: {
    APP_DB: {
      name: 'RNTSAST_AD.db',
      tables: {
        Version: {
          name: 'Version',
          get schema() {
            return {};
          },
        },
        APP_REF_KEYS: {
          name: 'APP_REF_KEYS',
          get schema() {
            let schema: AppRefKeys = {
              key: '',
              label: '',
              value: '',
            };
            return schema;
          },
        },
        USER: {
          name: 'USER',
          get schema() {
            let schema: User = { id: makeId(32) };
            return schema;
          },
        },
        USER_CREDENTIALS: {
          name: 'USER_CREDENTIALS',
          schema() {
            let schema: UserCredentials = { 
              username: makeId(32),
              password_hash: '',
              salt: ''
            };
            return schema;
          },
        },
        RECIPE: {
          name: 'RECIPE',
          schema() {
            let schema: Recipe = { id: makeId(32) };
            return schema;
          },
        },
        RECIPE_IMAGE: {
          name: 'RECIPE_IMAGE',
          schema() {
            let schema: RecipeImage = {
              id: makeId(32),
              image_file: '',
              image_url: '',
            };
            return schema;
          },
        },
        USER_RECIPE: {
          name: 'USER_RECIPE',
          schema() {
            let schema: UserRecipe = {
              user_id: makeId(32),
              recipe_id: makeId(32),
            };
            return schema;
          },
        },
      },
    },
  },
};
