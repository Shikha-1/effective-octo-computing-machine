import { FC } from 'react';
import { Data } from '../types/misc';
import Card from './Card';

interface ContainerProps {
	disabled?: (startTime: string, endTime: string) => boolean;
	title: string;
	dataList: Data[];
	handleButtonClick: (selectedData: Data) => void;
	actionType: 'SELECT' | 'DESELECT';
}

const Container: FC<ContainerProps> = ({
	disabled,
	title,
	dataList,
	handleButtonClick,
	actionType
}) => {
	return (
		<div
			className='Container'
			data-testid='Container'
			title={title}
		>
			<h3
				className='container-title text-center'
				data-testid='container-title'
				aria-label={title}
				title={title}
			>
				{title}
			</h3>
			<div
				className='container-body'
				data-testid='container-body'
				aria-label={title}
				title={title}
			>
				{dataList.map((data) => {
					return (
						<Card
							key={data.id}
							disabled={
								disabled ? disabled(data.start_time, data.end_time) : false
							}
							event={data}
							handleButtonClick={handleButtonClick}
							actionType={actionType}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Container;
