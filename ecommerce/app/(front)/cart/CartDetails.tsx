'use client';

import { useCartService } from '@/lib/hooks/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CartDetails = () => {
  const { items, itemsPrice, increase, decrease } = useCartService();
  const [mount, setMount] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return <></>;

  return (
    <>
      <h1 className="text-2xl font-medium mt-4 py-2">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="flex flex-col items-center mt-5">
          <button
            className="btn btn-ghost rounded-btn text-xl"
            onClick={() => router.push('/')}
          >
            Go to Shop
          </button>
          <h3 className="text-2xl my-3">Cart is empty! </h3>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5  gap-4">
          <div className=" overflow-x-auto md:col-span-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.slug}>
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="object-cover h-12 w-12"
                        />
                        <div className="ml-2">{item.name}</div>
                      </Link>
                    </td>

                    <td>
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="btn btn-ghost font-medium text-lg"
                          onClick={() => decrease(item)}
                        >
                          -
                        </button>
                        <span className=" px-2 py-1 font-medium text-lg">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className=" btn btn-ghost font-medium text-lg"
                          onClick={() => increase(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <div className="card bg-base-300 ">
              <div className="card-body gap-5">
                <div className="flex justify-between ">
                  <div className="text-lg font-medium">
                    Sub-Total({items.reduce((a, i) => a + i.quantity, 0)})
                  </div>
                  <div className="text-lg font-medium ">${itemsPrice}</div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary rounded-btn w-full text-xl"
                  onClick={() => router.push('/checkout')}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDetails;
