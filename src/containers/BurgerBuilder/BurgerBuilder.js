import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import { connect } from 'react-redux';
import * as burgerBuilderActionTypes from '../../store/actions/index';


class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    loading: false
  }

  componentDidMount () {
    console.log(this.props);
    //THIS is a good place to make GET http call to fetch ingridents from backend
  }

  //This function is used to determine when to enable the Order Now button
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el; //note that el is a number here
      }, 0);
    return sum > 0 ;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  placeOrderHandler = () => {
    //This is the code used to pass ingredients to routed component using query params
    //No longer needed as we are now using redux.
    /*
     const queryParams = [];
     for(let i in this.state.ingredients) {
       queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
     }
     queryParams.push('price=' + this.props.price);
     const queryString = queryParams.join('&');
      this.props.history.push({
        pathname: '/checkout',
        search: '?' + queryString
      });
      */
     //simply move to the route, redux will provide the state
     this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings //reading ingredients from redux mapped property below
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = <OrderSummary
      totalPrice={this.props.price}
      ingredients={this.props.ings}
      cancel={this.purchaseCancelHandler}
      continue={this.placeOrderHandler} />;

    if(this.state.loading){
      orderSummary = <Spinner />;
    }
      
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.props.ings} />
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          price={this.props.price}
          purchasable={this.updatePurchaseState(this.props.ings)}
          ordered={this.purchaseHandler} />
      </Aux>
    );
  }
}

// Map slices of the state from Redux store that are required in this component
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice
  };
}

const mapDispatchToProps = dispatch => {
  return {
    //you can dispatch to reducers directly with arguments as below, but we will instead invoke action functions of reducers
    /*
    onIngredientAdded: (ingName) => dispatch({type: burgerBuilderActionTypes.ADD_INGREDIENTS, ingredientName : ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: burgerBuilderActionTypes.REMOVE_INGREDIENTS, ingredientName : ingName})
    */
   onIngredientAdded: (ingName) => dispatch(burgerBuilderActionTypes.addIngredient(ingName)),
   onIngredientRemoved: (ingName) => dispatch(burgerBuilderActionTypes.removeIngredient(ingName))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
