import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
 
    
  // Below function not required now as we are using Redux for sentral state data store
  // Below method could be used when we were passing data from query params to this routed component
  // form BurgerBuilder.js
  /*
   state = {
        ingredients: null,
        price: 0
    }
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            if(param[0] === 'price') {
                price = param[1];
            }else{
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients:ingredients, totalPrice:price});
    }
    */

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}
                />
                <Route 
                    path={this.props.match.path+'/contact-data'} 
                    render={(props)=> 
                        (<ContactData //Can read these in contact data from redux only
                            ingredients={this.props.ings}
                            price={this.props.price}
                            {...props}
                        />)} 
                    />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      ings: state.ingredients,
      price: state.totalPrice
    };
  }
  
export default connect(mapStateToProps)(Checkout);
