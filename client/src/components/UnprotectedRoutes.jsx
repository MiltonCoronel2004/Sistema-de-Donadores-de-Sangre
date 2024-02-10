import {Navigate, Outlet} from 'react-router-dom'

const UnprotectedRoutes = ({ auth, redirectPath}) => {

  if(auth) {
    return <Navigate to={redirectPath} replace/>
  }

  
  return <Outlet />
}

export default UnprotectedRoutes