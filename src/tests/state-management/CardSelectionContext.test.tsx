import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import useLocalStorage from '../../hooks/useLocalStorage';
import useFetch from '../../hooks/useFetch';
import { formatTimeRange } from '../../utils/dateTime';
import { Data } from '../../types/misc';
import {
	CardSelectionContext,
	CardSelectionProvider
} from '../../state-management/CardSelectionContext';
import userEvent from '@testing-library/user-event';

jest.mock('../../hooks/useFetch');
jest.mock('../../hooks/useLocalStorage');
jest.mock('../../utils/dateTime');

const mockUseFetch = useFetch as jest.MockedFunction<typeof useFetch>;
const mockUseLocalStorage = useLocalStorage as jest.MockedFunction<
	typeof useLocalStorage
>;
const mockFormatTimeRange = formatTimeRange as jest.MockedFunction<
	typeof formatTimeRange
>;

const mockEventData: Data[] = [
	{
		id: 1,
		event_name: 'Event 1',
		start_time: '2022-01-01T00:00:00Z',
		end_time: '2022-01-01T01:00:00Z',
		event_category: '',
		formattedTimeRange: ''
	},
	{
		id: 2,
		event_name: 'Event 2',
		start_time: '2022-01-01T02:00:00Z',
		end_time: '2022-01-01T03:00:00Z',
		event_category: '',
		formattedTimeRange: ''
	},
	{
		id: 3,
		event_name: 'Event 3',
		start_time: '2022-01-01T04:00:00Z',
		end_time: '2022-01-01T05:00:00Z',
		event_category: '',
		formattedTimeRange: ''
	},
	{
		id: 4,
		event_name: 'Event 4',
		start_time: '2022-01-01T06:00:00Z',
		end_time: '2022-01-01T07:00:00Z',
		event_category: '',
		formattedTimeRange: ''
	}
];

beforeEach(() => {
	mockUseFetch.mockReturnValue({
		data: mockEventData,
		isLoading: false,
		error: null
	});

	mockUseLocalStorage.mockReturnValue([
		null, // no stored state
		jest.fn() // setStoredState
	]);

	mockFormatTimeRange.mockImplementation((start, end) => `${start} - ${end}`);
});

const MockChildComponent = () => {
	const { state, handleSelect, handleDeselect } =
		React.useContext(CardSelectionContext);

	return (
		<div>
			<div data-testid='non-selected-data'>
				{state.nonSelectedData.map((data) => (
					<div key={data.id}>
						<span>{data.event_name}</span>
						<button onClick={() => handleSelect(data)}>Select</button>
					</div>
				))}
			</div>
			<div data-testid='selected-data'>
				{state.selectedData.map((data) => (
					<div key={data.id}>
						<span>{data.event_name}</span>
						<button onClick={() => handleDeselect(data)}>Deselect</button>
					</div>
				))}
			</div>
		</div>
	);
};

describe('CardSelectionProvider', () => {
	it('renders non-selected data initially', () => {
		render(
			<CardSelectionProvider>
				<MockChildComponent />
			</CardSelectionProvider>
		);

		expect(screen.getByText('Event 1')).toBeInTheDocument();
		expect(screen.getByText('Event 2')).toBeInTheDocument();
	});

	it('handles selection of data', () => {
		render(
			<CardSelectionProvider>
				<MockChildComponent />
			</CardSelectionProvider>
		);
		expect(screen.getByTestId('non-selected-data')).toHaveTextContent(
			'Event 1'
		);
		fireEvent.click(screen.getAllByText('Select')[0]);
		expect(screen.getByTestId('selected-data')).toHaveTextContent('Event 1');
		expect(screen.getByTestId('non-selected-data')).not.toHaveTextContent(
			'Event 1'
		);
	});

	it('handles deselection of data', () => {
		render(
			<CardSelectionProvider>
				<MockChildComponent />
			</CardSelectionProvider>
		);

		fireEvent.click(screen.getAllByText('Select')[0]);
		fireEvent.click(screen.getAllByText('Deselect')[0]);
		expect(screen.getByTestId('non-selected-data')).toHaveTextContent(
			'Event 1'
		);
		expect(screen.getByTestId('selected-data')).not.toHaveTextContent(
			'Event 1'
		);
	});

	it('does not select data if the limit is reached', () => {
		render(
			<CardSelectionProvider>
				<MockChildComponent />
			</CardSelectionProvider>
		);
		const selectButtons = screen.getAllByText('Select');
		userEvent.click(selectButtons[0]);
		userEvent.click(selectButtons[1]);
		userEvent.click(selectButtons[2]);
		userEvent.click(selectButtons[3]);
		expect(screen.getByTestId('non-selected-data')).not.toHaveTextContent(
			'Event 4'
		);
	});

	it('should set state to storedState correctly', () => {
		const mockStoredState = {
			nonSelectedData: [
				{
					id: 1,
					event_name: 'Event 1',
					start_time: '2022-01-01T00:00:00Z',
					end_time: '2022-01-01T01:00:00Z',
					event_category: '',
					formattedTimeRange: ''
				}
			],
			selectedData: []
		};
		localStorage.setItem('cardSelectionState', JSON.stringify(mockStoredState));

		render(
			<CardSelectionProvider>
				<MockChildComponent />
			</CardSelectionProvider>
		);
		expect(screen.getByText('Event 1')).toBeInTheDocument(); // Should be in non-selected data

		localStorage.removeItem('cardSelectionState');
	});
});
