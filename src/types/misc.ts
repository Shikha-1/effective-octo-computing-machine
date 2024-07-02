type Data = {
	id: number;
	event_name: string;
	event_category: string;
	start_time: string;
	end_time: string;
	formattedTimeRange: string;
};

type State = {
	nonSelectedData: Data[];
	selectedData: Data[];
};

type CardSelectionContextType = {
	state: State;
	handleSelect: (arg: Data) => void;
	handleDeselect: (arg: Data) => void;
	isLoading: boolean;
	error: string | null;
};

export type { Data, State, CardSelectionContextType };
