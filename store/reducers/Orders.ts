import Order from "../../models/order"
import { ADD_ORDER } from "../actions/Orders"

const initialState = {
    orders : []
}

export default (state :any = initialState,action :any) => {
    switch(action.type) {
        case ADD_ORDER :
            const newOrder = new Order(new Date().toString(),action.orderData.items,action.orderData.amount,new Date().toISOString())
            return {
                ...state,
                orders :   state.orders.concat(newOrder) 
            }
    }
    return state
}