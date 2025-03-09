'use client'

import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export default function AuthProvider ({children}) {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <AuthContext.Provider value={{isLogged, setIsLogged}}>
        {children}
    </AuthContext.Provider>
  )

}

export const useAuth = () => useContext(AuthContext);
