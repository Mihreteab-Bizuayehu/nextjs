export type OrderItems = {
    name: string;
    image: string;
    quantity: number;
    slug: string;
    price: number;
    color: string;
  size: string;
  };
  export type Cart = {
    items: OrderItems[];
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
  };