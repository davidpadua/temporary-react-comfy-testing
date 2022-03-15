import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'

//:::: {children} porque vou envolver a minha app toda no AuthWrapper
const AuthWrapper = ({children}) => {
  const {isLoading, error} = useAuth0()

  if(isLoading) {
    return (
        <Wrapper>
            <h1>loading...</h1>
        </Wrapper>
      )
  }
  if(error) {
    <React.Fragment>
        <h1>{error.message}</h1>
    </React.Fragment>
  }
  //::::  se não estiver a fazer o loading nem houver erro então retorna os children (components) todos dentro do <AuthWrapper> component >> ver App.js
  return <React.Fragment>{children}</React.Fragment>
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

export default AuthWrapper
