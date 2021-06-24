[![Actions Status](https://github.com/Codibre/record-map/workflows/build/badge.svg)](https://github.com/Codibre/record-map/actions)
[![Actions Status](https://github.com/Codibre/record-map/workflows/test/badge.svg)](https://github.com/Codibre/record-map/actions)
[![Actions Status](https://github.com/Codibre/record-map/workflows/lint/badge.svg)](https://github.com/Codibre/record-map/actions)
[![Test Coverage](https://api.codeclimate.com/v1/badges/65e41e3018643f28168e/test_coverage)](https://codeclimate.com/github/Codibre/record-map/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/65e41e3018643f28168e/maintainability)](https://codeclimate.com/github/Codibre/record-map/maintainability)
[![Packages](https://david-dm.org/Codibre/record-map.svg)](https://david-dm.org/Codibre/record-map)
[![npm version](https://badge.fury.io/js/%40codibre%2Frecord-map.svg)](https://badge.fury.io/js/%40codibre%2Frecord-map)

Returns a Map implementation over a plain object! This is useful if you have a project that can receive a Map or a Record, but you want to access it's properties seamless

## How to Install

```
npm i record-map
```

# How to use it

Just pass the Record/plain object or Map to **recordMap**:

```ts
const result = recordMap(myMapOrPlainObject);
```

result will be an instance of Map!

# But why not just use new Map(Object.entries(plainObject))?

The following command also converts a plain object do Map:
```ts
const result = new Map(Object.entries(plainObject))
```

But the advantage of **recordMap** is that no overload with a loop through plainObject properties is made. Making this conversion much more efficient!

## License

Licensed under [MIT](https://en.wikipedia.org/wiki/MIT_License).
