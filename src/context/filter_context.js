import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text:'',
    company:'all',
    category:'all',
    color:'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {

  //:::: vai buscar o array products dentro do products_context.js
  const {products} = useProductsContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => { 
    dispatch({type: LOAD_PRODUCTS, payload: products});
  },[products])

  //:::: sempre que o state de products (vindo do useProductContext), state.sort e state.filters muda corre o useEffect e dispatch SORT PRODUCTS
  useEffect(() => {
      dispatch({type: FILTER_PRODUCTS})
      dispatch({type: SORT_PRODUCTS})
  }, [products, state.sort, state.filters])

  const setGridView = (e) => {
    //:: outra maniera d efazer era um toggleView e apanhava o valar de um attribuet edata-view por exemplo
     //console.log(e.currentTarget.getAttribute('data-view'));
    dispatch({type: SET_GRIDVIEW})
  }

  const setListView = () => {
    dispatch({type: SET_LISTVIEW})
  }

  const updateSort = (e) => {
    // for demonstration
    //const name = e.target.name; //:::: É o name dos input select dentro do Sort component
    //:::: vem do event target, neste caso o value do <option> do <select> input
    const value = e.target.value; //:::: É o value dos input select dentro do Sort component
    dispatch({type: UPDATE_SORT, payload: value})
  }

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    //::: é necessário fazer isto por causa do caps lock
    if(name === 'text') {
      value = e.target.value.toLowerCase();
    }
    //::: é necessário fazer isto porque nos buttons não existe e.target.value, só nos inputs
    if(name === 'category') {
      value = e.target.textContent;
    }
    //::: é necessário fazer para acedermos ao data-color atribute nos buttons das colors
    if(name === 'color') {
      value = e.target.getAttribute('data-color');
      //ou >>>> value = e.target.dataset.color;
    }
    //::: é necessário fazer para acedermos ao Number que vem em string
    if(name === 'price') {
      value = Number(value);
    }

    //::: é necessário fazer para acedermos valor do checkbos
    if(name === 'shipping') {
      value = e.target.checked
    }

    dispatch({type: UPDATE_FILTERS, payload: { name, value }})
    
  }

  const clearFilters = () => {
    dispatch({type: CLEAR_FILTERS})
  }

  return (
    <FilterContext.Provider value={{ ...state, setGridView, setListView, updateSort, updateFilters, clearFilters }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
