export const DELETE_PRODUCT = 'DELETE_PRODUCT'

export const deleteProduct = (productId:any) => {
    return {type: DELETE_PRODUCT,pid : productId}
};


