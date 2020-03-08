import reducer from './burgerBuilder';
import * as actionTypes from '../actions/actionTypes';

describe('burgerBuilder reducer' , () => {

    
    it('should return the initial state', () => {
       expect(reducer(undefined, {})).toEqual({
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4
        });
    })

    it('ADD Ingredtient action returns updated state', () => {
        expect(reducer({
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4
        }, {
            type:actionTypes.ADD_INGREDIENTS,
            ingredientName: 'salad'
        })).toEqual({
             ingredients: {
                 salad: 1,
                 bacon: 0,
                 cheese: 0,
                 meat: 0
             },
             totalPrice: 4.5
         });
     })
});
