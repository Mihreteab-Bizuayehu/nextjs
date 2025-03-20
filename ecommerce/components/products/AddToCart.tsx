'use client'
import { useCartService } from "@/lib/hooks/useCartStore"
import { OrderItems } from "@/lib/models/OrderModel"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
const AddToCart = ({ item }: { item: OrderItems }) => {
    const router=useRouter()
    const { items, increase,decrease } = useCartService();
    const[existingItem, setExistingItem]=useState<OrderItems | undefined>();
    useEffect(() => {
        setExistingItem(items.find((i) => i.slug === item.slug));
    }, [item, items])

    const addToCartHandler = () => {
        increase(item);
    }

    return existingItem ? (
      <div className="flex items-center">
        <button
          type="button"
          className="btn btn-ghost font-bold text-2xl"
          onClick={() => decrease(existingItem)}
        >
          -
        </button>
        <span className=" px-2 py-1 font-bold text-2xl">
          {existingItem.quantity}
        </span>
        <button
          type="button"
          className=" btn btn-ghost font-bold text-2xl"
          onClick={() => increase(existingItem)}
        >
          +
        </button>
      </div>
    ) : (
      <button className=" btn btn-primary w-full" onClick={addToCartHandler}>
        Add to Cart
      </button>
    );
}

export default AddToCart