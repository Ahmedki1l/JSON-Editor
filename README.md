# JSON Editor Functions

A set of utility functions to programmatically edit JSON objects, including renaming keys, updating values, adding new key-value pairs, and deleting keys.

## Features

- **Rename Keys**: Change the name of existing keys while preserving their order (using the dot way: address.city insteadt of address["city"]).
- **Update Values**: Modify the value associated with a key. All values are treated as strings.
- **Add Key-Value Pairs**: Introduce new keys and assign string values.
- **Delete Keys**: Remove existing keys from the JSON object.

## Installation

Install the package via npm:

```bash
npm install json-editor-functions
```

## Usage

Import the functions into your project using CommonJS or ES6 modules.

### CommonJS

```javascript
const {
  getNestedProperty,
  setNestedProperty,
  deleteNestedProperty,
  renameKey,
  updateValue,
  addKeyValue,
  deleteKey,
} = require('json-editor-functions');

// Sample JSON object
const jsonObject = {
  name: "John Doe",
  age: "30",
  address: {
    street: "123 Main St",
    city: "Anytown",
    country: "USA",
  },
  hobbies: ["Reading", "Gaming", "Hiking"],
};

// Example: Rename a key
renameKey(jsonObject, 'address.street', 'streetAddress');

// Example: Update a value
updateValue(jsonObject, 'age', '31');

// Example: Add a new key-value pair
addKeyValue(jsonObject, 'address', 'zipcode', '12345');

// Example: Delete a key
deleteKey(jsonObject, 'hobbies');

console.log(JSON.stringify(jsonObject, null, 2));
```

### ES6 Modules

```javascript
import {
  getNestedProperty,
  setNestedProperty,
  deleteNestedProperty,
  renameKey,
  updateValue,
  addKeyValue,
  deleteKey,
} from 'json-editor-functions';

// Similar usage as shown in the CommonJS example
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

For any questions or suggestions, please contact [sinsintro@gmail.com](mailto:sinsintro@gmail.com).