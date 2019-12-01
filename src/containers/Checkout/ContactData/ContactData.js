import React, { Component } from 'react';
import './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault(); //prevent the default of form reload on click of button
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Ramit Sharma',
                address: {
                    street: 'Kunti Marg',
                    zipCode: '41232',
                    country: 'India'
                },
                email: '21.r@gmail.com'
            }
        }

        axios.post("/orders.json", order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/'); 
                //history object cud hve been supllied using with router,
                // but here its being passed via props from checkout.js
                console.log("Axios Response:", response);
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log("Error:", error);
            });
    }

    render() {
        let form = (
            <form>
            <input type="text" name="name" placeholder="Your name"></input>
            <input type="email" name="email" placeholder="a@a.com"></input>
            <input type="text" name="street" placeholder="Street"></input>
            <input type="text" name="postal" placeholder="ZipCode"></input>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
        );
        if(this.state.loading){
            form = <Spinner />;
        }
        return (
            <div className="ContactData">
                <h4>Enter your contact details</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
