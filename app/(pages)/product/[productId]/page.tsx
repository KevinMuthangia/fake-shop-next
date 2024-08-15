import { Metadata } from 'next';
import ProductDetails from '@/components/productDetails';

interface ProductPageProps {
    params: { productId: string };
}


async function fetchProductData(productId: string) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
            return { notFound: true };
        }

        const product = await response.json();
        return { product, notFound: false };
    } catch (error) {
        console.error('Error fetching product data:', error);
        return { notFound: true };
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { productId } = params;
    const { product, notFound } = await fetchProductData(productId);

    if (notFound) {
        return (
            <div className='fixed inset-0 flex flex-col items-center justify-center gap-4'>
                <h1 className='text-2xl font-semibold'>404 - Product Not Found</h1>
                <p>The product you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <main className='mt-20 px-[6%]'>
            <ProductDetails product={product} />
        </main>
    );
}


export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { productId } = params;
    const { product, notFound } = await fetchProductData(productId);

    if (notFound) {
        return {
            title: 'Product Not Found | Fake Shop',
            description: 'The product you are looking for does not exist.'
        };
    }

    const productTitle = product.title.length > 15 ? product.title.slice(0, 15) + '...' : product.title;

    return {
        title: `${productTitle} | Fake Shop`,
        description: `Discover detailed specs, features, and reviews of ${product.title} here.`
    };
}
