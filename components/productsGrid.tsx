import { ProductType } from "@/types";
import ProductCard from "./productCard";


interface ProductsGridProps {
    products: ProductType[]
}

export default function ProductsGrid ({ products }:ProductsGridProps) {
    return (
        <div className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8">
            {
                products.length > 0 && products.map((product: ProductType, index: number) => (
                    <ProductCard key={`${product.title}-${index}`} product={product} />
                ))
            }
        </div>
    )
}