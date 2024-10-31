import { OrderAddress, OrderItem, Size } from "@prisma/client";

export interface OrderType {
  OrderItem: {
    id?: string;          // Hacemos que estos campos sean opcionales
    orderId?: string;
    productId?: string;
    quantity: number;
    price: number;
    size: Size;
    product: {
      title: string;
      slug: string;
      ProductImage: { url: string }[];
    };
  }[];
  OrderAddress: {
    id: string;
    orderId: string;
    firstName: string;
    lastName: string;
    address: string;
    address2?: string | null;
    city: string;
    postalCode: string;
    countryId: string;
  } | null;
}