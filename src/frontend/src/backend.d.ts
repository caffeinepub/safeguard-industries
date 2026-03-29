import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface SafetyArticle {
    id: bigint;
    title: string;
    content: string;
    publishedDate: bigint;
    summary: string;
    category: string;
}
export interface Product {
    id: bigint;
    inStock: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: number;
}
export interface Testimonial {
    id: bigint;
    customerName: string;
    review: string;
    company: string;
    avatarUrl: string;
    rating: bigint;
}
export interface backendInterface {
    addToCart(sessionId: string, productId: bigint, quantity: bigint): Promise<boolean>;
    clearCart(sessionId: string): Promise<boolean>;
    getAllArticles(): Promise<Array<SafetyArticle>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getCart(sessionId: string): Promise<Array<CartItem>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    removeFromCart(sessionId: string, productId: bigint): Promise<boolean>;
    seedData(): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<boolean>;
}
