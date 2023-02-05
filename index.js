/**
 * Utility class service to manage the web storage including:
 *
 * - `localStorage`
 * - `sessionStorage`
 *
 * And without the need to stringify or parse
 *
 * If you wish to have an utility class for cookies, you can download the package [here](https://www.npmjs.com/package/@lephenix47/cookies-utility)
 *
 * ex:
 * ```js
 * const obj = {
 *  value: 1,
 *  description: "one"
 * }
 *
 * WebStorageService.setItem(obj) //Sets a stringified value without loosing their type
 *
 * let otherObj = WebStorageService.getItem("obj") //Retrieves the parsed object
 *
 * ```
 *
 */
class WebStorageService {
  constructor() {}

  /**
   * Stores a **stringified** key-value pair in the WebStorage
   *
   * @param key name of the item you want to store
   * @param value value of the key you want to store **(automically stringified)**
   * @param inSession boolean to choose whether to store the pair in the `localStorage` or in the `sessionStorage`
   * @returns void
   *
   *
   * ex:
   * ```js
   * const arrayOfNumbers = [1,2,3,4,5];
   *
   * WebStorageService.setItem(arrayOfNumbers); //Doesn't loose its type!
   * ```
   */
  static setItem(key, value, inSession = false) {
    const strinfigiedValue = JSON.stringify(value);

    if (inSession) {
      return sessionStorage.setItem(key, strinfigiedValue);
    }
    return localStorage.setItem(key, strinfigiedValue);
  }

  /**
   * Retrieves a **parsed** key-value pair, if the key isn't found in the WebStorage, it returns null
   *
   * @param key name of the item you want to retrieve
   * @param inSession boolean to seek the pair in the `localStorage` or in the `sessionStorage`
   * @returns Item **(automactically parsed)**
   *
   *
   * ex:
   * ```js
   * let newArrayOfNumbers = WebStorageService.getItem("arrayOfNumbers"); //Parsed by default
   * ```
   */
  static getItem(key, inSession = false) {
    let parsedItem = JSON.parse(localStorage.getItem(key));

    if (inSession) {
      parsedItem = JSON.parse(sessionStorage.getItem(key));
    }

    return parsedItem;
  }

  /**
   * Deletes a settled key-value pair in the WebStorage
   *
   * @param key
   * @param inSession
   * @returns
   * ex:
   * ```js
   * WebStorageService.removeItem("arrayOfNumbers");
   * ```
   */
  static removeItem(key, inSession = false) {
    if (inSession) {
      return sessionStorage.removeItem(key);
    }
    return localStorage.removeItem(key);
  }
}

module.exports = WebStorageService;
