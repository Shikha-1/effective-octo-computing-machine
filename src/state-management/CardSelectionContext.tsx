import {
	FC,
	ReactNode,
	createContext,
	useCallback,
	useMemo,
	useState
} from 'react';
import { CardSelectionContextType, Data, State } from '../types/misc';
import { formatTimeRange } from '../utils/dateTime';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';

const API_URL = 'https://run.mocky.io/v3/22614b15-532c-44ea-afcc-1d9cd3d212f2';

const initialState: State = {
	nonSelectedData: [],
	selectedData: []
};

const initialContextValue = {
	state: initialState,
	handleSelect: () => null,
	handleDeselect: () => null,
	isLoading: false,
	error: null
};

export const CardSelectionContext =
	createContext<CardSelectionContextType>(initialContextValue);

export const CardSelectionProvider: FC<{ children: ReactNode }> = ({
	children
}) => {
	const { data: eventData, isLoading, error } = useFetch<Data[]>(API_URL);

	const [state, setState] = useState<State>(initialState);

	const [storedState, setStoredState] = useLocalStorage<State>(
		'cardSelectionState',
		initialState
	);

	useMemo(() => {
		if (!storedState || storedState.nonSelectedData.length === 0) {
			if (eventData) {
				const formattedData = eventData.map((event) => ({
					...event,
					formattedTimeRange: formatTimeRange(event.start_time, event.end_time)
				}));
				const updatedState = {
					...state,
					nonSelectedData: formattedData.filter(
						(data) =>
							!state.selectedData.some((selected) => selected.id === data.id)
					)
				};
				setState(updatedState);
				setStoredState(updatedState);
			}
		} else {
			setState(storedState);
		}
	}, [eventData, setStoredState, state, storedState]);

	const handleSelect = useCallback(
		(data: Data) => {
			const updatedState = {
				...state,
				selectedData: [...state.selectedData, data],
				nonSelectedData: state.nonSelectedData.filter(
					(item) => item.id !== data.id
				)
			};
			setState(updatedState);
			setStoredState(updatedState);
		},
		[setStoredState, state]
	);

	const handleDeselect = useCallback(
		(data: Data) => {
			if (state.selectedData?.length <= 3) {
				const updatedState = {
					...state,
					nonSelectedData: [...state.nonSelectedData, data],
					selectedData: state.selectedData.filter((item) => item.id !== data.id)
				};
				setState(updatedState);
				setStoredState(updatedState);
			} else {
				console.log('Maximum limit reached!');
			}
		},
		[setStoredState, state]
	);

	const contextValues = useMemo(
		() => ({
			state,
			handleSelect,
			handleDeselect,
			isLoading,
			error
		}),
		[state, handleSelect, handleDeselect, isLoading, error]
	);

	return (
		<CardSelectionContext.Provider value={contextValues}>
			{children}
		</CardSelectionContext.Provider>
	);
};
