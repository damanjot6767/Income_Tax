import './App.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import HraCalculator from './component/hraCalculator';
import AdvanceTaxCalculator from './component/taxCalculator';

function App() {
  return (
    <div className="App">
     <HraCalculator/> 
     <AdvanceTaxCalculator/>     
      <NotificationContainer /> 
    </div>
  );
}

export default App;
