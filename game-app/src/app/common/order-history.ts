export interface Address {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
}

export interface Customer {
    address: Address;
    email: string;
    name: string;
    phone: string;
    tax_exempt: string;
    tax_ids: string[];
}


export interface OrderHistory {
    _id: string;
    orderId: string;
    customer: Customer;
    total: string;
    currency: string;
}
