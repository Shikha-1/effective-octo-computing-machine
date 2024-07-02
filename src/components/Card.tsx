import { FC, KeyboardEvent } from 'react';
import { Data } from '../types/misc';

type CardProps = {
	disabled: boolean;
	event: Data;
	handleButtonClick: (selectedData: Data) => void;
	actionType: 'SELECT' | 'DESELECT';
};

const Card: FC<CardProps> = ({
	disabled = false,
	event,
	handleButtonClick,
	actionType
}) => {
	const { event_name, event_category, formattedTimeRange } = event;

	const categoryInitial = event_category?.charAt(0)?.toUpperCase();

	const handleClick = () => {
		if (!disabled) {
			handleButtonClick(event);
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
		if (event.key === 'Enter' || event.key === ' ') {
			handleClick();
		}
	};

	return (
		<div
			className={`Card ${disabled ? 'component-disabled' : ''}`}
			data-testid={`Card${disabled ? '-disabled' : ''}`}
			role='article'
		>
			<div
				className='card-content'
				data-testid='card-content'
			>
				<h1
					aria-label='Category Initial'
					className='category-indicator'
				>
					{categoryInitial}
				</h1>
				<div
					className='divider'
					aria-hidden='true'
				/>
				<div
					aria-label='Event Details'
					className='details'
					data-testid='card-details'
					title='event-details'
				>
					<h3
						title={`Event Name: ${event_name}`}
						aria-label={`Event Name: ${event_name}`}
					>
						{event_name}
					</h3>
					<p
						title={`Event Category: ${event_category}`}
						aria-label={`Event Category: ${event_category}`}
					>
						({event_category})
					</p>
					<p
						title={`Event Time: ${formattedTimeRange}`}
						aria-label={`Event Time: ${formattedTimeRange}`}
					>
						{formattedTimeRange}
					</p>
				</div>
			</div>
			<div
				className='card-footer'
				data-testid='card-footer'
			>
				<button
					title={`${actionType} ${event_name}`}
					data-testid={`Card-button${disabled ? '-disabled' : ''}`}
					disabled={disabled}
					onClick={handleClick}
					aria-label={`${actionType} ${event_name}`}
					onKeyDown={handleKeyDown}
					tabIndex={0}
				>
					{actionType}
				</button>
			</div>
		</div>
	);
};

export default Card;
