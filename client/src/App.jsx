import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Donors from './components/Donors';
import CreateDonors from './components/CreateDonors';
import EditDonors from './components/EditDonors';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Donors />}/>
        <Route path='/add' element={<CreateDonors />}/>
        <Route path='/edit/:id' element={<EditDonors />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
