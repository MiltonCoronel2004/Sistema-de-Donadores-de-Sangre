import { useState } from 'react'
import axios from 'axios'
import background from '../assets/background.jpg'
import { Link, useNavigate } from 'react-router-dom';

const endpoint = "http://localhost:8000/api/login"

const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState();
  const [invalidPass, setInvalidPass] = useState();
  const navigate = useNavigate();



  const login = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(endpoint, { name: user, password: pass })
      const token = response.data.access_token
      localStorage.setItem('token', token)
      navigate('/')
      window.location.reload();
    } catch (error) {
      setError(error.response.data.errors)
      setInvalidPass(error.response.data.error)
      localStorage.removeItem('token')
      setTimeout(() => {
        setError('');
        setInvalidPass('');
      }, 4000);
    }
  }

  return (
    <div style={{ width: '100%', height: '100vh', backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div style={{ width: '300px' }}>
          <div className='card'>
            <div className="card-header bg-success text-white" style={{ border: '1px solid #ccc' }}>
              <h1 style={{ fontSize: '28px' }} className='text-center'>Iniciar sesión</h1>
            </div>
          </div>
          <form onSubmit={login} className='form-control text-center' style={{ backgroundColor: 'rgba(255,255,255, 0.2)', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', border: '1px solid #ccc' }}>
            <div className='my-4'>
              <input type="text" name='user' autoComplete='off' className='form-control' placeholder='Usuario' onChange={(e) => setUser(e.target.value)} value={user} required />
              {error && error.name && <p className='text-white'>{error.name}</p>}
            </div>
            <div className='my-4'>
              <input type="password" name='pass' className='form-control' placeholder='Contraseña' onChange={(e) => setPass(e.target.value)} value={pass} required />
              {error && error.password && <p className='text-white'>{error.password}</p>}
              {invalidPass && <p className='text-white'>{invalidPass}</p>}
            </div>

            <button type='submit' className='btn btn-success' style={{ borderRadius: '10px', width: '200px' }}>Ingresar</button>
            <Link to={'/register'} className='d-block mt-2 text-white'>Crear cuenta</Link>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
