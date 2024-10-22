// index.js

/**
 * Escapes double quotes in a string value.
 * @param {string} value - The string to escape.
 * @returns {string} - The escaped string.
 */
function escapeQuotes(value) {
    return value.replace(/"/g, '\\"');
  }
  
  /**
   * Retrieves a nested property from an object using a dot-notation path.
   * @param {Object} obj - The JSON object.
   * @param {string} path - The dot-notation path (e.g., "address.street").
   * @returns {*} - The value at the specified path or undefined if not found.
   */
  function getNestedProperty(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
  
  /**
   * Sets a nested property in an object using a dot-notation path.
   * Automatically treats the value as a string.
   * @param {Object} obj - The JSON object.
   * @param {string} path - The dot-notation path.
   * @param {string} value - The string value to set.
   */
  function setNestedProperty(obj, path, value) {
    const parts = path.split('.');
    const last = parts.pop();
    const target = parts.reduce((acc, part) => {
      if (!acc[part] || typeof acc[part] !== 'object') acc[part] = {};
      return acc[part];
    }, obj);
    target[last] = escapeQuotes(value);
  }
  
  /**
   * Deletes a nested property from an object using a dot-notation path.
   * @param {Object} obj - The JSON object.
   * @param {string} path - The dot-notation path.
   */
  function deleteNestedProperty(obj, path) {
    const parts = path.split('.');
    const last = parts.pop();
    const target = parts.reduce((acc, part) => acc && acc[part], obj);
    if (target && target.hasOwnProperty(last)) {
      delete target[last];
    }
  }
  
  /**
   * Renames a key in a JSON object while preserving its position.
   * All values are treated as strings.
   * @param {Object} obj - The JSON object.
   * @param {string} path - The dot-notation path to the key (e.g., "address.street").
   * @param {string} newKey - The new key name.
   * @returns {boolean} - Returns true if the key was renamed successfully, else false.
   */
  function renameKey(obj, path, newKey) {
    const parts = path.split('.');
    const oldKey = parts.pop();
    const parentPath = parts.join('.');
    const parent = parentPath ? getNestedProperty(obj, parentPath) : obj;
  
    if (parent && parent.hasOwnProperty(oldKey)) {
      const entries = Object.entries(parent);
      const newEntries = [];
      let renamed = false;
  
      for (let [key, value] of entries) {
        if (key === oldKey) {
          newEntries.push([newKey, value]);
          renamed = true;
        } else {
          newEntries.push([key, value]);
        }
      }
  
      if (renamed) {
        // Reconstruct the parent object with the new key in the same position
        if (parentPath) {
          // Non-root object
          const newObj = {};
          newEntries.forEach(([key, value]) => {
            newObj[key] = value;
          });
          setNestedProperty(obj, parentPath, newObj);
        } else {
          // Root object
          // Clear existing keys
          Object.keys(parent).forEach(key => delete parent[key]);
          // Re-insert keys in order
          newEntries.forEach(([key, value]) => {
            parent[key] = value;
          });
        }
        return true;
      }
    }
    return false;
  }
  
  /**
   * Updates the value of an existing key in a JSON object.
   * All values are treated as strings.
   * @param {Object} obj - The JSON object.
   * @param {string} path - The dot-notation path to the key (e.g., "age").
   * @param {string} newValue - The new string value to set.
   * @returns {boolean} - Returns true if the value was updated successfully, else false.
   */
  function updateValue(obj, path, newValue) {
    const target = getNestedProperty(obj, path);
    if (target !== undefined) {
      setNestedProperty(obj, path, newValue);
      return true;
    }
    return false;
  }
  
  /**
   * Adds a new key-value pair to a JSON object.
   * All values are treated as strings.
   * @param {Object} obj - The JSON object.
   * @param {string} path - The dot-notation path where the key should be added (e.g., "address").
   * @param {string} key - The new key name.
   * @param {string} value - The string value to set for the new key.
   * @returns {boolean} - Returns true if the key-value pair was added successfully, else false.
   */
  function addKeyValue(obj, path, key, value) {
    const target = path ? getNestedProperty(obj, path) : obj;
    if (target && typeof target === 'object' && !Array.isArray(target)) {
      if (!target.hasOwnProperty(key)) {
        target[key] = escapeQuotes(value);
        return true;
      } else {
        console.error(`Key "${key}" already exists at path "${path}".`);
        return false;
      }
    }
    console.error(`Path "${path}" is not an object.`);
    return false;
  }
  
  /**
   * Deletes a key from a JSON object.
   * @param {Object} obj - The JSON object.
   * @param {string} path - The dot-notation path to the key (e.g., "address.city").
   * @returns {boolean} - Returns true if the key was deleted successfully, else false.
   */
  function deleteKey(obj, path) {
    const exists = getNestedProperty(obj, path) !== undefined;
    if (exists) {
      deleteNestedProperty(obj, path);
      return true;
    }
    console.error(`Path "${path}" does not exist.`);
    return false;
  }
  
  // Exporting the functions for use as an npm package
  module.exports = {
    escapeQuotes,
    getNestedProperty,
    setNestedProperty,
    deleteNestedProperty,
    renameKey,
    updateValue,
    addKeyValue,
    deleteKey,
  };
  