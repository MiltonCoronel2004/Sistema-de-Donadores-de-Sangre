import { useState } from 'react'
import axios from 'axios'
import background from '../assets/background.jpg'
import { Link, useNavigate } from 'react-router-dom';


const endpoint = "http://localhost:8000/api/register"

const Register = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState();

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault()
    try {
      await axios.post(endpoint, {email, user, pass})
      navigate('/login')
    } catch (error) {
      setError(error.response.data.errors)
      setTimeout(() => {
        setError('');
      }, 4000);
    }
  }

  return (
    <div style={{width: '100%', height: '100vh', backgroundImage: `url(${background})`, backgroundSize: 'cover'}}>
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div  style={{width: '300px'}}>
          <div className='card'>
            <div className="card-header bg-success text-white" style={{border: '1px solid #ccc'}}>
              <h1 style={{fontSize: '28px'}} className='text-center'>Registrarse</h1>
            </div>
          </div>
          <form onSubmit={register} className='form-control text-center' style={{backgroundColor: 'rgba(255,255,255, 0.2)', borderTopLeftRadius: '0px' , borderTopRightRadius: '0px', border: '1px solid #ccc'}}>
            <div className='my-4'>  
              <input type="email" name='email' autoComplete='off' className='form-control' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} required/>
              {error && error.email && <p>{error.email}</p>}
            </div>
            <div className='my-4'>
              <input type="text" name='user' autoComplete='off' className='form-control' placeholder='Usuario' onChange={(e) => setUser(e.target.value)} value={user} required/>
              {error && error.user && <p>{error.user}</p>}
            </div>
            <div className='my-4'>
              <input type="password" name='pass' className='form-control' placeholder='Contraseña' onChange={(e) => setPass(e.target.value)} value={pass} required/>
              {error && error.pass && <p>{error.pass}</p>}
            </div>

            <button type='submit' className='btn btn-success' style={{borderRadius: '10px', width: '200px'}}>Registrarse</button>
            <Link to={'/login'} className='d-block mt-2 text-white'>Ingresar</Link>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
