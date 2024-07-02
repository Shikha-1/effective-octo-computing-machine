import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';
import { CardSelectionContext } from '../state-management/CardSelectionContext';

const mockContextValue = {
	state: {
		nonSelectedData: [
			{
				id: 1,
				event_name: 'Event 1',
				start_time: '2024-06-30T10:00:00Z',
				end_time: '2024-06-30T11:00:00Z',
				formattedTimeRange: '1:30 PM - 2:30 PM',
				event_category: 'Swimming'
			},
			{
				id: 2,
				event_name: 'Event 2',
				start_time: '2024-06-30T12:00:00Z',
				end_time: '2024-06-30T13:00:00Z',
				formattedTimeRange: '1:00 PM - 1:30 PM',
				event_category: 'Swimming'
			}
		],
		selectedData: []
	},
	handleSelect: jest.fn(),
	handleDeselect: jest.fn(),
	isLoading: false,
	error: null
};

describe('App Component', () => {
	it('renders loading text', () => {
		const mockContextValue2 = {
			...mockContextValue,
			isLoading: true
		};
		render(
			<CardSelectionContext.Provider value={mockContextValue2}>
				<App />
			</CardSelectionContext.Provider>
		);
		expect(screen.getByText('Loading...')).not.toBeNull();
	});

	it('renders error message', () => {
		const mockContextValue2 = {
			...mockContextValue,
			error: 'Something went wrong!'
		};
		render(
			<CardSelectionContext.Provider value={mockContextValue2}>
				<App />
			</CardSelectionContext.Provider>
		);
		expect(screen.getByText('Something went wrong!')).not.toBeNull();
	});

	it('handles button click correctly for SELECT action', () => {
		render(
			<CardSelectionContext.Provider value={mockContextValue}>
				<App />
			</CardSelectionContext.Provider>
		);
		const buttons = screen.getAllByText('SELECT');
		fireEvent.click(buttons[0]);
		expect(mockContextValue.handleSelect).toHaveBeenCalledWith(
			mockContextValue.state.nonSelectedData[0]
		);
	});
	it('handles button click correctly for DESELECT action', () => {
		const modifiedContextValue = {
			...mockContextValue,
			state: {
				...mockContextValue.state,
				selectedData: [
					{
						id: 3,
						event_name: 'Event 3',
						start_time: '2024-06-30T14:00:00Z',
						end_time: '2024-06-30T15:00:00Z',
						formattedTimeRange: '1:00 PM - 1:30 PM',
						event_category: 'Swimming'
					}
				]
			}
		};

		render(
			<CardSelectionContext.Provider value={modifiedContextValue}>
				<App />
			</CardSelectionContext.Provider>
		);
		fireEvent.click(screen.getByText('DESELECT'));
		expect(mockContextValue.handleDeselect).toHaveBeenCalledWith(
			modifiedContextValue.state.selectedData[0]
		);
	});
	it('detects event conflicts correctly', () => {
		render(
			<CardSelectionContext.Provider value={mockContextValue}>
				<App />
			</CardSelectionContext.Provider>
		);
		expect(mockContextValue.state.selectedData).toHaveLength(0);
		const buttons = screen.getAllByText('SELECT');
		fireEvent.click(buttons[0]);
		expect(mockContextValue.handleSelect).toHaveBeenCalledTimes(1);
	});
});
