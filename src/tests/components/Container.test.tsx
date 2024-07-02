import { render, screen } from '@testing-library/react';
import Container from '../../components/Container';

const mockDataList = [
	{
		id: 1,
		event_name: 'Event 1',
		start_time: '2022-12-17 13:30:00',
		end_time: '2022-12-17 14:30:00',
		formattedTimeRange: '1:30 PM - 2:30 PM',
		event_category: 'Swimming'
	},
	{
		id: 2,
		event_name: 'Event 2',
		start_time: '2022-12-17 15:00:00',
		end_time: '2022-12-17 16:00:00',
		formattedTimeRange: '3:00 PM - 4:00 PM',
		event_category: 'Running'
	}
];

describe('Container component', () => {
	it('renders correctly with title and dataList', () => {
		const handleButtonClick = jest.fn();
		render(
			<Container
				title='Test Container'
				dataList={mockDataList}
				handleButtonClick={handleButtonClick}
				actionType='SELECT'
			/>
		);

		const container = screen.getByTestId('Container');
		expect(container).toBeInTheDocument();

		const containerTitle = screen.getByTestId('container-title');
		expect(containerTitle).toBeInTheDocument();
		expect(containerTitle).toHaveTextContent('Test Container');

		const containerBody = screen.getByTestId('container-body');
		expect(containerBody).toBeInTheDocument();

		const cards = screen.getAllByTestId('Card');
		expect(cards).toHaveLength(mockDataList.length);

		mockDataList.forEach((data) => {
			const eventName = screen.getByText(data.event_name);
			expect(eventName).toBeInTheDocument();
		});
	});

	it('disables cards based on disabled function', () => {
		const disabled = (startTime: string, endTime: string) => true;

		const handleButtonClick = jest.fn();
		render(
			<Container
				title='Test Container'
				dataList={mockDataList}
				handleButtonClick={handleButtonClick}
				actionType='SELECT'
				disabled={disabled}
			/>
		);

		const cards = screen.getAllByTestId('Card-disabled');
		cards.forEach((card) => {
			const isDisabled = disabled('', '');
			const expectedTestId = isDisabled ? 'Card-disabled' : 'Card';
			expect(card).toHaveAttribute('data-testid', expectedTestId);
		});
	});
});
