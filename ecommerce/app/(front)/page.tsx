import ProductItem from "@/components/products/ProductItem";
import data from "@/lib/data";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-medium mt-4 py-2">Latest Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data.products.map((product)=><ProductItem key={product.slug} product={product}/>)}
      </div>
      
    </>
  );
}
