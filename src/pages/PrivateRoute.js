import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

//import { useUserContext } from '../context/user_context';


//::: não confundir o ...rest (pode ser outro nome qualquer) com o spread operator nos arrays que traz os items todos do array
//::: aqui usamos o ...rest (pode ser outro nome qualquer) para trazer o resto dos parameters da <PrivateRoute> >> que são estes: exact path="/checkout"
//::: o children aqui é o que está dentro do <PrivateRoute>, neste caso a <Checkout /> page

const PrivateRoute = ({children, ...rest}) => { 
  const {user} = useAuth0();
 if(!user) { 
   return <Navigate to="/" /> 
  }

  return children;
};
export default PrivateRoute;
