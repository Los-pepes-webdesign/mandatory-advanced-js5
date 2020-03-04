import React from 'react';
import { formatSize, formatMaxSpace } from './helpers';

describe('formatSize', () => {
	it('should return a number', () => {
		const acutal = formatSize('YEBOI');
		const expected = '';

		expect(acutal).toBe(expected);
	});

	it('should return the value formatted to 2 decimals and with a suffix (bytes, KB, MB, GB, TB)', () => {
		const actual1 = formatSize(1024);
		const expected1 = '1.02 KB';
		expect(actual1).toBe(expected1);

		const actual2 = formatSize(1024000);
		const expected2 = '1.02 MB';
		expect(actual2).toBe(expected2);

		const actual3 = formatSize(1024000000);
		const expected3 = '1.02 GB';
		expect(actual3).toBe(expected3);
	});
});

describe('formatMaxSpace', () => {
	it('should return a integer', () => {
		const actual1 = formatMaxSpace(1024000000);
		const expected1 = '1 GB';
		expect(actual1).toBe(expected1);

		const actual2 = formatMaxSpace(2048000000000);
		const expected2 = '2 TB';
		expect(actual2).toBe(expected2);
	});
});
