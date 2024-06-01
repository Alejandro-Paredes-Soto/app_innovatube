import './App.css';
import Login from './pages/login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Register from './pages/register/Register';
import Favorites from './pages/favorites/Favorites';

function App() {
  return (
    <Router>
      

        <Routes>
          <Route path="/" element={<Login/>} />
           <Route path="/dashboard" element={<Dashboard/>} />
           <Route path='/favorites' element={<Favorites/>} />
          <Route path="/registerUser" element={<Register />} /> 
        </Routes>
      
    </Router>
  );
}

export default App;
