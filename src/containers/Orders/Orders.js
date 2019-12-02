import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import { connect } from 'react-redux';
import * as orderActionTypes from '../../store/actions/index';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        this.props.onFetchOrders();
        //Below code has been moved to redux store
        /*
        axios.get('./orders.json')
            .then(res=>{
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push(
                        {...res.data[key],
                        id : key})
                }
                this.setState({orders:fetchedOrders, loading:false});
            })
            .catch(err => {
                this.setState({loading:false});
            });
        */
    }

    render(){
        let orders = <Spinner />;
        if(!this.props.loading){
            orders = this.props.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                )
            );
        }
        return (
            <div>
              {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      orders: state.order.orders,
      loading: state.order.loading
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
         onFetchOrders: () => dispatch(orderActionTypes.fetchOrders())
     };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Orders);
