/**
 * Service class to manage the web storage including:
 *
 * - `localStorage`
 * - `sessionStorage`
 *
 * **WITHOUT** the need to stringify or parse
 *
 * @class
 * @static
 * @public
 */
class WebStorage {
  /**
   * Stores a key-value pair in the WebStorage.
   *
   * @param {string} key - The key to be used for storing the value.
   * @param {any} value - The value to be stored.
   * @param {boolean} [inSession=false] - A flag indicating whether to store the value in the session storage or not.
   * @returns {void}
   */
  static setKey(key: string, value: any, inSession: boolean = false): void {
    const stringifiedValue: string = JSON.stringify(value);

    // If the user stored the pair inside the session storage
    const storage: Storage = inSession ? sessionStorage : localStorage;
    storage.setItem(key, stringifiedValue);
  }

  /**
   * Retrieves a key-value pair, if the key isn't found in the WebStorage, it returns null.
   *
   * @param {string} key - The key used for storing the value.
   * @param {boolean} [inSession=false] - A flag indicating whether to look for the value in the session storage or not.
   * @returns {any} The value retrieved from the storage, or null if the key is not found.
   */
  static getKey<T>(key: string, inSession: boolean = false): T {
    // If the user stored the pair inside the session storage
    const storage: Storage = inSession ? sessionStorage : localStorage;
    const item: string = storage.getItem(key);

    if (!item) {
      return null;
    }

    return this.isParseable(item) ? (JSON.parse(item) as T) : (item as T);
  }

  /**
   * Deletes a settled key-value pair in either the WebStorage.
   *
   * @param {string} key - The key used for storing the value.
   * @param {boolean} [inSession=false] - A flag indicating whether to remove the value from the session storage or not.
   * @returns {void}
   */
  static removeKey(key: string, inSession: boolean = false): void {
    // If the user stored the pair inside the session storage
    const storage: Storage = inSession ? sessionStorage : localStorage;
    storage.removeItem(key);
  }

  /**
   * Clears the entire web storage.
   *
   * @param {boolean} [inSession=false] - A flag indicating whether to clear the session storage or not.
   * @returns {void}
   */
  static clearAll(inSession: boolean = false): void {
    // If the user wants to clear the session storage
    if (inSession) {
      sessionStorage.clear();
    } else {
      localStorage.clear();
    }
  }

  /**
   * Gets the current number of key-value pairs stored in the web storage.
   *
   * @param {boolean} [inSession=false] - A flag indicating whether to get the number of key-value pairs stored in the session storage or not.
   * @returns {number} The number of key-value pairs stored in the storage.
   */

  static currentLength(inSession: boolean = false): number {
    // If the user wants to get the length of the session storage
    const storage: Storage = inSession ? sessionStorage : localStorage;
    return storage.length;
  }

  /**
   * Gets the key at the specified index of the web storage.
   *
   * @param {number} index - The index of the key to retrieve.
   * @param {boolean} [inSession=false] - A flag indicating whether to get the key from the session storage or not.
   * @returns {(string | null)} The key at the
   */
  static getKeyNameByIndex(
    index: number,
    inSession: boolean = false
  ): string | null {
    // If the user wants to get the key from the session storage
    const storage: Storage = inSession ? sessionStorage : localStorage;
    return storage.key(index);
  }

  /**
   * Replacer function used as a callback for the `JSON.parse` method to customize the serialization of certain types of objects,
   * specifically for the Maps and Sets
   *
   * @param key - The key of the object being serialized.
   * @param value - The value of the object being serialized.
   * @returns The serialized representation of the value object with customized serialization for Map and Set objects.
   * @see {@link https://www.youtube.com/watch?v=hubQQ3F337A Steve's video on Maps & Sets}
   */
  static replacer(key: string, value: any): any {
    if (value instanceof Map) {
      return { __type: "Map", value: Object.fromEntries(value) };
    }
    if (value instanceof Set) {
      return { __type: "Set", value: Array.from(value) };
    }
    return value;
  }

  /**
   * Replacer function used as a callback for the `JSON.parse` method to customize the serialization of certain types of objects,
   * specifically for the Maps and Sets
   *
   * @param key - The key of the object being serialized.
   * @param value - The value of the object being serialized.
   * @returns The serialized representation of the value object with customized serialization for Map and Set objects.
   * @see {@link https://www.youtube.com/watch?v=hubQQ3F337A Steve's video on Maps & Sets}
   */
  static reviver(key: string, value: any): any {
    switch (value?.__type) {
      case "Set": {
        return new Set(value?.value);
      }
      case "Map": {
        return new Map(value?.value);
      }

      default:
        return value;
    }
  }

  /**
   * Verifies whether a given JSON string can be parsed.
   *
   * @param value - The JSON string to evaluate.
   * @returns {boolean} True if parsing succeeds, otherwise False.
   */
  private static isParseable(value: any): boolean {
    try {
      JSON.parse(value);

      return true;
    } catch (error) {
      return false;
    }
  }
}

export default WebStorage;
