import { renderHook, waitFor } from '@testing-library/react';
import useFetch from '../../hooks/useFetch';

describe('useFetch hook', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('fetches data successfully', async () => {
		const mockData = { id: 1, name: 'Test Data' };
		jest.spyOn(global, 'fetch').mockResolvedValueOnce({
			ok: true,
			json: async () => mockData
		} as Response);

		const { result } = renderHook(() =>
			useFetch<{ id: number; name: string }>('http://example.com/data')
		);

		expect(result.current.isLoading).toBe(true);
		expect(result.current.data).toBe(null);
		expect(result.current.error).toBe(null);
		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});
		await waitFor(() => {
			expect(result.current.error).toBe(null);
		});
		await waitFor(() => {
			expect(result.current.data).toEqual(mockData);
		});
	});

	test('handles fetch error', async () => {
		jest
			.spyOn(global, 'fetch')
			.mockRejectedValueOnce(new Error('Failed to fetch'));

		const { result } = renderHook(() => useFetch('http://example.com/data'));

		expect(result.current.isLoading).toBe(true);
		expect(result.current.data).toBe(null);
		expect(result.current.error).toBe(null);

		await new Promise((resolve) => setTimeout(resolve, 0));

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});
		await waitFor(() => {
			expect(result.current.data).toBe(null);
		});
		await waitFor(() => {
			expect(result.current.error).toBe('Failed to fetch data!');
		});
	});

	test('handles aborting fetch', async () => {
		const mockData = { id: 1, name: 'Test Data' };
		const mockFetch = jest.fn().mockResolvedValueOnce({
			ok: true,
			json: async () => mockData
		} as Response);

		jest.spyOn(global, 'fetch').mockImplementationOnce(mockFetch);

		const { result, unmount } = renderHook(() =>
			useFetch('http://example.com/data')
		);

		unmount();

		await waitFor(() => {
			expect(result.current.isLoading).toBe(true);
		});
		await waitFor(() => {
			expect(result.current.data).toBe(null);
		});
		await waitFor(() => {
			expect(result.current.error).toBe(null);
		});
	});
});
