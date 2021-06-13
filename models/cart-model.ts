
class CartItem {
    quantity : number ;
    productPrice : string;
    productTitle : string;
    sum : string;
   
    constructor(quantity :number ,productPrice :string,productTitle : string,sum : string) {
        this.quantity = quantity
        this.productPrice = productPrice
        this.productTitle = productTitle
        this.sum = sum

    }
}

export default CartItem