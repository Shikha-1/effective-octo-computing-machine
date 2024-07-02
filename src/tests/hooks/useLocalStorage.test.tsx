import { renderHook } from '@testing-library/react';
import useLocalStorage from '../../hooks/useLocalStorage';

describe('useLocalStorage hook', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	test('loads value from localStorage if present', () => {
		localStorage.setItem('testKey', JSON.stringify('storedValue'));

		const { result } = renderHook(() =>
			useLocalStorage('testKey', 'initialValue')
		);

		const [value] = result.current;

		expect(value).toBe('storedValue');
	});

	test('updates value in localStorage', () => {
		const { result } = renderHook(() =>
			useLocalStorage('testKey', 'initialValue')
		);

		const [, setValue] = result.current;
		setValue('updatedValue');

		expect(localStorage.getItem('testKey')).toBe(
			JSON.stringify('updatedValue')
		);
	});
});
