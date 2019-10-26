# 05 - Lesson Five: Developer Tools, Code Quality and Unit Tests

We will add in this lessons some of the developers tools and unit tests

### Developer Tools ###

There are two important developer tools that can make your life easy:  

* [React Developer tool](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en).
* [Redux Developer tool](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

Both of these are Chrome extensions.  
After you install redux developer tool you need to modify your sotre script to hook to it.  

```js
// modify store.js to add the following
// If Redux DevTools Extension is installed use it, otherwise use compose
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false,
      })
      : compose;
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
    // other store enhancers if any
  );
  const store = createStore(
    reducers,
    enhancer
  );
```



### Lint and Code quality ###
We install Eslint, and AirBnb Eslint config which covers lots of code standards.

```sh
npm install --save-dev eslint eslint-config-airbnb@latest eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y
```
Create an .eslintrc.json file at the root of your project, just like we did for Babel, and write the following to it:

```json
{
  "extends": "airbnb"
}
```

* Install Compat
[Compat](https://github.com/amilajack/eslint-plugin-compat) is an ESLint plugin that will warn you when you use Javascript that is not compatible

```sh
npm install --save-dev eslint-plugin-compat
```
modify eslintrc
```json
// .eslintrc
{
  // ...
  "env": {
    "browser": true
  },
  "plugins": ["compat"],
  "rules": {
    // ...
    "compat/compat": "error"
  }
}
```
eslint-plugin-compat uses the browserslist configuration in package.json

See [ai/browserslist](https://github.com/ai/browserslist) for configuration.

for example to support last 2 versions of browsers, and the following in package.json
```json
// package.json
{
  // ...
  "browserslist": ["last 2 versions", "not ie <= 8"],
}
```
Add a new task in package.json to call eslint

```json
// package.json
"scripts": {
  ....
  "lint": "eslint"
```
To fix your lint errors, it is faster to install an ESLint plugin for your editor.  
Fix all errors, and let us move to next step, which is unit test.

### Install Jest for Unit test ###

```sh
npm i --save-dev jest babel-jest regenerator-runtime
```
### Flow ###
npm i --save-dev flow-bin babel-preset-flow babel-eslint eslint-plugin-flowtype

create two directories: \_\_tests\_\_, \_\mocks\_\_.  
