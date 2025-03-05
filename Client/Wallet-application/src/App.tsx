import { ExpenseProvider } from './context/ExpenseProvider';
import Home from './pages/Home';

const App = () => (
    <ExpenseProvider>
        <Home />
    </ExpenseProvider>
);

export default App;

