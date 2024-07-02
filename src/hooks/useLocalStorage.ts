import { useCallback, useState } from 'react';

type UseLocalStorageResult<T> = [T | null, (value: T) => void];

const useLocalStorage = <T>(
	key: string,
	initialValue: T
): UseLocalStorageResult<T> => {
	const storedValue = localStorage.getItem(key);
	const [value, setValue] = useState<T>(
		storedValue ? JSON.parse(storedValue) : initialValue
	);
	const updateValue = useCallback(
		(newValue: T) => {
			setValue(newValue);
			localStorage.setItem(key, JSON.stringify(newValue));
		},
		[key]
	);

	return [value, updateValue];
};

export default useLocalStorage;
