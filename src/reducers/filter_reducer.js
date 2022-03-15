import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {

  if(action.type === LOAD_PRODUCTS) {
    //::: vou buscar o price de todos os products e retiro o maior de todo e coloco-o em maxPrice com a function Math.max()
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice) //::: não posso passar o array, tenho de usar o spread operator
    
    //::: tem que se colocar o spread operator ...action.payload no all_products para se manter o original array dos products senão no filer ele desaparece da memória
    return {
      ...state, 
      all_products:[...action.payload], 
      filtered_products:[...action.payload],
      filters: {...state.filters, max_price: maxPrice, price: maxPrice} //:::: copio os valores todos do filter e depois altero os que quero
    } 
  }

  if(action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true } 
  }

  if(action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false } 
  }

  if(action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload } 
  }

  if(action.type === SORT_PRODUCTS) {

    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];

    if(sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price); //:: o price é uma prop do objecto do product que está no array filtered_products

        //::: method sort escrito da maneira mais longa
        /* tempProducts = tempProducts.sort((a, b) => {
            if(a.price < b.price) {
              return -1
            } 
            if(a.price > b.price) {
              return 1
            }
            return 0
        });  */
    }
    if(sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
      if(sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name)//::::ver javscript method >> localeCompare()
        });
    }
    if(sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name) //:: o name é uma prop do objecto do product que está no array filtered_products
      });
    }

     return { ...state, filtered_products: tempProducts } 
   }

   if( action.type === UPDATE_FILTERS ) {
      const { name, value } = action.payload;
                            //::exemplo: filters: {category: office} >> [name] é o valor name="category" dos buttons ou name="color"
      return { 
        ...state, 
        filters: {
          ...state.filters, 
          [name]: value //:::: o [name]:value é com [] para ser dinâmico > vem como category: 'all' se for o name='category' no input (ver dynamic properties)
          //::: ou 'color': '#8fh8r6', [name] = value
        } 
      } 
   }

   if(action.type === FILTER_PRODUCTS) {
      const { all_products } = state;
      const {text, category, company, color, price, shipping } = state.filters;

      let tempProducts = [...all_products];

      //:::: TEXT >> filter all the products that starts with whatever we right in the input text
      if(text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text) //::: explicit return
        })
      }
      //:::: CATEGORY
      if(category !== 'all') {
          tempProducts = tempProducts.filter((product) => product.category === category) //::: implicit return (não preciso de colocar a palavra return)
      }

      //:::: COMPANY
      if(company !== 'all') {
        tempProducts = tempProducts.filter((product) => product.company === company) //::: implicit return
      }

      //:::: COLOR
      if(color !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((c) => c === color) //::: tenho que fazer um find porque as colors é um array (ou seja, procura a cor dentro do array)
        })
      }

      //:::: PRICE
      tempProducts = tempProducts.filter((product) => product.price <= price)

      //:::: SHIPPING
      if(shipping) {
        tempProducts = tempProducts.filter((product) => product.shipping === true) //::: procura nos tempProducts os product que tiverem a propriedade 'shipping' como true
      }

    
    return { ...state, filtered_products: tempProducts};
   }

   if(action.type === CLEAR_FILTERS) {
      return {
        //::: aqui estou a carregar o state actual todo
        ...state,  
        filters: {
          //::: estou a carregar o state dos filters actual e depois faço overwriting aos que quero mudar 
          ...state.filters,
          //::: e aqui actualizo os que quero e no do price vou buscar o state do max_price
          text:'',
          company:'all',
          category:'all',
          color:'all',
          price: state.filters.max_price,
          shipping: false,
        }
      }
   }
 
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
