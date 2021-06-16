
class CartItem {
    quantity : number ;
    productPrice : string;
    productTitle : string;
    sum : number;
   
    constructor(quantity :number ,productPrice :string,productTitle : string,sum : number) {
        this.quantity = quantity
        this.productPrice = productPrice
        this.productTitle = productTitle
        this.sum = sum

    }
}

export default CartItem