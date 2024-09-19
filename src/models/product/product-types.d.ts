export interface Product {
  _id?: any;
  name: string;
  description: string;
  brand: string;
  price: string;
  link: string;
  variants: [];
  owner?: {
    userId: any;
  };
  createdAt?: any;
}
