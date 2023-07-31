import { CartItem } from "./cart-item";

export class OrderItem {
    quantity: number;
    productId: string;
    title: string;
    description: string;
    pgRating: string;
    price: number;
    imageUrl: string;

    constructor (cartItem: CartItem) {
        this.quantity = cartItem.quantity;
        this.productId = cartItem._id;
        this.title = cartItem.title;
        this.description = cartItem.description;
        this.pgRating = cartItem.pgRating;
        this.price = cartItem.price;
        this.imageUrl = cartItem.imageUrl;
    }
}
