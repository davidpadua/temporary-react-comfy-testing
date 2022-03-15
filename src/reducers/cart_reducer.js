import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {

  if (action.type === ADD_TO_CART) {
    const {id, color, amount, product} = action.payload;
    //:: procura no array do cart se existe um item com o id e a color que vem do action.payload
    const tempItem = state.cart.find((item) => item.id === id + color) 
    //:: se o item existir no cart array
    if(tempItem) {
      //:: se existir então procura dentro do cart array todos os items cujo id + color fizerem match com o id do item
        const tempCart = state.cart.map((cartItem) => {
        //:: se o id fizer match aumenta só o amount
        if(cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if(newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          //::: e só actualiza a propriedade do amount
          return { ...cartItem, amount: newAmount };
        } //:: se o id não fizer match retorna o cartItem
        else {
          return cartItem;
        }
      })

      return {...state, cart: tempCart}
      //:: se o item NÃO existir no cart array
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      }
      //:::: se não existir o item no cart, então vai buscar o state antigo + o state.cart array antigo e adiciona o newItem a esse array cart
      return {...state, cart: [...state.cart, newItem]} 
    }
  }

  if(action.type === REMOVE_CART_ITEM) {
    const tempCart =  state.cart.filter((item) => item.id !== action.payload)
    return {...state, cart: tempCart}
  }

  if(action.type === CLEAR_CART) {
    return {...state, cart: [] }
  }

  if(action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const {id, value} = action.payload;
    // eslint-disable-next-line array-callback-return
    const tempCart = state.cart.map((item) => {

        if(item.id === id) {

           //::: if is increase
            if(value === 'inc') {

              let newAmount = item.amount + 1;
              //::: se o newAMount for maior do que o max
              if(newAmount > item.max) {
                newAmount = item.max
              }
              return {...item, amount: newAmount}
            }

            //::: if is decrease
            if(value === 'dec') {
              let newAmount = item.amount - 1;
              if(newAmount < 1) {
                newAmount = 1
              }
              return {...item, amount: newAmount}
            }
        } return item
       
    })
    return {...state, cart: tempCart}
  }

  if(action.type === COUNT_CART_TOTALS) {

      const {total_items, total_amount } = state.cart.reduce((total, cartItem) => {
          const {amount, price} = cartItem;
          total.total_items += amount;
          total.total_amount += price * amount

          return total; //:::: é obrigatório retornar sempre o total no reduce()
      }, 
      {
        //:::: objecto inicial (segundo parâmetro do reduce)
        total_items:0,
        total_amount:0,
      })
      
      return {...state, total_items, total_amount }
  }
  
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
