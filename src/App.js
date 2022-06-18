import Covid from './components/Covid';
import './App.css';
import { AllRoutes } from './routes/AllRoutes';


function App() {
  return (
    <div className="App">
      <h1>Covid Tracker Dashboard</h1>
      {/* <Covid/> */}
      <AllRoutes/>
    </div>
  );
}

export default App;
