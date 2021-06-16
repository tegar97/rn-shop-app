export const ADD_ORDER = 'ADD_ORDER'

export const addOrder = (CartItems :any,totalAmount :any) => {
    return {
        type: ADD_ORDER,
        orderData : {items : CartItems,amount : totalAmount}
    }
}