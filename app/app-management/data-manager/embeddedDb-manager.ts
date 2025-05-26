//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import SQLite from 'react-native-sqlite-storage';
import {APP_SQLITE_DATABASE} from './db-config';
import {
  isBoolean,
  isEmptyArray,
  isNullUndefined,
  stringifyObject,
} from '../../util/util';

SQLite.DEBUG(true);
SQLite.enablePromise(false);

/**
 * sd _ Kaybarax
 */
class AppSQLiteDb {
  progress: string[];
  latestProgressUpdate: string;
  dbLoadedAndInitialized: boolean;
  transactionSuccess: boolean;
  queryResults: any[];
  usersQueryResults: any[];
  usersCredentialsQueryResults: any[];
  recipesQueryResults: any[];
  recipesPhotosQueryResults: any[];
  usersRecipesQueryResults: any[];
  appDatabase: any;
  appDatabaseTables: any;

  constructor() {
    this.progress = [];
    this.latestProgressUpdate = 'Initializing app db...';
    this.dbLoadedAndInitialized = false;
    this.transactionSuccess = false;
    this.queryResults = [];
    this.usersQueryResults = [];
    this.usersCredentialsQueryResults = [];
    this.recipesQueryResults = [];
    this.recipesPhotosQueryResults = [];
    this.usersRecipesQueryResults = [];
    this.appDatabase = APP_SQLITE_DATABASE.DATABASES.APP_DB;
    this.appDatabaseTables = APP_SQLITE_DATABASE.DATABASES.APP_DB.tables;
    this.updateProgress('Load and bootstrap app database...');
  }

  updateProgress = (text: string): void => {
    this.latestProgressUpdate = text;
    this.progress.push(text);
    console.log('PROGRESS::', this.progress);
  };

  errorCB = (err: any): boolean => {
    console.log('error: ', err);
    this.updateProgress('Error: ' + (err.message || err));
    this.transactionSuccess = false;
    return this.transactionSuccess;
  };

  successCB = (): boolean => {
    console.log('SQL executed ...');
    this.transactionSuccess = true;
    return this.transactionSuccess;
  };

  openCB = (): void => {
    this.updateProgress('Database OPEN');
  };

  closeCB = (): void => {
    this.updateProgress('Database CLOSED');
  };

  deleteCB = (): void => {
    console.log('Database DELETED');
    this.updateProgress('Database DELETED');
  };

  loadAndInitDB = (): void => {
    this.updateProgress('Opening database ...');
    APP_SQLITE_DATABASE.DB_REFERENCE = SQLite.openDatabase(
      this.appDatabase.name,
      APP_SQLITE_DATABASE.DATABASE_VERSION,
      this.appDatabase.name,
      APP_SQLITE_DATABASE.DATABASE_SIZE,
      this.openCB,
      this.errorCB,
    );
    this.initDatabase(APP_SQLITE_DATABASE.DB_REFERENCE);
  };

  initDatabase = (db: any): void => {
    this.updateProgress('Database integrity check');

    this.updateProgress('Check if db already setup');
    db.executeSql(
      'SELECT 1 FROM ' + this.appDatabaseTables.Version.name + ' LIMIT 1',
      [],
      () => {
        //on success
        this.updateProgress('Database is ready ... executing test query ...');
        db.transaction(
          this.runInitialQueriesAndLoadInitialData,
          this.errorCB,
          () => {
            //on success
            this.updateProgress('Processing completed');
            this.dbLoadedAndInitialized = true;
          },
        );
      },
      (error: any) => {
        //on error
        console.log('received version error:', error);
        this.updateProgress(
          'received version error: ' + stringifyObject(error),
        );
        this.updateProgress(
          'Database not yet ready ... will try to populate db',
        );
        //populate db
        this.updateProgress('Populate db');
        db.transaction(this.populateDB, this.errorCB, () => {
          //on success
          this.updateProgress('Database populated ... executing query ...');
          //attempt again the initial queries
          db.transaction(
            this.runInitialQueriesAndLoadInitialData,
            this.errorCB,
            () => {
              //on success
              this.updateProgress('Transaction is now finished');
              this.updateProgress('Processing completed');
              this.dbLoadedAndInitialized = true;
              this.closeDatabase();
            },
          );
        });
      },
    );

    if (this.dbLoadedAndInitialized) {
      console.log('## DATABASE INITIALIZED AND LOADED ##');
    }
  };

  populateDB = (dbtx: any): void => {
    this.updateProgress('Executing Create stmts');
    //db bootstrap tables creation
    this.runInitialTablesCreation(dbtx);

    this.updateProgress('Executing INSERT stmts');
    //db bootstrap inserts
    this.runInitialInserts(dbtx);

    console.log('All SQL stmts done');
  };

  runInitialTablesCreation = (dbtx: any): void => {
    dbtx.executeSql(
      'CREATE TABLE IF NOT EXISTS Version ( ' +
        'version_id INTEGER PRIMARY KEY NOT NULL); ',
      [],
      this.successCB,
      this.errorCB,
    );
    this.updateProgress('CREATE TABLE Version Success');

    dbtx.executeSql('DROP TABLE IF EXISTS APP_REF_KEYS;');
    dbtx.executeSql(
      `CREATE TABLE IF NOT EXISTS APP_REF_KEYS (
        key VARCHAR(20),
        label VARCHAR(100),
        value VARCHAR(10),
        PRIMARY KEY (key,value)
      );`,
      [],
      this.successCB,
      this.errorCB,
    );
    this.updateProgress('CREATE TABLE APP_REF_KEYS Success');

    dbtx.executeSql('DROP TABLE IF EXISTS USER;');
    dbtx.executeSql(
      `CREATE TABLE IF NOT EXISTS USER (
        id VARCHAR(32),
        name VARCHAR(50),
        email VARCHAR(50),
        username VARCHAR(16),
        status_ref_key_key VARCHAR(20),
        status_ref_key_value VARCHAR(10),
        PRIMARY KEY (id),
        FOREIGN KEY ( status_ref_key_key, status_ref_key_value ) REFERENCES APP_REF_KEYS ( key, value )
      );`,
      [],
      this.successCB,
      this.errorCB,
    );
    this.updateProgress('CREATE TABLE USER Success');

    dbtx.executeSql('DROP TABLE IF EXISTS USER_CREDENTIALS;');
    dbtx.executeSql(
      `CREATE TABLE IF NOT EXISTS USER_CREDENTIALS (
        username VARCHAR(16),
        password_hash VARCHAR(128),
        salt TEXT, --varbinary(24)
        PRIMARY KEY (username),
        FOREIGN KEY ( username ) REFERENCES USER ( username )
      );`,
      [],
      this.successCB,
      this.errorCB,
    );
    this.updateProgress('CREATE TABLE USER_CREDENTIALS Success');

    dbtx.executeSql('DROP TABLE IF EXISTS RECIPE;');
    dbtx.executeSql(
      `CREATE TABLE IF NOT EXISTS RECIPE (
        id VARCHAR(32) NOT NULL,
        name VARCHAR(128),
        is_vegetarian INTEGER, --boolean DEFAULT false,
        is_vegan INTEGER, --boolean DEFAULT false,
        ingredients TEXT,
        cooking_instructions TEXT,
        groups_suitable TEXT,
        date_created TEXT,
        status_ref_key_key VARCHAR(20),
        status_ref_key_value INTEGER,
        PRIMARY KEY (id),
        FOREIGN KEY ( status_ref_key_key, status_ref_key_value ) REFERENCES APP_REF_KEYS ( key, value )
      );`,
      [],
      this.successCB,
      this.errorCB,
    );
    this.updateProgress('CREATE TABLE RECIPE Success');

    dbtx.executeSql('DROP TABLE IF EXISTS RECIPE_IMAGE;');
    dbtx.executeSql(
      `CREATE TABLE IF NOT EXISTS RECIPE_IMAGE (
        id VARCHAR(32) NOT NULL,
        recipe_id VARCHAR(32) NOT NULL,
        image_url VARCHAR(257),
        image_file TEXT,
        PRIMARY KEY (id ),
        FOREIGN KEY ( recipe_id ) REFERENCES RECIPE ( id )
      );`,
      [],
      this.successCB,
      this.errorCB,
    );
    this.updateProgress('CREATE TABLE RECIPE_IMAGE Success');

    dbtx.executeSql('DROP TABLE IF EXISTS USER_RECIPE;');
    dbtx.executeSql(
      `CREATE TABLE IF NOT EXISTS USER_RECIPE (
        user_id VARCHAR(32) NOT NULL,
        recipe_id VARCHAR(32) NOT NULL,
        PRIMARY KEY (user_id, recipe_id),
        FOREIGN KEY ( user_id ) REFERENCES USER ( id ),
        FOREIGN KEY ( recipe_id ) REFERENCES RECIPE ( id )
      );`,
      [],
      this.successCB,
      this.errorCB,
    );
    this.updateProgress('CREATE TABLE USER_RECIPE Success');
  };

  runInitialInserts = (dbtx: any): void => {
    dbtx.executeSql(
      `INSERT INTO ${this.appDatabaseTables.APP_REF_KEYS.name} (key, label, value) 
                  VALUES ("Status", "Active", "ACT")`,
      [],
    );
    dbtx.executeSql(
      `INSERT INTO ${this.appDatabaseTables.APP_REF_KEYS.name} (key, label, value) 
                  VALUES ("Status", "Disabled", "DIS")`,
      [],
    );
    dbtx.executeSql(
      `INSERT INTO ${this.appDatabaseTables.APP_REF_KEYS.name} (key, label, value) 
                  VALUES ("Status", "Deleted", "DEL")`,
      [],
    );
  };

  addAppRefKeyStmt = (dbtx: any, data: {key: string, value: string, label: string}): void => {
    let {key, value, label} = data;
    dbtx.executeSql(
      `INSERT INTO ${this.appDatabaseTables.APP_REF_KEYS.name} (key, value, label) 
                    VALUES ("${key}", "${label}", "${value}")`,
      [],
      this.successCB,
      this.errorCB,
    );
  };

  addUserStmt = (dbtx: any, user: {
    id: string,
    name: string,
    email: string,
    username: string,
    status_ref_key_key: string,
    status_ref_key_value: string
  }): any => {
    let {
      id,
      name,
      email,
      username,
      status_ref_key_key,
      status_ref_key_value,
    } = user;
    return dbtx.executeSql(
      `INSERT INTO ${this.appDatabaseTables.USER.name} (id, name, email, username, status_ref_key_key, 
                    status_ref_key_value) VALUES ("${id}", "${name}", "${email}", "${username}", 
                    "${status_ref_key_key}", "${status_ref_key_value}")`,
      [],
      this.successCB,
      this.errorCB,
    );
  };

  addUserCredentialsStmt = (dbtx: any, data: {
    username: string,
    password_hash: string,
    salt: string
  }): void => {
    let {username, password_hash, salt} = data;
    dbtx.executeSql(
      `INSERT INTO ${this.appDatabaseTables.USER_CREDENTIALS.name} (username, password_hash, salt)
                    VALUES ("${username}", "${password_hash}", "${salt}")`,
      [],
      this.successCB,
      this.errorCB,
    );
  };

  addRecipeStmt = (dbtx: any, data: {
    id: string,
    name: string,
    is_vegetarian: boolean | number,
    is_vegan: boolean | number,
    ingredients: string,
    cooking_instructions: string,
    groups_suitable: string,
    date_created: string,
    status_ref_key_key: string,
    status_ref_key_value: string | number
  }): void => {
    let {
      id,
      name,
      is_vegetarian,
      is_vegan,
      ingredients,
      cooking_instructions,
      groups_suitable,
      date_created,
      status_ref_key_key,
      status_ref_key_value,
    } = data;
    dbtx.executeSql(
      `INSERT INTO ${this.appDatabaseTables.RECIPE.name} (id, name, is_vegetarian, is_vegan,ingredients,
                    cooking_instructions, groups_suitable, date_created, status_ref_key_key, status_ref_key_value) 
                    VALUES ("${id}", "${name}", "${is_vegetarian}", "${is_vegan}", "${ingredients}",
                            "${cooking_instructions}", "${groups_suitable}", "${date_created}", 
                            "${status_ref_key_key}", "${status_ref_key_value}")`,
      [],
      this.successCB,
      this.errorCB,
    );
  };

  addUserRecipeStmt = (dbtx: any, data: {user_id: string, recipe_id: string}): void => {
    let {user_id, recipe_id} = data;
    dbtx.executeSql(
      `INSERT INTO ${this.appDatabaseTables.USER_RECIPE.name} (user_id, recipe_id)
                    VALUES ("${user_id}", "${recipe_id}")`,
      [],
      this.successCB,
      this.errorCB,
    );
  };

  addRecipeImageStmt = (dbtx: any, data: {
    id: string,
    recipe_id: string,
    image_url: string,
    image_file: string
  }): void => {
    let {id, recipe_id, image_url, image_file} = data;
    dbtx.executeSql(
      `INSERT INTO ${this.appDatabaseTables.RECIPE_IMAGE.name} (id, recipe_id, image_url, image_file)
                    VALUES ("${id}", "${recipe_id}", "${image_url}", "${image_file}")`,
      [],
      this.successCB,
      this.errorCB,
    );
  };

  getUserByEmailStmt = async (dbtx: any, email: string): Promise<void> => {
    await dbtx.executeSql(
      `SELECT * FROM 
          ${this.appDatabaseTables.USER.name} WHERE email='${email}';`,
      [],
      (sqltx: any, results: any) => {
        this.querySuccess(sqltx, results, this.appDatabaseTables.USER.name);
      },
      this.errorCB,
    );
  };

  getUserByUsernameStmt = async (dbtx: any, username: string): Promise<void> => {
    await dbtx.executeSql(
      `SELECT * FROM 
          ${this.appDatabaseTables.USER.name} WHERE username='${username}';`,
      [],
      (sqltx: any, results: any) => {
        this.querySuccess(sqltx, results, this.appDatabaseTables.USER.name);
      },
      this.errorCB,
    );
  };

  runInitialQueriesAndLoadInitialData = async (dbtx: any): Promise<void> => {
    console.log('Executing queries...');

    await dbtx.executeSql(
      `SELECT * FROM ${this.appDatabaseTables.Version.name};`,
      [],
      (sqltx: any, results: any) => {
        this.querySuccess(sqltx, results, this.appDatabaseTables.Version.name);
      },
      this.errorCB,
    );

    await dbtx.executeSql(
      `SELECT * FROM ${this.appDatabaseTables.APP_REF_KEYS.name};`,
      [],
      (sqltx: any, results: any) => {
        this.querySuccess(
          sqltx,
          results,
          this.appDatabaseTables.APP_REF_KEYS.name,
        );
      },
      this.errorCB,
    );

    await dbtx.executeSql(
      `SELECT * FROM ${this.appDatabaseTables.USER.name};`,
      [],
      (sqltx: any, results: any) => {
        this.querySuccess(sqltx, results, this.appDatabaseTables.USER.name);
      },
      this.errorCB,
    );

    await dbtx.executeSql(
      `SELECT * FROM ${this.appDatabaseTables.USER_CREDENTIALS.name};`,
      [],
      (sqltx: any, results: any) => {
        this.querySuccess(
          sqltx,
          results,
          this.appDatabaseTables.USER_CREDENTIALS.name,
        );
      },
      this.errorCB,
    );

    await dbtx.executeSql(
      `SELECT * FROM ${this.appDatabaseTables.RECIPE.name};`,
      [],
      (sqltx: any, results: any) => {
        this.querySuccess(sqltx, results, this.appDatabaseTables.RECIPE.name);
      },
      this.errorCB,
    );

    await dbtx.executeSql(
      `SELECT * FROM ${this.appDatabaseTables.RECIPE_IMAGE.name};`,
      [],
      (sqltx: any, results: any) => {
        this.querySuccess(
          sqltx,
          results,
          this.appDatabaseTables.RECIPE_IMAGE.name,
        );
      },
      this.errorCB,
    );

    await dbtx.executeSql(
      `SELECT * FROM ${this.appDatabaseTables.USER_RECIPE.name};`,
      [],
      (sqltx: any, results: any) => {
        this.querySuccess(
          sqltx,
          results,
          this.appDatabaseTables.USER_RECIPE.name,
        );
      },
      this.errorCB,
    );
  };

  querySuccess = (dbtx: any, results: any, type: string): void => {
    console.log('querySuccess results: ', results);
    this.updateProgress('Query completed');

    if (!isNullUndefined(results)) {
      let len = results.rows.length;
      console.log('len: ', len);

      if (type === this.appDatabaseTables.USER.name) {
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          console.log('row: ', row);
          this.queryResults.push(row);
          this.usersQueryResults.push(row);
          // this.updateProgress(`QuerySuccess :: ${row.data}`);
        }
      }
      if (type === this.appDatabaseTables.USER_CREDENTIALS.name) {
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          console.log('row: ', row);
          this.queryResults.push(row);
          this.usersCredentialsQueryResults.push(row);
          // this.updateProgress(`QuerySuccess :: ${row.data}`);
        }
      }
      if (type === this.appDatabaseTables.RECIPE.name) {
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          console.log('row: ', row);
          this.queryResults.push(row);
          this.recipesQueryResults.push(row);
          // this.updateProgress(`QuerySuccess :: ${row.data}`);
        }
      }
      if (type === this.appDatabaseTables.RECIPE_IMAGE.name) {
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          console.log('row: ', row);
          this.queryResults.push(row);
          this.recipesPhotosQueryResults.push(row);
          // this.updateProgress(`QuerySuccess :: ${row.data}`);
        }
      }
      if (type === this.appDatabaseTables.USER_RECIPE.name) {
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          console.log('row: ', row);
          this.queryResults.push(row);
          this.usersRecipesQueryResults.push(row);
          // this.updateProgress(`QuerySuccess :: ${row.data}`);
        }
      }
    }

    //clear duplicates that come up from buggy sqlite
    let usersQueryResults =
      !isEmptyArray(this.usersQueryResults) &&
      this.usersQueryResults.map((item) => stringifyObject(item));
    let dataset =
      !isEmptyArray(usersQueryResults) && new Set(usersQueryResults);
    usersQueryResults = !isBoolean(dataset) && Array.from(dataset);
    usersQueryResults =
      !isEmptyArray(usersQueryResults) &&
      usersQueryResults.map((item) => JSON.parse(item));
    this.usersQueryResults = !isEmptyArray(usersQueryResults)
      ? [...usersQueryResults]
      : [];
    console.log('this.usersQueryResults', this.usersQueryResults);

    let usersCredentialsQueryResults =
      !isEmptyArray(this.usersCredentialsQueryResults) &&
      this.usersCredentialsQueryResults.map((item) => stringifyObject(item));
    dataset =
      !isEmptyArray(usersCredentialsQueryResults) &&
      new Set(usersCredentialsQueryResults);
    usersCredentialsQueryResults = !isBoolean(dataset) && Array.from(dataset);
    usersCredentialsQueryResults =
      !isEmptyArray(usersCredentialsQueryResults) &&
      usersCredentialsQueryResults.map((item) => JSON.parse(item));
    this.usersCredentialsQueryResults = !isEmptyArray(
      usersCredentialsQueryResults,
    )
      ? [...usersCredentialsQueryResults]
      : [];
    console.log(
      'this.usersCredentialsQueryResults',
      this.usersCredentialsQueryResults,
    );

    let recipesQueryResults =
      !isEmptyArray(this.recipesQueryResults) &&
      this.recipesQueryResults.map((item) => stringifyObject(item));
    dataset =
      !isEmptyArray(recipesQueryResults) && new Set(recipesQueryResults);
    recipesQueryResults = !isBoolean(dataset) && Array.from(dataset);
    recipesQueryResults =
      !isEmptyArray(recipesQueryResults) &&
      recipesQueryResults.map((item) => JSON.parse(item));
    this.recipesQueryResults = !isEmptyArray(recipesQueryResults)
      ? [...recipesQueryResults]
      : [];
    console.log('this.recipesQueryResults', this.recipesQueryResults);

    let recipesPhotosQueryResults =
      !isEmptyArray(this.recipesPhotosQueryResults) &&
      this.recipesPhotosQueryResults.map((item) => stringifyObject(item));
    dataset =
      !isEmptyArray(recipesPhotosQueryResults) &&
      new Set(recipesPhotosQueryResults);
    recipesPhotosQueryResults = !isBoolean(dataset) && Array.from(dataset);
    recipesPhotosQueryResults =
      !isEmptyArray(recipesPhotosQueryResults) &&
      recipesPhotosQueryResults.map((item) => JSON.parse(item));
    this.recipesPhotosQueryResults = !isEmptyArray(recipesPhotosQueryResults)
      ? [...recipesPhotosQueryResults]
      : [];
    console.log(
      'this.recipesPhotosQueryResults',
      this.recipesPhotosQueryResults,
    );

    let usersRecipesQueryResults =
      !isEmptyArray(this.usersRecipesQueryResults) &&
      this.usersRecipesQueryResults.map((item) => stringifyObject(item));
    dataset =
      !isEmptyArray(usersRecipesQueryResults) &&
      new Set(usersRecipesQueryResults);
    usersRecipesQueryResults = !isBoolean(dataset) && Array.from(dataset);
    usersRecipesQueryResults =
      !isEmptyArray(usersRecipesQueryResults) &&
      usersRecipesQueryResults.map((item) => JSON.parse(item));
    this.usersRecipesQueryResults = !isEmptyArray(usersRecipesQueryResults)
      ? [...usersRecipesQueryResults]
      : [];
    console.log('this.usersRecipesQueryResults', this.usersRecipesQueryResults);

    let queryResults =
      !isEmptyArray(this.queryResults) &&
      this.queryResults.map((item) => stringifyObject(item));
    dataset = !isEmptyArray(queryResults) && new Set(queryResults);
    queryResults = !isBoolean(dataset) && Array.from(dataset);
    queryResults =
      !isEmptyArray(queryResults) &&
      queryResults.map((item) => JSON.parse(item));
    this.queryResults = !isEmptyArray(queryResults) ? [...queryResults] : [];
    console.log('this.queryResults', this.queryResults);
  };

  deleteDatabase = (): void => {
    this.updateProgress('Deleting database');
    SQLite.deleteDatabase(this.appDatabase.name, this.deleteCB, this.errorCB);
  };

  //call this on exit of application
  closeDatabase = (): void => {
    if (APP_SQLITE_DATABASE.DB_REFERENCE) {
      console.log('Closing database ...');
      this.updateProgress('Closing database');
      APP_SQLITE_DATABASE.DB_REFERENCE.close(this.closeCB, this.errorCB);
    } else {
      this.updateProgress('Database was not OPENED');
    }
  };
}

export const appSQLiteDb = new AppSQLiteDb();