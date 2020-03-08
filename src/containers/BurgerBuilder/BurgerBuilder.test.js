import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter  from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder'; //fetch named export from container
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('Test <BurgerBuilder />' , () => {

    let wrapper;
    
    beforeEach(() => {
        const ingsVal = {salad: 0};
        wrapper = shallow(<BurgerBuilder ings={ingsVal} />);
    });

    it('should render 1 <BurgerControls /> element', () => {
       expect(wrapper.find(BurgerControls)).toHaveLength(1);
    })
});
