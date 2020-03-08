import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter  from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('Test <NavigationItems />' , () => {
    it('should render two <NavigationItems /> elements', () => {
        //Shallow will pick immediate DOM children (NavigationItem here),
        // and not the children of children from the entire DOM.
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
});
