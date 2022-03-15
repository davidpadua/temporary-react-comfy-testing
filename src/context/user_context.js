import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {

  //:::: props e functions vindas do Auth0
  const {loginWithRedirect, logout, user} = useAuth0(); //::: hook do Auth0 >> ver docs

  const [myUser, setMyUser] = useState(null)

  useEffect(() => {
    
      setMyUser(user)
      /* if(isAuthenticated) {
        setMyUser(user)
      
      } else {
        setMyUser(false)
      } */
  },[user])


  return (
    <UserContext.Provider value={{loginWithRedirect, logout, myUser}}>{children}</UserContext.Provider>
  )
}
// make sure use hook:
export const useUserContext = () => {
  return useContext(UserContext)
}
