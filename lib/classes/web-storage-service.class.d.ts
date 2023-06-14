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
export declare class WebStorageService {
    /**
     * Stores a key-value pair in the WebStorage.
     *
     * @param {string} key - The key to be used for storing the value.
     * @param {any} value - The value to be stored.
     * @param {boolean} [inSession=false] - A flag indicating whether to store the value in the session storage or not.
     * @returns {void}
     */
    static setKey(key: string, value: any, inSession?: boolean): void;
    /**
     * Retrieves a key-value pair, if the key isn't found in the WebStorage, it returns null.
     *
     * @param {string} key - The key used for storing the value.
     * @param {boolean} [inSession=false] - A flag indicating whether to look for the value in the session storage or not.
     * @returns {any} The value retrieved from the storage, or null if the key is not found.
     */
    static getKey(key: string, inSession?: boolean): any;
    /**
     * Deletes a settled key-value pair in either the WebStorage.
     *
     * @param {string} key - The key used for storing the value.
     * @param {boolean} [inSession=false] - A flag indicating whether to remove the value from the session storage or not.
     * @returns {void}
     */
    static removeKey(key: string, inSession?: boolean): void;
    /**
     * Clears the entire web storage.
     *
     * @param {boolean} [inSession=false] - A flag indicating whether to clear the session storage or not.
     * @returns {void}
     */
    static clearAll(inSession?: boolean): void;
    /**
     * Gets the current number of key-value pairs stored in the web storage.
     *
     * @param {boolean} [inSession=false] - A flag indicating whether to get the number of key-value pairs stored in the session storage or not.
     * @returns {number} The number of key-value pairs stored in the storage.
     */
    static currentLength(inSession?: boolean): number;
    /**
     * Gets the key at the specified index of the web storage.
     *
     * @param {number} index - The index of the key to retrieve.
     * @param {boolean} [inSession=false] - A flag indicating whether to get the key from the session storage or not.
     * @returns {(string | null)} The key at the
     * */
    static getKeyByIndex(index: number, inSession?: boolean): string | null;
}
