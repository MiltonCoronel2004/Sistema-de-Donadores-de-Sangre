import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Donors from './components/Donors';
import CreateDonors from './components/CreateDonors';
import EditDonors from './components/EditDonors';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import UnprotectedRoutes from './components/UnprotectedRoutes';
import NotFoundPage from './components/NotFoundPage';



function App() {
    const token = localStorage.getItem('token')
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute auth={token} redirectPath='/login'/>}>
            <Route path='/' element={<Donors />}/>
            <Route path='/add' element={<CreateDonors />}/>
            <Route path='/edit/:id' element={<EditDonors />}/>
          </Route>
          <Route element={<UnprotectedRoutes auth={token} redirectPath='/'/>}>
          <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
          </Route>    
          <Route path='*' element={<NotFoundPage />}/>
        </Routes>
      </BrowserRouter>
    );
  

  
}

export default App;
