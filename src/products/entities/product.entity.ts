// This file defines the Product entity used in the ProductsModule 
export class Product {
    id: number; 
    name: string; 
    price: number; 
    description: string;
    discountedPrice?: number; // Optional field for Black Friday discount
    imgeUrl?: string;
}
