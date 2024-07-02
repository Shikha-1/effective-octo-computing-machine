import { useState, useEffect } from 'react';

type FetchResult<T> = {
	data: T | null;
	isLoading: boolean;
	error: string | null;
};

const useFetch = <T>(url: string): FetchResult<T> => {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(url, { signal });
				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}
				const result = await response.json();
				setData(result);
			} catch (error: any) {
				if (error.name !== 'AbortError') {
					console.error('Error fetching data:', error);
					setError('Failed to fetch data!');
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();

		return () => controller.abort();
	}, [url]);

	return { data, isLoading, error };
};

export default useFetch;
