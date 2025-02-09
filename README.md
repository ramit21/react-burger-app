## Reactjs poc - burger builder app

This POC is for creating a Burger builder app using different features of Reactjs including Redux.

Steps to Launch the POC:

1. Create interim database online using Firebase (using a Realtime database). You will see a url for the Realtime database, and this is the url that needs to be hit by the http calls. (Configure it in axios-orders.js). In the rules tab, set read and write to true. Screenshot of db added in resources folder for reference.

2. Launch the poc using 'npm start'.


## Some features used in this POC

**Create-react-app**: Run below commands to install create-react-app module from github to local machine, and then use it to scaffold react-applications.

```
npm install create-react-app -g
create-react-app <my-react-app-name> --scripts-version 1.1.5
```

**JSX**: Reactjs components return JSX which is syntactical sugar on top of HTML, ie javascript that looks like HTML. Since it is not plain HTML, some of the HTML constructs cannot be used directly. eg. use className instead of class. You can also give conditional statements using single curly braces:

```
return (
    <div/>
    {
        this.state.showData?
                 <div>
                    <Data val1= val2= />
                 </div> : null
    }
    
)

```

You can actually have all the conditions inside render method and use the assigned variable inside the return JSX:

```
render(){
    const data = this.state.showData?
                 (<div>
                    <Data val1= val2= />
                 </div> ): null;
    return(
        <div/>
        {data}
    )
}
```

**V-dom:** render() method (as in Class components) is just a suggestion to re-render the DOM, it doesn't directly re-render it. Reatjs uses virtual dom. It keeps 2 copies of the DOM: actual, and re-rendered DOM. And then it evaluates the difference between the two. Only if there are differences, then only the actual DOM is re-rendered from the v-dom.


**Class vs Functional component and state management:**

If state or props change, react re-evaulates if it needs to re-render the dom that used these state/props values.

Class component (Below) also provide lifecycle hooks (refer screenshot in resources  folder)

```
import {Component} from 'react';
class App extends Component {
    state = {
        key1: val1,
        key2: val2
    }

    this.setState({key1:newVal}) //to update the class state

    render() {
        return (
            <JSX />
        )
    }
}
```

Functional Compnent:

```
import {useState} from 'react';

const app = props => {

    const [state, setState ] = useState({
        initial state object
    })

    //access state via state, and update via setState as defined in above destructuring.

    return(
        <JSX />
    )
}

```

-> Important difference: this.setState of components extending Compnent merges the updated fields with new values as specified in the function call, whereas setState of functional-components hooks doesnt merge anything, it simply replaces the entire state. 

You can maintain multiple states when using useState hook.

**Stateless vs Stateful Components**:

Statefull or smart components manage state (either via component class or via state hooks), whereas stateless or dumb components do not have any state, and just render JSX based on props passed onto them by parent components. This segregation helps you to build applications in a better way. 

**HOC**: higher order components are used just to wrap the JSX of main containers, as a render method of a class component can return a single root element. (You can also wrap the JSX with a div, or return array of elements with unique keys, but HOCs are the preferred way)

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

**Axios**

To make http calls, use the Axios package by installing it as below. Axios helps create instances which refer to different urls that the application can make calls to. The axios GET and POST return promises that can then be used to process asynchronoulsy (see BurgerBuilder.js). Place orders from the app, and see success response in the console logs. Also go back to firebase db as created above, and see the collection named 'orders' created with the data as stored by you. On similar lines, you can move the ingredient prices from the hardcoded values in the BurgerBuilder.js to a collection in the database, and retrieve them via http calls.

```
npm install --save axios
```
------------------
Google out css spinners, and copy the css from any of the links returned in search result for creating you own custom spinner. Create a variable in the state object of BurgerBuilder.js (or in the Redux store) to toggle the spinner when making http calls. Set the flag from function making the http call, and toggle the flag back on the promise of the http call.

TODO: A flexible, generic way of handling errors, see withErrorHandler.js.

**Routing**

Routing in SPA is to be able to show different links even though its a single page (index.html) that is rendered on the browser. Different parts are rendered on index.html based on the router path. This is what client side rendering is all about.

There is no routing when using server side rendering. For the latter, use next.js, that uses folder structure to represent the url and uses internal router to render the html output (index.js in case of React) and returns it to the browser.

First install react-router-dom:

```
npm install --s react-router-dom
```
Then import BrowserRouter in the index.js file to setup routing for the project. Wrap the App inside the BrowserRouter and render this JSX structure instead of direct App.

Then implement routing in App.js using the Route module from react-router-dom.

Note the props parameter of the container component loaded by the Router module. (See componentDidMount() of BurgerBuilder.js). It gets extra properties like history, location and match. Note that these properties are only available to the routed component, and not the child components inside the routed component. To achieve the same, either pass the props onto child props, or use the advance method of using withRouter, an HOC provided by react-router-dom. See the burger.js on how to configure withRouter. the console.log prints special routing properties passed on from parent burgerbuilder component.

Routes can be loaded lazily with the use of Suspense component provided by react 16.6 onwards. See App.js, how we lazily load the orders component. If you open the Network tab and click on Orders, you will see chunk.js file getting loaded, ie the code for Orders component being loaded lazily.

To invoke the routes on some actions frm code, you can do as below (see the Burgerbuilder.js -> placeOrderHandler() and Checkout.js as well) :

```
 this.props.history.push('/checkout');
 this.props.history.goBack();
 this.props.history.replace('checkout/contact-data');
```
See BurgerBuilder.js -> [This code is now commented out, as we are now using redux to manage the state, but the commented code shows how using query params we can actually pass the state onto the routed component] placeOrderHandler() on how to encode and pass the query params along with routing. These values can then be recieved using 'this.props.location.search' as done in Checkout.js -> componentDidMount()

You can also nest the routes. For example, from App component, there is a route to Checkout component, and from the latter, there is a route to the contactdata component. See in Checkout.js, how the relative path of nested route is added to this.props.match.path to create the complete path.

Also see the Checkout.js, on how to pass props to the component when using routing.

NavLink is used to remove the need of marking the active link by code. (See NavigationItem.js). No need to give the below which would have been required if we were using the < a href=''> tag:

```
className={props.active ? "active" : null}
```

**Redux**

Redux is a 3rd party library used to mantain state as a central store. 

Q. When to use Redux, when to use Component's State?

Ans. You may share the state of a component to its child components by passing it via props. But you can't share state between components of different hierarchy in the component tree. That's where Redux comes to rescue. Ideally, component specific state should be used for UI specific properties only, for eg. mantaining a loading variable for showing the spinner; or a variable to hold the value of text input field. For most of the cases, Redux should be put to use for state management. Also when using routing, you could pass the data via query params, but the cleaner way is to use redux.

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

9. Redux-thunk is a library which adds a middleware to your project, so that action creators do not return the action directly, but instead returns a function which will eventually dispatch an action. This eventual dispatch part can be the async code. An alternative to thunk is Redux Saga (future read).

To setup redux-thunk, install it as below, then add it to index.js. This will activate thunk for your application.

```
npm install --save redux-thunk
https://github.com/reduxjs/redux-thunk
```

10. See store/actions/index.js -> as to how group different exports in a single file, and then import the latter in the components (see BurgerBuilder.js/ Orders.js)

11. Note that a screen refresh clears the redux store, so for persisting data like JWT tokens, use localStorage.

## Testing

Jest is a unit testing framework and Enzyme is Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components’ output. Enzyme helps to render components in isolation to the complete app so that components can be unit tested.

1. Install below dependencies for unit testing:

```
npm install -s jest
npm install -s enzyme react-test-renderer enzyme-adapter-react-16
```

2. run '**npm run test**' to execute the unit tests.

Test case examples in this project:
1. Dumb/Functional components: NavigationItem.test.js
2. Container components: BurgerBuilder.test.js -> Issue with containers is that they are connected with Redux. So to bypass redux, in addition to the default export at the end of the file, we also add an export in the class itself (See BurgerBuilder.js). Then this class can be directly referenced in the test case and tested just like functional components as above.
3. Redux: store/reducer/burgerBuilder.test.js

## Basic theory
Planning a react app involves taking decisions on 3 fronts:

1. Component Tree
2. Application state
3. Components (stateless) vs containers (statefull - class components using the state property or functional components with state hooks)

Components are basically pieces of your application which when combined together form your browser view.

**SPA:**

Single page application has only one HTML page where the content is rendered on the client. Where as on multi-page application, we have multiple HTML pages and content is rendered on the server.

**Webpack:** Webpack is a bundler that also optimizes and transforms code. You can also create your own optimization/transformation rules. See resources folder for the webpack workflow.

Run 'npm run build' to build the project into optimised production deployable module. This command creates a build folder, and we have to deploy the contents of this folder ont our build server.

**Radium:** Use Radium to use media queries with CSS in JSX.

**CSS Eject:**

In older versions of create react app, css classes were available globally. To fix this,one had to eject the project, and change the webpack configuration. This updation helped in enabling the css modules, which can then be imported and used in specific components. With the latest version of create react app, this is not required though.

```
npm run eject
```

Note: this is a one-way operation. Once you eject, you can’t go back!

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Reactjs vs Angularjs

Reactjs -> FB; Angular -> Google.

Both are good for creating SPAs. Both promote the injection of HTML code inside Javascript, rather than the old way of injecting Javascript inside HTML.

Reactjs is a library, while Angularjs is a framework. Being a framework, latter comes with some in built features like Routing, http, modules - lazy loading etc. for which you have to add 3rd party libraries when using those features with Redux.

Being a framework, Angular comes with additional in-built features like CLI, Dependency injection, Transpiling (.ts to .js), 2-way data binding, etc.

While Angular is more powerful from features perspective, and good to use for heavy web applications, Redux wins the race for prompt UI rendering due to presence of Virtual DOM.

Angular has strong type checking due to typscript usage. React doesn't have any such built in support for type checking.

Angular supports bi-directional bindings, while react supports only uni-directional.

Reactjs supports server side rendering, whereas Angular supports client side rendering. ie, Angular server just returns the data, and let the browser do the work of rendering the data on the HTML. Reactjs on the hand use SRR, but not the traditional way, where every request from the UI required server to render a new HTML response. React pulls the server rendered page on the initial load, and therafter lets routing and ajax take care of any data that is futher required. 

Refer below for more:

https://www.rishabhsoft.com/blog/reactjs-vs-angularjs

## Misc

React concepts covered in 10 mins: https://www.youtube.com/watch?v=s2skans2dP4

**React props drilling**: When you keep passing the props from parent to multiple levels of child components, the intermediate layers need to pass over the props without ever using them. This makes it harder to debug or understand the code. The solution is to use central state like Redux.

(imp) **Component lifecycle**:
1. Initialise: Component is constructed with given state and default props.
2. Mounting: When component is added to DOM. the render method is called.
3. Updating: When we update something and the component needs to update.
4. Unmounting: When component is removed from DOM.

With class components, we have 3 main hooks to handle these lifecycle events:
componentDidMount(), componentDidUpdate(), componentWillUnmount()

With functional components, we have 1 hook method that takes care of all 3 phases (2-4):
useEffect(()=>{ }, [Dependencies])

The dependency is optional and decides when the component will be updated again after rendering.

Another hook that functional components support is useState() for setting and updating state.

--

Q. How do browsers read JSX?

Ans. In general, browsers are not capable of reading JSX and only can read pure JavaScript. The web browsers read JSX with the help of a transpiler. Transpilers are used to convert JSX into JavaScript. The transpiler used is called Babel.

Q. How are events handled in React?

Ans. React provides event handlers like onChange, onclick etc. that can be added to a JSX element to handle events.

Q.  What is a key in React?

A “key” is a special string attribute you need to include when creating lists of elements in React. Keys are used in React to identify which items in the list are changed, updated, or deleted. In other words, we can say that keys are used to give an identity to the elements in the lists.

Q. What is conditional rendering in React?

Ans. Selectively rendering components based on specified conditions. eg.
```
{isLoggedIn == false ? <DisplayLoggedOut /> : <DisplayLoggedIn />}
```

Q. What is React Fragments?

Ans. Instead of returning extraneous <div> to enclose jsx from component render/return, react provides React fragment as a cleaner solution.
```
<React.Fragment>  
    <h2>Child-1</h2>   
    <p> Child-2</p>   
</React.Fragment> 
```

Q. What is context API? 

Ans. React.createContext(). Used to pass global variables anywhere in the code. Another way to share state between components. Producer sends updates to context, and consumers read from it.

Q. Write a program to create a counter with increment and decrement?

Ans. 
```
import React, { useState } from "react";

const App = () => {


    const [counter, setCounter] = useState(0)

    const handleClick1 = () => {


        setCounter(counter + 1)
    }

    const handleClick2 = () => {

        setCounter(counter - 1)
    }

    return (
        <div>
            <div>
                {counter}
            </div>
            <div className="buttons">
                <button onClick={handleClick1}>
                    Increment
                </button>
                <button onClick={handleClick2}>
                    Decrement
                </button>
            </div>
        </div>
    )
}

export default App

```

Q. What is React-Material UI?

A. React Material UI is an open-source React component library, offering prebuilt components for creating React applications. Developed by Google in 2014, it’s compatible with JavaScript frameworks like Angular.js and Vue.js. Renowned for its quality designs and easy customization, it’s favored by developers for rapid development.

Q. What is flux architecture in redux?

A. Flux architecture in Redux is a design pattern used for managing application state in a unidirectional data flow. In this architecture, actions are dispatched to modify the store, which holds the entire application state. The store sends the updated state to the view (UI), and the cycle repeats when new actions are triggered. Redux follows this structure to ensure a predictable and maintainable state management system for large applications.

