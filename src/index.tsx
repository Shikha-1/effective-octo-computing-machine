import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CardSelectionProvider } from './state-management/CardSelectionContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<CardSelectionProvider>
		<App />
	</CardSelectionProvider>
);
