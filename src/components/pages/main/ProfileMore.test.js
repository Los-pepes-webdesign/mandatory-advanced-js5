import React from 'react';
import { shallow } from 'enzyme';
import ProfileMore from './ProfileMore';

describe('testing ProfileMore', () => {
	it('Should Redirect to login', () => {
		const wrapper = shallow(<ProfileMore />);
		const logoutButton = wrapper.find('profile__more__logoutButton');
		logoutButton.simulate('click');
	});
});
