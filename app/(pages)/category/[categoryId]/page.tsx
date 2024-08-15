import { Metadata } from 'next';
import { ProductType } from '@/types';
import { getProductsByCategory } from '@/lib/products';
import ProductsGrid from '@/components/productsGrid';


export default async function CategoryPage({ params }: { params: { categoryId: string } }) {
    const { products, categoryTitle, categoryDescription, notFound } = await fetchCategoryData(params.categoryId);

    if (notFound) {
        return (
            <div className='fixed inset-0 flex flex-col items-center justify-center gap-4'>
                <h1 className='text-2xl font-semibold'>404 - Category Not Found</h1>
                <p>The category you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <main className='mt-20 px-[6%]'>
            <h2 className="text-2xl text-black font-medium capitalize">{categoryTitle}</h2>
            <p className="text-md text-gray-700">{categoryDescription}</p>
            <ProductsGrid products={products} />
        </main>
    );
}


async function fetchCategoryData(categoryId: string) {
    const products = await getProductsByCategory(categoryId);
    const sortedProducts = products.sort((a:ProductType, b: ProductType) => (b.rating?.rate || 0) - (a.rating?.rate || 0));

    const fetchCategories = await fetch('https://fakestoreapi.com/products/categories');
    const categories: string[] = await fetchCategories.json();
    const categoryData = categories.find((category) => category.split(' ').join('%20') === categoryId);

    if (!categoryData) {
        return { notFound: true };
    }

    return {
        products: sortedProducts,
        categoryTitle: categoryData,
        categoryDescription: `Explore top-quality ${categoryData} items for every need and style.`,
        notFound: false
    };
}

export async function generateMetadata({ params }: { params: { categoryId: string } }): Promise<Metadata> {
    const { categoryId } = params;
    const fetchCategories = await fetch('https://fakestoreapi.com/products/categories');
    const categories: string[] = await fetchCategories.json();
    const categoryData = categories.find((category) => category.split(' ').join('%20') === categoryId);

    if (!categoryData) {
        return {
            title: 'Category Not Found | Fake Shop',
            description: 'The category you are looking for does not exist.'
        };
    }

    return {
        title: `${categoryData.toUpperCase()} | Fake Shop`,
        description: `Explore top-quality ${categoryData} items for every need and style.`
    };
}