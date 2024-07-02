import { render, fireEvent, screen } from '@testing-library/react';
import Card from '../../components/Card';

const mockEvent = {
	id: 1,
	event_name: 'Event 1',
	event_category: 'Swimming',
	formattedTimeRange: '1:00 PM - 2:00 PM',
	start_time: '',
	end_time: ''
};

describe('Card component', () => {
	it('renders correctly with event data', () => {
		const handleButtonClick = jest.fn();

		render(
			<Card
				disabled={false}
				event={mockEvent}
				handleButtonClick={handleButtonClick}
				actionType='SELECT'
			/>
		);

		const card = screen.getByTestId('Card');
		expect(card).toBeInTheDocument();

		const categoryIndicator = screen.getByText('S');
		expect(categoryIndicator).toBeInTheDocument();

		const eventName = screen.getByText('Event 1');
		expect(eventName).toBeInTheDocument();

		const eventCategory = screen.getByText('(Swimming)');
		expect(eventCategory).toBeInTheDocument();

		const formattedTimeRange = screen.getByText('1:00 PM - 2:00 PM');
		expect(formattedTimeRange).toBeInTheDocument();

		const button = screen.getByTestId('Card-button');
		expect(button).toBeInTheDocument();
		expect(button).not.toBeDisabled();
	});

	it('calls handleButtonClick when button is clicked', () => {
		const handleButtonClick = jest.fn();

		render(
			<Card
				disabled={false}
				event={mockEvent}
				handleButtonClick={handleButtonClick}
				actionType='SELECT'
			/>
		);

		const button = screen.getByTestId('Card-button');
		fireEvent.click(button);

		expect(handleButtonClick).toHaveBeenCalledWith(mockEvent);
	});

	it('renders correctly when disabled', () => {
		const handleButtonClick = jest.fn();

		render(
			<Card
				disabled
				event={mockEvent}
				handleButtonClick={handleButtonClick}
				actionType='SELECT'
			/>
		);

		const cardDisabled = screen.getByTestId('Card-disabled');
		expect(cardDisabled).toHaveClass('component-disabled');
		expect(cardDisabled).toBeInTheDocument();

		const buttonDisabled = screen.getByTestId('Card-button-disabled');
		expect(buttonDisabled).toBeInTheDocument();
		expect(buttonDisabled).toBeDisabled();
		fireEvent.click(buttonDisabled);
		expect(handleButtonClick).not.toHaveBeenCalled();
	});

	it('handles key down correctly and checks aria-label and title', () => {
		const mockHandleButtonClick = jest.fn();
		render(
			<Card
				disabled={false}
				event={mockEvent}
				handleButtonClick={mockHandleButtonClick}
				actionType='SELECT'
			/>
		);

		const cardButton = screen.getByTestId('Card-button');
		const categoryInitial = mockEvent.event_category.charAt(0).toUpperCase();

		const categoryInitialElement = screen.getByText(categoryInitial);
		expect(categoryInitialElement).toHaveAttribute(
			'aria-label',
			'Category Initial'
		);

		const eventNameElement = screen.getByText(mockEvent.event_name);
		expect(eventNameElement).toHaveAttribute(
			'aria-label',
			`Event Name: ${mockEvent.event_name}`
		);
		expect(eventNameElement).toHaveAttribute(
			'title',
			`Event Name: ${mockEvent.event_name}`
		);

		const eventCategoryElement = screen.getByText(
			`(${mockEvent.event_category})`
		);
		expect(eventCategoryElement).toHaveAttribute(
			'aria-label',
			`Event Category: ${mockEvent.event_category}`
		);
		expect(eventCategoryElement).toHaveAttribute(
			'title',
			`Event Category: ${mockEvent.event_category}`
		);

		const eventTimeElement = screen.getByText(mockEvent.formattedTimeRange);
		expect(eventTimeElement).toHaveAttribute(
			'aria-label',
			`Event Time: ${mockEvent.formattedTimeRange}`
		);
		expect(eventTimeElement).toHaveAttribute(
			'title',
			`Event Time: ${mockEvent.formattedTimeRange}`
		);

		fireEvent.keyDown(cardButton, { key: 'Enter' });
		expect(mockHandleButtonClick).toHaveBeenCalledWith(mockEvent);

		fireEvent.keyDown(cardButton, { key: ' ' });
		expect(mockHandleButtonClick).toHaveBeenCalledTimes(2);
		expect(mockHandleButtonClick).toHaveBeenLastCalledWith(mockEvent);
	});
});
