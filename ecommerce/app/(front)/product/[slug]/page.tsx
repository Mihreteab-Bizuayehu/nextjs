import Image from 'next/image';
import data from '@/lib/data';
import Link from 'next/link';
import AddToCart from '@/components/products/AddToCart';

function ProductDetails({ params }: { params: { slug: string } }) {
  const product = data.products.find((item) => item.slug === params.slug);
  if (!product) {
    return <div>Product Not Found!</div>;
  }
  return (
    <>
      <div className="my-2">
        <Link
          href="/"
          className=" btn btn-ghost rounded-btn bg-blue-500 text-white"
        >
          Back to Home
        </Link>
      </div>

      <div className="grid md:grid-cols-3 md:gap-2">
        <div className="md:col-span-2">
          <Image
            src={product?.image}
            alt={product?.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>

        <div>
          <ul className="space-y-4">
            <li>
              <h2 className="text-xl">{product.name}</h2>
            </li>
            <li>
              {product.rating} of {product.numReviews} Reviews
            </li>
            <li>{product.brand}</li>
            <div className="divider"></div>
            <li>
              Descriptions:<p>{product.description}</p>
            </li>
                  </ul>
                  
            <div className="card bg-base-300 my-4 shadow-xl ">
              <div className="card-body ">
                <div className="flex justify-between mb-2">
                  <div>Price</div>
                  <div>{product.price}</div>
                </div>
                <div className="flex justify-between mb-2">
                  <div>Status</div>
                  <div>
                    {product.countInStock > 0 ? (
                      <p>{product.countInStock}</p>
                    ) : (
                      <p className="text-red-500 text-xl">
                        Product is not available in stock!
                      </p>
                    )}
                  </div>
                </div>
              {product.countInStock > 0 && (
                  <div className="card-actions justify-center">
                  <AddToCart item={{ ...product, quantity: 0 ,size:"",color:""}} />
                </div>)}
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
