import type { Metadata } from "next";
import { ProductType } from "@/types";
import {  getProductsByCategory } from "@/lib/products";
import ProductsGrid from "@/components/productsGrid";

type MetaProps = {
    params: { categoryId: string }
  }
  
export async function generateMetadata(
    { params }: MetaProps,
  ): Promise<Metadata> {


    const { categoryId } = params;
   
    const fetchCategories = await fetch("https://fakestoreapi.com/products/categories");
	const categories = await fetchCategories.json();
    const categoryData = categories.find((category: string) => category.split(' ').join("%20") === categoryId);
   
    return {
      title: `${categoryData.toUpperCase()} | Fake Shop`,
      description: `Explore top-quality ${categoryData} items for every need and style.`
    }
  }

export async function getStaticPaths(): Promise<{
    paths?: string[];
    fallback: boolean;
}> {
    const fetchCategories = await fetch("https://fakestoreapi.com/products/categories");
	const categories = await fetchCategories.json();
    const allPaths = categories.map((category: string) => {
        return {
            params: {
                categoryId: category.split(' ').join("%20")
            }
        }
    })


    return {
        paths: allPaths,
        fallback: false
    }
}


const CategoryPage = async ({ params }: {params: { categoryId: string }}) => {
	const { categoryId } = params;
    const products: ProductType[] = await getProductsByCategory(categoryId as string);
	const sortedProducts: ProductType[] = products.sort((a, b) => b.rating?.rate - a.rating?.rate);

	return (
		<main className='mt-20 px-[6%]'>
			<h2 className="text-2xl text-black font-medium capitalize">{products[0].category}</h2>
			<ProductsGrid products={sortedProducts} />
		</main>
	);
};

export default CategoryPage;