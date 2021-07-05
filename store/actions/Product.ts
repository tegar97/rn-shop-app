import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCT = 'SET_PRODUCT'
export const deleteProduct = (productId:any) => {
    return {type: DELETE_PRODUCT,pid : productId}
};


export const fetchProducts = () => {
    return async (dispatch :any) => {
        const response = await fetch('https://rn-shop-app-3e7b5-default-rtdb.asia-southeast1.firebasedatabase.app/products.json');
        const resData = await response.json();

        const loadedProducts = [];

        for(const key in resData) {
            loadedProducts.push(new Product(key,'u1',resData[key].title,resData[key].imageUrl,resData[key].description,resData[key].price ))
        }
        dispatch({type:SET_PRODUCT,products: loadedProducts })
    }
}
export const createProduct = (title: string,description : string,imageUrl : string,price : number) => {
    return async (dispatch :any) => {

       const response =  await fetch('https://rn-shop-app-3e7b5-default-rtdb.asia-southeast1.firebasedatabase.app/products.json',{
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        })

        const resData  = await response.json();

        console.log(resData)
        dispatch({
            type : CREATE_PRODUCT,
            productData : {
                title,
                description,
                imageUrl,
                price
            }
        });

    }
}
export const updateProduct = (id : string,title: string,description : string,imageUrl : string) => {
    return {
        type : UPDATE_PRODUCT,
        pid : id,
        productData : {
            title,
            description,
            imageUrl,
        }
    }
}


