"use client"
import Link from 'next/link';
import Image from 'next/image';
import { ProductType } from "@/types";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "@/state/cartSlice";

interface ProductCardProps {
    product: ProductType
}

export default function ProductCard({ product }: ProductCardProps) {
    const dispatch = useDispatch();

    function addToCart() {
        dispatch(ADD_TO_CART({ product, quantity: 1 }));
    }

    const ratingsArray = Array(5).fill(0);

    return (
        <div className="grid grid-rows-1 gap-2 p-6 border border-slate-200 bg-white ease-in duration-200">
            <Link href={`/product/${product.id}`}>
                <div className="flex justify-center items-center">
                    <Image src={product.image} alt={product.title} width={300} height={300} className="w-4/5 aspect-square object-contain" />
                </div>
            </Link>
            <Link href={`/product/${product.id}`} className="hover:underline text-lg font-medium">{product.title}</Link>
            <div className="flex justify-between items-center">
                <div className="flex">
                    {
                        ratingsArray.map((_, index: number) => (
                            index < Math.round(product.rating.rate) ? <FaStar key={index} className="text-yellow-500" /> : <FaRegStar key={index} />
                        ))
                    }
                </div>
                <p className="text-sm text-gray-500">{product.rating.count} reviews</p>
            </div>
            <button onClick={addToCart} className="mt-4 py-2 bg-blue-500 hover:bg-blue-600 text-white duration-200 ease-in">Add to Cart</button>
        </div>
    )
};