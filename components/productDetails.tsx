"use client"
import { ADD_TO_CART, REMOVE_FROM_CART } from "@/state/cartSlice";
import { ProductType } from "@/types";
import { FaRegStar, FaStar } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state";
import Image from 'next/image';
import { useParams } from "next/navigation";

interface ProductDetailsProps {
    products: ProductType[]
}

const ProductDetails = ({ products }: ProductDetailsProps) => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems)
	const dispatch = useDispatch();

	const { productId } = useParams();
	const product: ProductType = products.find((product: ProductType) => product.id === Number(productId))!;
	
    function addToCart() {
        dispatch(ADD_TO_CART({ product, quantity: 1 }));
    }

	const prodQuantity = cartItems.find((item) => item.product.id === product.id)?.quantity || 0;
	
	function removeFromCart() {
		dispatch(REMOVE_FROM_CART({ product, quantity: prodQuantity }));
	}

	const ratingsArray = Array(5).fill(0);

	return (
        <div className="py-12 grid grid-cols-1 lg:grid-cols-2">
            <div className="flex justify-center items-center p-8">
                <Image src={product.image} alt={product.title} width={500} height={500} className="w-full sm:w-[80%] aspect-square object-contain" />
            </div>
            <div className="flex flex-col">
                <h2 className="text-3xl font-bold">{product.title}</h2>
                <p className="mt-6 text-lg">{product.description}</p>
                <div className="my-4 flex items-center gap-2">
                    <div className="flex">
                        {
                            ratingsArray.map((_, index: number) => (
                                index < Math.round(product.rating?.rate) ? <FaStar key={index} className="text-yellow-500" /> : <FaRegStar key={index} />
                            ))
                        }
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{product.rating?.rate} · {product.rating?.count} reviews</p>
                </div>
                <h3 className="mb-4 text-4xl font-medium">$ {product.price?.toFixed(2)}</h3>
                <div className="mt-2 flex flex-col md:flex-row md:items-center gap-4 md:h-14">
                    <div className="flex justify-between items-center gap-2 bg-gray-100 py-4 px-6 w-full md:w-1/2 h-full rounded">
                        <AiOutlinePlus onClick={addToCart} className="text-xl text-blue-500 active:scale-[.5] duration-200 ease-in cursor-pointer" />
                        <p className="text-lg select-none">{prodQuantity}</p>
                        <AiOutlineMinus onClick={removeFromCart} className="text-xl  text-blue-500 active:scale-[.5] duration-200 ease-in cursor-pointer" />
                    </div>
                    <button onClick={addToCart} className="w-full md:w-1/2 h-full bg-blue-500 py-4  text-white font-medium rounded active:scale-95 duration-200 ease-in">Add to Cart</button>
                </div>
            </div>
        </div>
	);;
};

export default ProductDetails