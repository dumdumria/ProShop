import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk}  from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducers, productDetailsReducers } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
                          JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
        cart : {cartItems: cartItemsFromStorage}
}
const middleware = [thunk]

const store = createStore(reducer, initialState,  composeWithDevTools(
  applyMiddleware(...middleware)
));


export default store


// import { configureStore } from '@reduxjs/toolkit';
// import {thunk} from 'redux-thunk';
// import { productListReducers } from './reducers/productReducers';

// const store = configureStore({
//     reducer: {
//         productList: productListReducers, // No need for combineReducers()
//     },

    
// });
// store.subscribe(() => {
//     console.log("Redux State Updated:", store.getState());
//   });


// export default store;
