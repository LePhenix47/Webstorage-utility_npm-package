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
var WebStorage = /** @class */ (function () {
    function WebStorage() {
    }
    /**
     * Stores a key-value pair in the WebStorage.
     *
     * @param {string} key - The key to be used for storing the value.
     * @param {any} value - The value to be stored.
     * @param {boolean} [inSession=false] - A flag indicating whether to store the value in the session storage or not.
     * @returns {void}
     */
    WebStorage.setKey = function (key, value, inSession) {
        if (inSession === void 0) { inSession = false; }
        var stringifiedValue = JSON.stringify(value);
        // If the user stored the pair inside the session storage
        var storage = inSession ? sessionStorage : localStorage;
        storage.setItem(key, stringifiedValue);
    };
    /**
     * Retrieves a key-value pair, if the key isn't found in the WebStorage, it returns null.
     *
     * @param {string} key - The key used for storing the value.
     * @param {boolean} [inSession=false] - A flag indicating whether to look for the value in the session storage or not.
     * @returns {any} The value retrieved from the storage, or null if the key is not found.
     */
    WebStorage.getKey = function (key, inSession) {
        if (inSession === void 0) { inSession = false; }
        // If the user stored the pair inside the session storage
        var storage = inSession ? sessionStorage : localStorage;
        var item = storage.getItem(key);
        if (!item) {
            return null;
        }
        return this.isParseable(item) ? JSON.parse(item) : item;
    };
    /**
     * Deletes a settled key-value pair in either the WebStorage.
     *
     * @param {string} key - The key used for storing the value.
     * @param {boolean} [inSession=false] - A flag indicating whether to remove the value from the session storage or not.
     * @returns {void}
     */
    WebStorage.removeKey = function (key, inSession) {
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
    WebStorage.clearAll = function (inSession) {
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
    WebStorage.currentLength = function (inSession) {
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
     */
    WebStorage.getKeyNameByIndex = function (index, inSession) {
        if (inSession === void 0) { inSession = false; }
        // If the user wants to get the key from the session storage
        var storage = inSession ? sessionStorage : localStorage;
        return storage.key(index);
    };
    /**
     * Replacer function used as a callback for the `JSON.parse` method to customize the serialization of certain types of objects,
     * specifically for the Maps and Sets
     *
     * @param key - The key of the object being serialized.
     * @param value - The value of the object being serialized.
     * @returns The serialized representation of the value object with customized serialization for Map and Set objects.
     * @see {@link https://www.youtube.com/watch?v=hubQQ3F337A Steve's video on Maps & Sets}
     */
    WebStorage.replacer = function (key, value) {
        if (value instanceof Map) {
            return { __type: "Map", value: Object.fromEntries(value) };
        }
        if (value instanceof Set) {
            return { __type: "Set", value: Array.from(value) };
        }
        return value;
    };
    /**
     * Replacer function used as a callback for the `JSON.parse` method to customize the serialization of certain types of objects,
     * specifically for the Maps and Sets
     *
     * @param key - The key of the object being serialized.
     * @param value - The value of the object being serialized.
     * @returns The serialized representation of the value object with customized serialization for Map and Set objects.
     * @see {@link https://www.youtube.com/watch?v=hubQQ3F337A Steve's video on Maps & Sets}
     */
    WebStorage.reviver = function (key, value) {
        switch (value === null || value === void 0 ? void 0 : value.__type) {
            case "Set": {
                return new Set(value === null || value === void 0 ? void 0 : value.value);
            }
            case "Map": {
                return new Map(value === null || value === void 0 ? void 0 : value.value);
            }
            default:
                return value;
        }
    };
    /**
     * Verifies whether a given JSON string can be parsed.
     *
     * @param value - The JSON string to evaluate.
     * @returns {boolean} True if parsing succeeds, otherwise False.
     */
    WebStorage.isParseable = function (value) {
        try {
            JSON.parse(value);
            return true;
        }
        catch (error) {
            return false;
        }
    };
    return WebStorage;
}());
export default WebStorage;
