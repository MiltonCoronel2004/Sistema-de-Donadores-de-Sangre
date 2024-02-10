import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';import './css/DonorsTableScroll.css'

const endpoint = "http://localhost:8000/api";

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    getAllDonors();
  }, []);

  const getAllDonors = async () => {
    try {
      const response = await axios.get(`${endpoint}/donors`);
      setDonors(response.data);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  const deleteDonor = async (id) => {
    await axios.delete(`${endpoint}/delete/${id}`);
    getAllDonors();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    const formattedDate = date.toLocaleDateString('es-AR');
    return formattedDate;
  };

  const filteredDonors = donors.filter((donor) =>
    (donor.name.toLowerCase().includes(searchTerm.toLowerCase()) || donor.dni.includes(searchTerm)) &&
    (selectedBloodType === '' || donor.blood === selectedBloodType)
  );

  const bloodTypes = Array.from(new Set(donors.map((donor) => donor.blood)));


  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      // console.log("Token:", token)
      await axios.post(`${endpoint}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('token')
      navigate("/login")
    } catch (error) {
      console.error('Error al desloguearse:', error);
    }
  };
  

  return (
    <div className='container mt-3'>
      <div className='d-grid gap-2'>
        <div className='d-flex justify-content-between'>
        <Link to="/add" className='btn btn-success text-white'>
          Nuevo Donador
        </Link>
        <div className="btn-group">
          <button type="button" className="btn btn-primary text-white">Cuenta</button>
          <button
            className="btn btn-danger dropdown-toggle dropdown-toggle-split"
            type="button"
            id="dropdownMenuReference"
            onClick={toggleDropdown}
            data-bs-toggle="dropdown"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuReference">
            <li><Link className="dropdown-item" href="#">Salir</Link></li>
            <li><Link className="dropdown-item" href="#">Configuración</Link></li>
            <li><Link className="dropdown-item" href="#">Something else here</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" onClick={logout}>Salir</Link></li>
          </ul>
          </div>
        </div>
        <input
          type="text"
          placeholder='Buscar 🔍'
          className='text-center'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className='text-center mb-2'>
          <label>Filtrar:</label>
          {' '} 
          <select value={selectedBloodType} onChange={(e) => setSelectedBloodType(e.target.value)}>
            <option value="">Todos</option>
            {bloodTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>


      <div className='table-wrapper'>
      <table className='table text-center table-striped'>

        <thead className='bg-primary text-white'>
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Número</th>
            <th>Grupo Sanguíneo</th>
            <th>Última Donación</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filteredDonors.map((donor) => (
            <tr key={donor.id}>
              <td style={{width: '225px'}}>{donor.name}</td>
              <td style={{width: '100px'}}>{donor.dni}</td>
              <td style={{width: '150px'}}>{donor.number}</td>
              <td style={{width: '150px'}}>{donor.blood}</td>
              <td style={{width: '160px'}}>{formatDate(donor.last)}</td>

              <td>
                <Link to={`edit/${donor.id}`} className='btn btn-warning' style={{ width: '100px' }}>
                  Editar
                </Link>
                {' '}
                <button onClick={() => deleteDonor(donor.id)} className='btn btn-danger' style={{ width: '100px' }}>
                  Eliminar
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

      </div>

            
    </div>
  );
};

export default Donors;
