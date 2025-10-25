import React, { useContext } from 'react'
import { BlogContext } from '../context/BlogContext'
import { Navigate } from 'react-router'

const UserRouteProtect = ({ children }) => {
const auth = localStorage.getItem("auth")
  return (

    <div>
      {auth ? children : <Navigate to={"/login"}/>}
    </div>
  )
}

export default UserRouteProtect
