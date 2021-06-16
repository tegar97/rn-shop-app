class Order {
    id : number | string
    items : any
    totalAmount : number
    date : string
    constructor(id :  number | string ,items :any ,totalAmount : number,date : string) {
        this.id = id;
        this.items = items;
        this.totalAmount  = totalAmount;
        this.date = date;
    }
}

export default Order