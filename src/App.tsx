import './App.css';
import { useContext } from 'react';
import { CardSelectionContext } from './state-management/CardSelectionContext';
import Container from './components/Container';

function App() {
	const context = useContext(CardSelectionContext);

	const { state, handleSelect, handleDeselect, isLoading, error } = context;

	const hasConflict = (startTime: string, endTime: string) => {
		return state.selectedData.some(
			(selectedEvent) =>
				new Date(startTime) < new Date(selectedEvent.end_time) &&
				new Date(endTime) > new Date(selectedEvent.start_time)
		);
	};

	if (isLoading) return <h1>Loading...</h1>;
	if (error) return <h1>{error}</h1>;

	return (
		<div className='App'>
			<Container
				actionType='SELECT'
				title='Non Selected Data'
				dataList={state.nonSelectedData}
				disabled={hasConflict}
				handleButtonClick={handleSelect}
			/>
			<Container
				actionType='DESELECT'
				title='Selected Data'
				dataList={state.selectedData}
				handleButtonClick={handleDeselect}
			/>
		</div>
	);
}

export default App;
