import React, { Component, Suspense } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

import { Route, Switch } from 'react-router-dom';

const Orders = React.lazy(() => import('./containers/Orders/Orders'));

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route 
                path="/orders" 
                render={()=> (
                    <Suspense fallback={<div>Loading Orders...</div>}>
                      <Orders/>
                    </Suspense>
              )}/>
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
