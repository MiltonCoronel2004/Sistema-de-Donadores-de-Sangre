import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Donors from './components/Donors';
import CreateDonors from './components/CreateDonors';
import EditDonors from './components/EditDonors';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Donors />}/>
        <Route path='/add' element={<CreateDonors />}/>
        <Route path='/edit/:id' element={<EditDonors />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
