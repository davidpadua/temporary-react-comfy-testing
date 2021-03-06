import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

//:::: check local storage to see if the cart is empty or not
const getLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if(cart) {
    return JSON.parse(localStorage.getItem('cart')) 
  } else {
    return [];
  }
}

//:::: initial state
const initialState = {
  cart: getLocalStorage(), //::: em vez do [] vazio vamos ver na localStorage se existe lá algum poducto adicionado
  total_items:0,
  total_amount:0,
  shipping_fee: 534
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState); //::: envia o state e o dispatch e no useReducer dizes qual o reducer que vais usar o o initialSate
  //:::: add to cart 
  const addToCart = (id, color, amount, product) => {
      dispatch({type: ADD_TO_CART, payload: {id, color, amount, product}})
  }

  //:::: remove item 
  const removeItem = (id) => {
      dispatch({type: REMOVE_CART_ITEM, payload: id})
  }
  //:::: toggle amount
  const toggleAmount = (id, value) => {
    //console.log(id, value);
      dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload: {id, value}})
  }

  //:::: clear cart
  const clearCart = () => {
      dispatch({type: CLEAR_CART})
  }

  
  useEffect(() => {
    dispatch({type: COUNT_CART_TOTALS})
    //::::local storage
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <CartContext.Provider value={{...state, addToCart, removeItem, toggleAmount, clearCart}}>{children}</CartContext.Provider>//:::: aqui no valeu envias todas as props do state
  )
}
// make sure use useCartContext on components
export const useCartContext = () => {
  return useContext(CartContext)
}
