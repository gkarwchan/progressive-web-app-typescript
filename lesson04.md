# 04 - Lesson Four: Redux and Redux-Saga

We will continue on this project and refactor the old login logic into more elegent code using Redux, and Redux-Saga

### Introducing Redux ###

Before we begin with Saga, we should notice that Saga using generator, which is not supported yet with all browser.  
So, we need to add a polyfill to our browser code.  
To do this, we will add `babel-polyfill` which we installed on lesson 1, but we didn't use yet.  
Let us add in webpack.config the babel-polyfill as another entry point:  

```javascript
// webpack.config.babel.js
entry: [
    'babel-polyfill',
    './src/client',
  ],
```
Now let us add redux and redux-saga

```sh
npm install redux redux-saga react-redux
```

We can integrate redux to our ract-router, so our navigation will be populated, and can be controlled from the redux.  
So we will add a library to do that:  

```sh
npm install connected-react-router
```


Let us start by adding react-redux, and react-router-redux.  
Create a folder called `client/redux`, and create two files: reducers.js, and store.js

```javascript
// reducers.js
// this will be the root of all reducers
// this will initialize the reducers with router reducer
import { combineReducers } from 'redux';
// connected-react-router provides a reducer
import { connectRouter } from 'connected-react-router';

export default (history) => combineReducers({
  router: connectRouter(history),
});
```

To create a store, we use **createStore** function, which has the follwoing syntax:

```javascript
createStore(reducer, [preloadedState], [enhancer])
```

Where:  

* reducer, is a function that will reduce the state.  
* [preloadedState] is an optional paramter for the inital state.
* [enhancer] for third-party middleware to tap into state, and chaging state.

```javascript
// store.js
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, push } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(history, initialState = {}) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware:  for intercepting and dispatching navigation actions
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [applyMiddleware(...middlewares)]; 
  
  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(...enhancers)
  );


  // Extensions
  store.runSaga = sagaMiddleware.run;

  return store;
}

```
In the `app.jsx` file append a provider for react-router, and add react-router-redux as follows:

```javascript
// app.jsx
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history' // history is a module that is a dependency of react-router-dom
import { ConnectedRouter } from 'connected-react-router';

import configureStore from './redux/store';

...
...

render() {
    const history = createBrowserHistory()
    const store = configureStore(history, {})
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
```

------------------------------------------------------


Now, if you open your browser console, and by navigating between the two pages, you can see redux-logger, is logging every time you navigate between the pages.  
  

Let us now add redux-form

```javascript
// append this to reducers.js
import { reducer as form } from 'redux-form';

export default combineReducers({
  router,
  form
});
```
Login.jsx as for now, it is complicated, because it has UI, and the logic for authentication.  
We are going to split it up, and will do the same for every other component from now on.  
We will use a well-known pattern in React community called [Functional Stateless component](https://reactjs.org/docs/components-and-props.html), and we put the logic of login in [container component](https://medium.com/@learnreact/container-components-c0e67432e005).  

Let us create two folders, `components`, and `containers`, and create a folder called Login, in each.  
Then create `login.jsx` in src/client/components/Login.  

```javascript
// client/components/Login/login.jsx
import React from 'react';
import { Field, reduxForm } from 'redux-form';

let Login = (props) => {
  const { onLogin } = props;
    return (
    <div className="container">
      <form onSubmit={e => e.preventDefault(); onLogin();}>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <Field type="email" className="form-control" id="email" name="email" component="input" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We will never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Field type="password" className="form-control" id="password" name="password" placeholder="Password" component="input"/>
        </div>
        <button type="Submit" className="btn btn-primary">Login</button>
      </form>
    </div>);
};

export default reduxForm({ form: 'login', })(Login);
```

and in the containers/Login, create a file called `index.jsx`

```javascript
// client/containers/Login/index.js
import React from 'react';
import { connect } from 'react-redux';
import LoginView from '../../components/Login';
import { loginRequest } from './actions';

const mapDispatchToProps = dispatch => (
  {
    onLogin: (username, password) => {
      dispatch(loginRequest({username, password}));
    }
  }
);
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
```
In the previous lesson, we had the ajax call to our simulator service inside the `login.jsx` file itself.  
Let us now clean it and take it outisde to its own place. Create a folder `src/client/api/` and add file `index.js`.  

```javascript
// client/api/index.js
import axios from 'axios';

let authorize = (credentials) => {
  axios.get('http://localhost:3004/users', {params: credentials})
  .then((response) => {
    if (response.data && response.data.length > 0)
      return Promise.resolve(true);
    else
      return Promise.resolve(false);
  });
}

export default {
  authorize
};
```

Let us add the sagas:  
Add a file : `client/redux/sagas.js`

```javascript
// client/redux/sagas.js

import { take, call, put, fork, race } from 'redux-saga/effects';
import Api from '../api';
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_REJECTED } from './constants';
import { push } from 'react-router-redux'

export function* authorize({ username, password }) {
  try {
    const response = yield call(Api.authorize, { username, password });
    return response;
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error });
  }
}

export function* loginFlow() {
  while (true) {
    const request = yield take(LOGIN_REQUEST);
    const { username, password } = request.load;
    const result = yield call(authorize, request.load);
    if (result) {
      yield put({ type: LOGIN_SUCCESS });
      yield put(push('/profile'));
    }
    else {
      yield put({ type: LOGIN_REJECTED });
      yield put(push('/signup'));
    }
  }
}

export default function* root() {
  yield fork(loginFlow);
}

```
As you can see above we wrote our business logic, and the login flow in the saga.