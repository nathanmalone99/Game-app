import { Game } from "./game";

export class Cart  {
   items!: Array<CartItem>
}

export class CartItem {
   
    quantity: number;
    _id: string;
    title: string;
    description: string;
    pgRating: string;
    price: number;
    imageUrl: string;

    constructor (game: Game) {
        this._id = game._id;
        this.title = game.title;
        this.description = game.description;
        this.pgRating = game.pgRating;
        this.price = game.price;
        this.imageUrl = game.imageUrl;

        this.quantity = 1;
    }
}


