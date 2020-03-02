import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('testing Header', () => {
	it('input text should be in state', () => {
		const wrapper = shallow(<Header />);
		wrapper.find('.header__form__input').simulate('change', {
			target: {
				value: 'jesper'
			}
		});
		const inputText = wrapper.find('.header__form__input').props().value;
		expect(inputText).toBe('jesper');
		const filterState = wrapper.find('filterSearch');
		expect(filterState.state()).toBe('jesper');
	});
});
