import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
                : {props.ingredients[igKey]}
            </li>;
        })
    return (
        <Aux>
            <h3>Your order</h3>
            <p>Delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: </strong> {props.totalPrice.toFixed(2)} </p>
            <p>Continue with checkout?</p>
            <Button btnType = 'Danger' clicked={props.cancel}>CANCEL</Button>
            <Button btnType = 'Success' clicked={props.continue}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary;

