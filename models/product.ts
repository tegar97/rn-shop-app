class Product {
    id : number;
    ownerId : number;
    title : string;
    imageUrl : string;
    description : string;
    price : number
    constructor(id : number,ownerId : number ,title : string ,imageUrl : string ,description : string ,price  : number) {
        this.id = id;
        this.ownerId = ownerId
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price

    }
}


export default Product