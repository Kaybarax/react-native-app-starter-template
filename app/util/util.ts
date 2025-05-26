/* eslint-disable prettier/prettier */
//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

/**
 * sd _ Kaybarax
 * @param obj
 * @returns {string}
 */
export function stringifyObject(obj: any): string {
    return JSON.stringify(obj);
}

/**
 * sd _ Kaybarax
 * @param obj
 * @returns {null}
 */
export function deepCloneObject<T>(obj: T): T | null {
    try {
        return {...obj};
    } catch (err) {
        console.log('operation error');
        return null;
    }
}

/**
 * sd _ Kaybarax
 * @param value
 * @returns {boolean}
 */
export function isEmptyString(value: any): boolean {
    try {
        if (typeof value !== 'string') {
            return true;
        }
        return value.trim() === '';
    } catch (err) {
        return true;
    }
}

/**
 * sd _ Kaybarax
 * @param value
 * @returns {boolean}
 */
export function isNumberType(value: any): boolean {
    try {
        return !isNaN(parseInt(value));
    } catch (err) {
        return false;
    }
}

/**
 * sd _ Kaybarax
 * @param item
 * @returns {boolean}
 */
export function isNullUndefined(item: any): boolean {
    try {
        return item === null || item === undefined;
    } catch (err) {
        return true;
    }
}

/**
 * sd _ Kaybarax
 * @param item
 * @returns {boolean}
 */
export function isStringDatatype(item: any): boolean {
    try {
        if (typeof item === 'string') {
            return true;
        }
    } catch (err) {
        return false;
    }
    return false;
}

/**
 * sd _ Kaybarax
 * @param item
 * @returns {boolean}
 */
export function isArrayDatatype(item: any): boolean {
    try {
        if (Array.isArray(item)) {
            return true;
        }
    } catch (err) {
        return false;
    }
    return false;
}

/**
 * sd _ Kaybarax
 * @param item
 * @returns {boolean}
 */
export function isObject(item: any): boolean {
    try {
        return item !== null && item !== undefined && typeof item === 'object';
    } catch (err) {
        return false;
    }
}

/**
 * sd _ Kaybarax
 * @param obj
 * @param key
 */
export function objectKeyExists(obj: any, key: string): boolean {
    try {
        return obj.hasOwnProperty(key);
    } catch (err) {
        return false;
    }
}

/**
 * sd _ Kaybarax
 * @param item
 */
export function isBoolean(item: any): boolean {
    try {
        return typeof item === 'boolean';
    } catch (err) {
        return false;
    }
}

/**
 * sd _ Kaybarax
 * @param array
 * @returns {boolean}
 */
export function isEmptyArray(array: any): boolean {
    try {
        if (isNullUndefined(array)) {
            return true;
        } else {
            return !(array instanceof Array && array.length > 0);
        }
    } catch (err) {
        return true;
    }
}

/**
 * sd _ Kaybarax
 * @param obj
 * @returns {*[]|any}
 */
export function objectInstanceProvider<T>(obj: T): T {
    if (isArrayDatatype(obj)) {
        return [...(obj as any)] as unknown as T;
    }
    return deepCloneObject(obj) as T;
}

/**
 * sd _ Kaybarax
 * @param item
 * @returns {*|boolean|boolean}
 */
export function isFalse(item: any): boolean {
    return isBoolean(item) && !item;
}

/**
 * sd _ Kaybarax
 * @param item
 * @returns {*|boolean|boolean}
 */
export function isTrue(item: any): boolean {
    return isBoolean(item) && item;
}

/**
 * sd _ Kaybarax
 * @param objA
 * @param objB
 * @returns {boolean}
 */
export function objectAHasSameKeysAsObjectB(objA: Record<string, any>, objB: Record<string, any>): boolean {

    let allKeysMatch = true;
    let objA_keys = Object.keys(objA);
    let objB_keys = Object.keys(objB);

    if (objA_keys.length !== objB_keys.length) {
        return false;
    }

    for (let key in objA) {
        let keyInObjAExistsInObjB = true;
        if (!objectKeyExists(objB, key)) {
            keyInObjAExistsInObjB = false;
        }

        if (!keyInObjAExistsInObjB) {
            allKeysMatch = false;
            break;
        }
    }

    return allKeysMatch;
}

/**
 * sd _ Kaybarax
 * @param obj
 * @returns {boolean}
 */
export function isEmptyObject(obj: Record<string, any>): boolean {
    try {
        return isEmptyArray(Object.keys(obj));
    } catch (e) {
        return true;
    }
}

/**
 * sd _ Kaybarax
 * @param item
 * @returns {*}
 * NOTE: This is just my declaration of a void item. You can have yours that is totally different from mine
 */
export function isVoid(item: any): boolean {
    try {
        if (isNaN(parseInt(item))) {
            return (isNullUndefined(item) ||
                isEmptyArray(item) ||
                isEmptyString(item) ||
                isFalse(item));
        }
        return false;
    } catch (e) {
        return true;
    }
}

/**
 * sd _ Kaybarax
 * @param length
 */
export function makeId(length: number): string {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


/**
 * sd _ Kaybarax
 * @param dateTime
 * @returns {Date}
 */
export function utcToLocalDateTimeConverter(dateTime: string | Date): Date {

    //enforce that is datetime object
    let utcDateTime = new Date('' + dateTime);

    let localDateTime = new Date(utcDateTime.getTime() + utcDateTime.getTimezoneOffset() * 60 * 1000);

    let offset = utcDateTime.getTimezoneOffset() / 60;
    let hours = utcDateTime.getHours();

    localDateTime.setHours(hours - offset);

    return localDateTime;
}

/**
 * sd _ Kaybarax
 * @param dateTime
 * @returns {string}
 */
export function localeTimeStringFormatFromDatetime(dateTime: string | Date): string {
    return utcToLocalDateTimeConverter(dateTime).toString().substring(16, 21);
}

/**
 * sd _ Kaybarax
 * @param dateTime
 * @param localeTimeFormat
 * @returns {string}
 */
export function localeDateStringFormatFromDatetime(dateTime: string | Date, localeTimeFormat: string = 'en-GB'): string {
    let dateTimeObj = new Date(dateTime);//enforce that is datetime object
    // console.log(' ## localeDateStringFormat dateTimeObj ## ', dateTimeObj);//log
    let localeDateString;
    localeDateString = dateTimeObj.toLocaleDateString();
    //for US Time format orientation
    if (localeTimeFormat === 'en-US') {
        localeDateString = localeDateString.split('/').join('-');
        localeDateString = localeDateString.split('-');
        localeDateString = localeDateString[1] + '-' + localeDateString[0] + '-' + localeDateString[2];
    }
    // console.log(' ## localeDateStringFormat ## ', localeDateString);//log
    return localeDateString;
}

/**
 * sd _ Kaybarax
 * @param dateTime
 * @returns {string}
 */
export function localeTimeStringFormat(dateTime: string | Date): string {
    let dateTimeObj = new Date('' + dateTime);//enforce that is datetime object
    // console.log(' ## localeTimeStringFormat dateTimeObj ## ', dateTimeObj);//log
    let localeTimeString = dateTimeObj.toLocaleTimeString();
    // console.log(' ## localeTimeStringFormat ## ', localeTimeString);//log
    return localeTimeString;
}

/**
 * sd
 * @param numbersArray
 * @returns {number}
 * by Kaybarax
 */
export function numberItem(numbersArray: number[]): number {
    let num = 1;
    if (numbersArray.length > 0) {
        num = (numbersArray[numbersArray.length - 1] + 1);
    }
    numbersArray.push(num);
    return num;
}