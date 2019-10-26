# 03 - Lesson Three: Bulma, basic login page

We will continue on this project and add a CSS framework and a basic login page.


## CSS Frameworks ##

We are going to use a [css reset](https://blog.gisspan.com/2015/11/useful-css-tips-tip-1-css-reset.html) framework, and a general UI framework called [Bulma](https://bulma.io/).

#### Sanitize.css ####
sanitize.css is a css library that provides a [css reset](https://blog.gisspan.com/2015/11/useful-css-tips-tip-1-css-reset.html) for cross-browser styling.  
There are many CSS reset frameworks, for example we can list the following:

* [Normalize.css](https://necolas.github.io/normalize.css/).
* [Bootstrap's Reboot](https://v4-alpha.getbootstrap.com/content/reboot/).
* [Sanitize.css](https://csstools.github.io/sanitize.css/).
* Or we can just embed manually the [CSS Reset code](https://meyerweb.com/eric/tools/css/reset/).

Sanitize is the Normalize + *box-sizing: border-box*

#### Bulma ####
[Bulma](https://bulma.io/) is a simple light css framework, and the most important it doesn't have any JavaScript dependencies.  

P.S: there is another branch in this repository that shows you how to add bootstrap 4. Please refer [to this branch](https://github.com/gkarwchan/progressive-web-app-from-scratch/tree/bootstrap) for a bootstrap version.


## Installing Bulma and sanitize.css ##

```sh
npm install bulma sanitize.css
```

## CSS in the build process ##
Webpack can process any file, using the proper loader, and even we can have one entry point for our whole application, by referencing CSS from inside JavaScript.  
Let me take three minutes from your time to tell you about blending JavaScript and CSS.

#### CSS inside JavaScript ####
In old days, we used to separate CSS from JavaScript from Html.  But Nowadays, with Component-based architecture, it is easier to blend them together.  
And this is why React has "*Html*" or Jsx inside the JavaScript.  
The same with CSS, where we can just reference the CSS file from inside the JavaScript file, and we have encapsulating the component with all its assets.

#### introducing css-loader ####

css-loader interprets any @import and import of css files from inside JavaScript and resolve them.  
css-loader will be the first step which collect the css. To package them, we need another loader.  
style-loader is another loader that will put the css in &lt;style> tag in the index.html file.

Add a new rule to webpack file as follows:

```javascript
// webpack.config.babel.js
 rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: {
            sourceMap: true,
            modules: true
          } }
        ]
      }
    ],
```
import the above loaders required by webpack

```sh
npm i --save-dev style-loader css-loader
```

The above webpack, will use css-loader's modules feature to provide local naming for local css.  
But at the same time, we need the Bulma library and its classed to be global and not local.  
In order to make Bulma classes defined globally, we have to exclude Bulma from webpack.  


```javascript
// webpack.config.babel.js
 rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { 
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: {
            sourceMap: true,
            modules: true
          } }
        ],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
        include: [/node_modules/]
      }
    ],
```

<br />

Let us add this line to index.js file
  
```javascript
// in index.js file
import 'sanitize.css/sanitize.css';
import 'bulma/css/bulma.min.css';
```

Let us modify the file **src/client/login.jsx**


```javascript
// login.jsx

import React from 'react';

const Login = () => (
  <div className="container">
    <div className="control has-icons-left has-icons-right has-addons">
      <input id="username" name="username"
        placeholder="Enter your email"
        type="text"
        className="input"
      />
    </div>
    <div className="control has-icons-left has-icons-right has-addons">
      <input id="password" name="password"
        placeholder="Enter your password"
        type="password"
        className="input"
      />
    </div>
    <div className="field is-grouped">
      <div className="control">
        <button className="button is-link" type="submit">Submit</button>
      </div>
      <div className="control">
        <button className="button is-text">Cancel</button>
      </div>
    </div>
  </div>
);

export default Login;

```




```javascript
// app.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './home';
import Login from './login';


const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
);
export default App;
```

Add a directory called `src/css` and add a file called `main.global.css`, and add the following code:


in the file index.jsx, append this line after last line with import `App` module.


```javascript
// index.jsx
import App from './app';
import './css/main.global.css';
```

If you run the build now, and run the application, you will see the main page with a nice navigation bar from Bootstrap with a link to login page.
```sh
npm run build
npm start
```
Let us modify the `login.jsx` page to be more a simple login page, with two input text: username , and password, with a button called `login`, and when we press the button we do something with the username and password.

```javascript

import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: ''};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log(this.state);
    // do something with username and password
  }

  render() {
    return (
      <div className="container">
        <form>
          <div className="field">
            <label htmlFor="email" className="label">Email address</label>
            <div class="control">
              <input type="email" className="input" id="email" aria-describedby="emailHelp" placeholder="Enter email" 
                onChange={(event) => this.setState({username: event.target.value})}/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
          </div>
          <div className="field">
            <label htmlFor="password" className="label">Password</label>
            <div class="control">
              <input type="password" className="input" id="password" placeholder="Password" 
                onChange={(event) => this.setState({password: event.target.value})}/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" id="checkout" />
                Check me out
              </label>
            </div>
          </div>
          <button type="button" className="button is-primary"
            onClick={(event) => this.handleClick(event)}>Login</button>
        </form>
      </div>      
    );
  }
}
export default Login;
```
The above form will now display the username and password entered into the input text boxes.  

<br />
<br />

Navigate to the login page, and you will see a beautiful login page.  
Try to enter username, and password, and press the login button, and see the result in the console.  
