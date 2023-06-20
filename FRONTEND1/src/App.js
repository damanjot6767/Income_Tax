import './App.css';
import { BrowserRouter } from "react-router-dom"
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';


function App() {
  const { isLoggedIn:isLoggedIn1 } = useSelector(({dealers})=>dealers)
  const { isLoggedIn } = useSelector(({users})=>users)
  return (
     <>        
    <BrowserRouter>  
                         
      <NotificationContainer />    
     
</>
  );
}

export default App;
