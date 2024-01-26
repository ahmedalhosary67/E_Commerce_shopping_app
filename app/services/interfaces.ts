export interface CatalogTypes {
  id: number;
  name: string;
  img: any;
}
export interface ProductTypes {
  id: number;
  catalogId: number;
  title: string;
  description: string;
  image: string;
  price: number;
  type: string;
  amount: number;
}
