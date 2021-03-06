import CartItem from '../../models/cart-model';
import { ADD_ORDER } from '../actions/Orders';
import { DELETE_PRODUCT } from '../actions/Product';
import { ADD_TO_CART, REMOVE_FROM_CART } from './../actions/Cart';
const initialState = {
    items : {},
    totalAmount : 0
}

export default (state :any = initialState , action :any) => {
    switch(action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            let updatedOrNewCartItem;

            if(state.items[addedProduct.id]) {
                // already have the item in the cart

                 updatedOrNewCartItem = new CartItem(state.items[addedProduct.id].quantity  + 1,prodPrice,prodTitle,state.items[addedProduct.id].sum + prodPrice)
            }else{
                 updatedOrNewCartItem = new CartItem(1,prodPrice,prodTitle,prodPrice)
                
            
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice
            }
        case  REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid]
            const currentQty = selectedCartItem.quantity;
            let updateCartItems;
            if(currentQty > 1) {
                // need to reduce it not erase it

                const updateCartItem = new CartItem(selectedCartItem.quantity - 1,selectedCartItem.productPrice,selectedCartItem.productTitle,selectedCartItem.sum - selectedCartItem.productPrice)
                updateCartItems = {...state.items,[action.pid]: updateCartItem}
            }else{
                updateCartItems = {...state.items};
                delete updateCartItems[action.pid];
            }

            return {
                 ...state,
                items : updateCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            }
        case DELETE_PRODUCT:
            if(!state.items[action.pid]){
                return state
            }
            const updateItems = {...state.items};
            const itemTotal = state.items[action.pid].sum
            delete updateItems[action.pid]
            return  {
                ...state,
                items :  updateItems,
                totalAmount : state.totalAmount - itemTotal
            }

        case ADD_ORDER:
            return initialState



    }

    return state;
}