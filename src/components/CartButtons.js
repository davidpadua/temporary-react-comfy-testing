import React from 'react'
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useProductsContext } from '../context/products_context'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'

const CartButtons = () => {

  const { closeSidebar } = useProductsContext()
  const { total_items, clearCart } = useCartContext();
  const {loginWithRedirect, myUser, logout} = useUserContext();


  return (
    
    <Wrapper className='cart-btn-wrapper'>
        <Link to='/cart' className='cart-btn' onClick={closeSidebar}>
          Cart
          <span className='cart-container'>
              <FaShoppingCart/>
              <span className="cart-value">{total_items}</span>
          </span>
        </Link>
        {
          myUser ? 
          <button 
            type="button" 
            className="auth-btn" 
            onClick={() => {

              clearCart()
              logout({ returnTo:window.location.origin })
            }
            }>   {/* ver docs do Auth0 */}
            Logout <FaUserMinus />
          </button>
          : 
          <button type="button" className="auth-btn" onClick={loginWithRedirect}>
          Login <FaUserPlus />
          </button>
        }
        {/* NOTA: adenda feita por mim >> não está no curso  >>> usei a props picture que vêm do user no Auth0*/}
        {
          myUser ? <img src={myUser.picture} alt="profile-pic" className="cartButtons__img"/> : null
        }  
        
        
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* NOTA: adenda de mais uma coluna para caber a img feita por mim >> não está no curso */
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    padding: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
  /* NOTA: adenda feita por mim >> não está no curso */
  .cartButtons__img {
    border-radius: 50%;
    max-width: 50px;
  }
`
export default CartButtons
