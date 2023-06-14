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
var WebStorageService = /** @class */ (function () {
    function WebStorageService() {
    }
    /**
     * Stores a key-value pair in the WebStorage.
     *
     * @param {string} key - The key to be used for storing the value.
     * @param {any} value - The value to be stored.
     * @param {boolean} [inSession=false] - A flag indicating whether to store the value in the session storage or not.
     * @returns {void}
     */
    WebStorageService.setKey = function (key, value, inSession) {
        if (inSession === void 0) { inSession = false; }
        var strinfigiedValue = JSON.stringify(value);
        // If the user stored the pair inside the session storage
        var storage = inSession ? sessionStorage : localStorage;
        storage.setItem(key, strinfigiedValue);
    };
    /**
     * Retrieves a key-value pair, if the key isn't found in the WebStorage, it returns null.
     *
     * @param {string} key - The key used for storing the value.
     * @param {boolean} [inSession=false] - A flag indicating whether to look for the value in the session storage or not.
     * @returns {any} The value retrieved from the storage, or null if the key is not found.
     */
    WebStorageService.getKey = function (key, inSession) {
        if (inSession === void 0) { inSession = false; }
        // If the user stored the pair inside the session storage
        var storage = inSession ? sessionStorage : localStorage;
        var item = storage.getItem(key);
        if (item) {
            return JSON.parse(item);
        }
        return null;
    };
    /**
     * Deletes a settled key-value pair in either the WebStorage.
     *
     * @param {string} key - The key used for storing the value.
     * @param {boolean} [inSession=false] - A flag indicating whether to remove the value from the session storage or not.
     * @returns {void}
     */
    WebStorageService.removeKey = function (key, inSession) {
        if (inSession === void 0) { inSession = false; }
        // If the user stored the pair inside the session storage
        var storage = inSession ? sessionStorage : localStorage;
        storage.removeItem(key);
    };
    /**
     * Clears the entire web storage.
     *
     * @param {boolean} [inSession=false] - A flag indicating whether to clear the session storage or not.
     * @returns {void}
     */
    WebStorageService.clearAll = function (inSession) {
        if (inSession === void 0) { inSession = false; }
        // If the user wants to clear the session storage
        if (inSession) {
            sessionStorage.clear();
        }
        else {
            localStorage.clear();
        }
    };
    /**
     * Gets the current number of key-value pairs stored in the web storage.
     *
     * @param {boolean} [inSession=false] - A flag indicating whether to get the number of key-value pairs stored in the session storage or not.
     * @returns {number} The number of key-value pairs stored in the storage.
     */
    WebStorageService.currentLength = function (inSession) {
        if (inSession === void 0) { inSession = false; }
        // If the user wants to get the length of the session storage
        var storage = inSession ? sessionStorage : localStorage;
        return storage.length;
    };
    /**
     * Gets the key at the specified index of the web storage.
     *
     * @param {number} index - The index of the key to retrieve.
     * @param {boolean} [inSession=false] - A flag indicating whether to get the key from the session storage or not.
     * @returns {(string | null)} The key at the
     * */
    WebStorageService.getKeyByIndex = function (index, inSession) {
        if (inSession === void 0) { inSession = false; }
        // If the user wants to get the key from the session storage
        var storage = inSession ? sessionStorage : localStorage;
        return storage.key(index);
    };
    return WebStorageService;
}());
export { WebStorageService };
