export interface ProductData {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    category: { id: string; title: string; }
}