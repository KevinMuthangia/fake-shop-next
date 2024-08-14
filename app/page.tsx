import type { Metadata } from "next";
import { ProductType } from "@/types";
import { getAllProducts } from "@/lib/products";
import ProductsGrid from "@/components/productsGrid";

export const metadata: Metadata = {
    title: "HOME | Fake Shop ",
    description: "Shop top trends and must-haves across all categories—discover more!",
};


const HomePage = async () =>  {
	const products: ProductType[] = await getAllProducts();

	const sortedProducts: ProductType[] = products.sort((a, b) => b.rating?.rate - a.rating?.rate);

	return (
		<main className='mt-20 px-[6%]'>
			<h2 className="text-2xl text-black font-medium">Shop</h2>
			<ProductsGrid products={sortedProducts} />
		</main>
	);
};

export default HomePage;