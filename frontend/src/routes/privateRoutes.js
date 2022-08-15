import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/authentication'

const PrivateRoutes = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth()

  return (!!user ? <Outlet /> : <Navigate replace to="/sign-in" />)
}

export default PrivateRoutes
