import {Navigate, Outlet} from 'react-router-dom'
/* eslint-disable react/prop-types */

const UnprotectedRoutes = ({ auth, redirectPath}) => {

  if(auth) {
    return <Navigate to={redirectPath} replace/>
  }

  
  return <Outlet />
}

export default UnprotectedRoutes