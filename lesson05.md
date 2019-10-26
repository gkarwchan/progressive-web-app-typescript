# 05 - Lesson Five: Developer Tools, Code Quality and Unit Tests

We will add in this lessons some of the developers tools and unit tests

### Developer Tools ###

There are two important developer tools that can make your life easy:  

* [React Developer tool](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en).
* [Redux Developer tool](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

Both of these are Chrome extensions.  
After you install redux developer tool you need to modify your sotre script to hook to it.  
You can get a reference to redux dev tools as a global variable like this: **window.__REDUX_DEVTOOLS_EXTENSION__**.  
Redux developer tool can be hooked into redux store as enhancer, so it can be added in the following general code:  

```js
createStore(reducer, [preloadedState], [enhancers])

// can replace enhancers with this:  

createStore(reducer, [preloadedState], 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
)
```
But Because we are using already enhancers, so this is how we combine all enhancers:  

```js
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(...enhancers)
```

Later in this lesson we are going to talk about eslint.  
Eslint prevent using underscore in variable name, so to bypass the above code do the following.

```js
import { createStore, applyMiddleware, compose } from 'redux';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(...enhancers)
```

As well, let us strict the usage of redux dev tools in production only, so we will add the following:  

```js
// modify store.js to add the following
// If Redux DevTools Extension is installed use it, otherwise use compose
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
    // other store enhancers if any
  );
  
```
You can as well pass extension options as follows:

```js
// modify store.js to add the following
// If Redux DevTools Extension is installed use it, otherwise use compose
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // specify extension options like name, actionBlackList, actionCreators, serialize...
        name: 'MyReduxStore'
      })
      : compose;
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
    // other store enhancers if any
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
