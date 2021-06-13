import { ADD_TO_CART } from './../actions/Cart';
const initialState = {
    items : {},
    totalAmount : 0
}

export default (state = initialState , action :any) => {
    switch(action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
    }
    return state;
}