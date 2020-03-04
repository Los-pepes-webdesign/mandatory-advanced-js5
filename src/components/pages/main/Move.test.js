import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon-chai';
import Move from './Move';

describe('Testing Move-component', () => {
	it('should run the function on click', () => {
		const onDone = sinon.spy();
		const wrapper = shallow(<Move onDone={onDone} />);
		//const closeBox = wrapper.find(closeBox());

		wrapper.find('.move__buttonCancel').simulate('click');

		expect(onDone.toHaveBeenCalledTimes(1));
	});
});
