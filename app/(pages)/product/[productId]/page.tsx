import { Metadata } from "next";
import { ProductType } from "@/types";
import { getAllProducts } from '@/lib/products';
import ProductDetails from "@/components/productDetails";

interface MetaProps {
    params: { productId: string }
}


export async function generateMetadata(
    { params }: MetaProps,
  ): Promise<Metadata> {


    const { productId } = params;
   
    const fetchProduct = await fetch(`https://fakestoreapi.com/products/${productId}`);
	const product = await fetchProduct.json();
    const productTitle = product.title.length > 15 ? product.title.slice(0, 15) + '...' : product.title;
   
    return {
      title: `${productTitle} | Fake Shop`,
      description: `Discover detailed specs, features, and reviews of ${product.title} here`
    }
  }

export async function getStaticPaths(): Promise<{
    paths?: string[];
    fallback: boolean;
}> {
	const products = await getAllProducts();

    const allPaths = products.map((product: ProductType) => {
        return `/product/${product.id}`
    })

    return {
        paths: allPaths,
        fallback: false
    }
} 

const ProductPage = async () =>  {
	const products = await getAllProducts();

	return (
		<main className='mt-20 px-[6%]'>
			<ProductDetails products={products} />
		</main>
	);
};

export default ProductPage