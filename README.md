## Reactjs poc - burger builder app

Planning a react app involves taking decisions on 3 fronts:

1. Component Tree
2. Application state
3. Components (stateless) vs containers (statefull - class components using the state property or functional components with state hooks)
-------------------

In older versions of create react app, css classes were available globally. To fix this,one had to eject the project, and change the webpack configuration. This updation helped in enabling the css modules, which can then be imported and used in specific components. With the latest version of create react app, this is not required though.

HOC: higher order components are used just to wrap the JSX of main containers, as a render method of a class component can return a single root element. (You can also wrap the JSX with a div, but HOCs are a preferred way)

{props.children} is used to refer to the contained components (See Layout.js)

Install the below package to add prop type validation (See BurgerIngredients.js)
```
npm install --save prop-types
```

UI folder has custom UI elements like modals, backdrop etc.

You can create modals which are custom styled divs, by using show attribute of JSX (see burgerbuilder.js)

In CSS, z-index is used to identify sits on top of which element. For example, Modal sits on top of Backdrop, and backdrop would sit on top of something else like side drawer. See the Backdrop.css, and Modal.css in this project.

See Button.js to see how to give multiple css to a single className

See Logo.js, as to how we import the image from its folder location and use it. This way, the webpack, when it will bundle the application, will pick the image from its location, optimize it and put it in the final destination.

Create interim database online using Firebase (using a Realtime database). You will see a url for the Realtime database, and this is the url that needs to be hit by http calls. (See axios-orders.js). In the rules tab, set read and write to true.

To make http calls, use the Axios package by installing it as below. Axios helps create instances which refer to different urls that the application can make calls to. The axios GET and POST return promises that can then be used to process asynchronoulsy (see BurgerBuilder.js). Place orders from the app, and see success response in the console logs. Also go back to firebase db as created above, and see the collection named 'orders' created with the data as stored by you. On similar lines, you can move the ingredient prices from the hardcoded values in the BurgerBuilder.js to a collection in the database, and retrieve them via http calls.

```
npm install --save axios
```

Google out css spinners, and copy the css from any of the links returned in search result for creating you own custom spinner. Create a variable in the state object of BurgerBuilder.js to toggle the spinner when making http calls. Set the flag from function making the http call, and toggle the flag back on the promise of the http call.

TODO: A flexible, generic way of handling errors, see withErrorHandler.js.

## Routing

First install react-router-dom:
```
npm install --s react-router-dom
```
Then import BrowserRouter in the index.js file to setup routing for the project. Wrapt the App inside the BrowserRouter and render this JSX structure instead of direct App.

Then implement routing in App.js using the Route module from react-router-dom

Note the props parameter of the container component loaded by the Router module. See componentDidMount() of BurgerBuilder.js. It gets extra properties like history, location and match. Note that these properties are only available to the routed component, and not the child components inside the routed component. To achieve the same, either pass the props onto child props, or use the advance method of using withRouter, an HOC provided by react-router-dom. See the burger.js on how to configure withRouter. the console.log prints spl routing properties passed on from parent burgerbuilder component.

To invoke the routes on some actions, you can do as below (see the Burgerbuilder.js -> placeOrderHandler() and Checkout.js as well) :

```
 this.props.history.push('/checkout');
 this.props.history.goBack();
 this.props.history.replace('checkout/contact-data');
```
See BurgerBuilder.js -> [This code is now commented out, as we are now using redux to manage the statw. but the commented code shows how using query params wewe can actually pass the state onto the routed component] placeOrderHandler() on how to encode and pass the query params along with routing. These values can then be recieved using 'this.props.location.search' as done in Checkout.js -> componentDidMount()

You can also nest the routes. For example, from App component, there is a route to Checkout component, and from the latter, there is a route to the contactdata component. See in Checkout.js, how therelative oath of nested route is added to this.props.match.path to create the complete path.

Also see the Checkout.js, on how to pass props to the component when using routing.

NavLink is used to remove the need of marking the active link by code. (See NavigationItem.js). No need to give the below which would have been required if we were using the <a href=''> tag:

```
className={props.active ? "active" : null}
```

## Redux

Redux is a 3rd party library used to mantain state as a central store. 

Q. When to use Redux, when to use Component's State?

Ans. You may share the state of a component to its child components by passing it via props. But you can't share state between components of different hierarchy. That's where Redux comes to rescue. Ideally, component specific state should be used for UI specific properties only, for eg. mantaining a loading variable for showing the spinner; or a variable to hold the value of text input field. For most of the cases, Redux should be put to use for state management. Also when using routing, you could pass the data via query params, but the cleaner way is to use redux.

Steps to setup Redux in react app:

1. To use redux with react application, need to install following two packages:

```
npm install --save redux
npm install --save react-redux   //used to connect React app with redux
```
2. The Redux-devtools installed earlier also allows us to see the state in the debug mode. Add the devtools extension to the browser if not done previously, and then setup the devtools as given in index.js file of the project. For more infromation, see the link below. Take the devtool setup from 1.2 and add it to your store creation in the index.js

```
https://github.com/zalmoxisus/redux-devtools-extension

```

3. Create a reducer (/store/reducers/burgerBuilder.js) that will have functions that are triggered on dispatch actions to manipulate the state. See how we distribute the objects at each level (using ...) to maintain the immutability of the old state by creating a new state at each level of the objects. Doing it at each level is necessary as ...state does not create a deep clone of the object, but a shallow copy at the outermost level object only.

4. Import the Provider, createStore and reducer, and then setup the redux store in the index.js

5. You can have multiple reducers for different states and functions, eg. the store/recucers/*.js has 2 reducers in this project. You can combine the reducers using 'combineReducer' function as in index.js. When combining reducers, you need to tell your components to point to the correct redux state slice (see BurgerBuilder.js and Checkout.js containers -> mapStateToProps -> state.REDUCERKEY.variable):

6. Connect the react app with Redux store. See BurgerBuilder.js. import connect, which is used to connect to redux store. It takes 2 parameters, first maps to the state variables, and the second to state handlers. The keys given in these methods are used to access reducer's state or handlers in the react app via this.pros.key 

7. Action Creators: You can dispatch to reducers directly from the components, or you may call action creators in the reducers (see BurgerBuilder.js). These action creators work really well with async code like calling an api and updating the redux store, but these also work with sync code as well.

8. Middlewares are helper methods that are invoked when a dispatch method invokes a reducer. If configured, a middleware gets invoked before the reducer and can be used to influence the reducer invocation. For eg., a middleware can be setup for logging every time the reducer is being invoked. See index.js where applyMiddleware is imported and the middlewares are applied.

9. Redux-thunk is a library which adds a middleware to your project, so that action creators do not return the action directly, but instead returns a function which will eventually dispatch an action. This eventual dispatch part can be the async code. 

To setup redux-thunk, install it as below, then add it to index.js. This will activate thunk for your application.

```
npm install --save redux-thunk
https://github.com/reduxjs/redux-thunk
```

10. See store/actions/index.js -> as to how group different exports in a single file, and then import the latter in the components (see BurgerBuilder.js)

11.




