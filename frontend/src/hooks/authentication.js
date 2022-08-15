import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@Bolttech-challenge:token')
    const user = localStorage.getItem('@Bolttech-challenge:user')

    if (token && user) {
      api.defaults.headers.authorization = token
      return { token, user: JSON.parse(user) }
    }

    return {}
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password })

    const { token, user } = response.data

    localStorage.setItem('@Bolttech-challenge:token', token)
    localStorage.setItem('@Bolttech-challenge:user', JSON.stringify(user))

    api.defaults.headers.authorization = token
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@Bolttech-challenge:token')
    localStorage.removeItem('@Bolttech-challenge:user')

    setData(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('The context must be used within an Auth Provider');
  }

  return context;
}

export { useAuth, AuthProvider }
