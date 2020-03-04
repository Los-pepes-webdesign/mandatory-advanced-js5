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
	});
	it('should run redirect on focus', () => {
		const wrapper = shallow(<Header />);
		wrapper.find('.header__form__input').simulate('focus');

		const redirect = wrapper.find('Redirect');
		expect(redirect.props()).toStrictEqual({ to: '/search' });
	});

	it('should redirect back on blur', () => {
		const wrapper = shallow(<Header />);
		wrapper.find('.header__closeButton').simulate('click');
		const redirect = wrapper.find('Redirect');

		expect(redirect.props()).toStrictEqual({ to: '/' });
	});
});
