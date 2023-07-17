export interface Cart {
    items: Array<CartItem>;
}

export interface CartItem {

    id: string;
    title: string;
    description: string;
    pgRating: string;
    price: number;
    imageUrl: string;
}


