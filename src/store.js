import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk}  from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { 
    productListReducers,
    productDetailsReducers,
    productDeleteReducers,
    productCreateReducers, 
    productUpdateReducers,
    } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'
import { 
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer, 
    orderListMyReducer,
    orderDeliverReducer, 
    orderListReducer,
} from './reducers/orderReducers'
import { 
    userLoginReducer,
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer, 
    userListReducer,
    userDeleteReducer, 
    userUpdateReducer,
} from './reducers/userReducer'



const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    productCreate: productCreateReducers,
    productDelete: productDeleteReducers,
    productUpdate: productUpdateReducers,

    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderDeliver: orderDeliverReducer,
    orderList: orderListReducer,
    
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []


const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null
                          
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : { }
                          

const initialState = {
        cart : {
            cartItems: cartItemsFromStorage,
            shippingAddress: shippingAddressFromStorage,
        },
        userLogin: {userInfo: userInfoFromStorage}
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
