import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const endpoint = "http://localhost:8000/api/newdonor";

const CreateDonors = () => {
  const [name, setName] = useState('');
  const [dni, setDNI] = useState('');
  const [number, setNumber] = useState('');
  const [blood, setBlood] = useState('');
  const [last, setLast] = useState('');
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();


  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  const store = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(endpoint, { name, dni, number, blood, last });
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.log(error.response.data.errors);
      setErrors(error.response.data.errors);
      setShowModal(false)
      setTimeout(() => {
        setErrors('');
      }, 3500);

    }
  };

  return (
    <div className='container mt-5'>
      <h3>Nuevo donante: {name} - {dni}</h3>
      <form onSubmit={store} className=''>
        <div className="col-12">
          <div className="row">
            <div className="col-6">
              <div className='mb-3'>
                <label htmlFor="">Nombre</label>
                <input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type='text'
                  className='form-control' />
                {errors && errors.name && <p className='text-danger'>{errors.name}</p>}
              </div>
            </div>
            <div className="col-6">
              <div className='mb-3'>
                <label htmlFor="">DNI</label>
                <input 
                  value={dni}
                  onChange={(e) => setDNI(e.target.value)}
                  className='form-control'
                  type="number" />
                {errors && errors.dni && <p style={{ color: 'red' }}>{errors.dni}</p>}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className='mb-3'>
                <label htmlFor="">Número</label>
                <input 
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className='form-control'
                  type="number" />
                {errors && errors.number && <p style={{ color: 'red' }}>{errors.number}</p>}
              </div>
            </div>
            <div className="col-6">
              <div className='mb-3'>
                <label htmlFor="">Tipo Sanguinio</label>
                <input 
                  value={blood}
                  onChange={(e) => setBlood(e.target.value)}
                  className='form-control'
                  type="text" />
                {errors && errors.blood && <p style={{ color: 'red' }}>{errors.blood}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className='mb-3'>
          <label htmlFor="">Ultima donación</label>
          <input 
            value={last}
            onChange={(e) => setLast(e.target.value)}
            className='form-control'
            type="date" />
          {errors && errors.last && <p style={{ color: 'red' }}>{errors.last}</p>}
        </div>


        <button type='button' className='btn btn-success' onClick={handleShowModal}>Guardar</button>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>¿Desea crear un nuevo registro de donante?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Se creara un nuevo registro de donante.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={store}>
              Si, guardar.
            </Button>
            <Button variant="danger" onClick={handleCloseModal}>
              No, cancelar
            </Button>
          </Modal.Footer>
        </Modal>

        <Link to='/' className='btn btn-danger mx-4'>Volver</Link>

      </form>
    </div>
  );
};

export default CreateDonors;
