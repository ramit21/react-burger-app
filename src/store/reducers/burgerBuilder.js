import * as actionTypes from '../actions/actionTypes';

const INGRIDENT_PRICES = { //Global constants given in caps
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
  }

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    //[] on the left of : says that the name of the property is actually the value of the variable inside []
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGRIDENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                //Immutable Update Pattern
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGRIDENT_PRICES[action.ingredientName]
            };
        default:
            return state;
    }
}

export default reducer;
