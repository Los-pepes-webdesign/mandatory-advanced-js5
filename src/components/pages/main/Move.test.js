import React from 'react';
import { shallow } from 'enzyme';
// import sinon from 'sinon-chai';
import { dropbox } from '../../../utilities/dropbox';
import sinon from 'sinon';
import Move from './Move';

describe('Testing Move-component', () => {
	it('should run the function on click', () => {
		const onDone = sinon.spy();

		const wrapper = shallow(
			<Move onDone={onDone} fileMove={{ path_lower: 'foo' }} />
		);

		expect(onDone.called).toBe(false);

		wrapper.find('.move__buttonCancel').simulate('click');

		expect(onDone.called).toBe(true);
	});

	it('should execute move', () => {
		const filesMoveV2Stub = sinon.stub(dropbox, 'filesMoveV2').resolves(10);

		const wrapper = shallow(
			<Move onDone={() => {}} fileMove={{ path_lower: '/foo' }} />
		);

		expect(filesMoveV2Stub.called).toBe(false);

		wrapper.find('.move__input').simulate('change', {
			target: {
				value: 'jesper'
			}
		});

		wrapper.find('.move__buttonOk').simulate('click');

		expect(filesMoveV2Stub.lastCall.args).toStrictEqual([
			{ from_path: '/foo', to_path: '/jesper/foo' }
		]);
	});
});
