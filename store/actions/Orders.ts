export const ADD_ORDER = 'ADD_ORDER'

export const addOrder = (CartItems :any,totalAmount :any) => {

    return async (dispatch :any) => {
        const date = new Date()
        const response =  await fetch('https://rn-shop-app-3e7b5-default-rtdb.asia-southeast1.firebasedatabase.app/ui.json',{
             method : 'POST',
             headers: {
                 'Content-Type' : 'application/json'
             },
             body: JSON.stringify({
                CartItems,
                totalAmount,
                date: date.toISOString(),
             })
         })
 
         if(!response.ok) {
             throw new Error('Somentinh went wrong!')
         }
         const resData  = await response.json();

 
         dispatch({
            type: ADD_ORDER,
            orderData : {id: resData.name,items : CartItems,amount : totalAmount,date: date}
         });
 
     }

   
}