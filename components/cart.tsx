"use client"
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state";
import { CartItems, DELETE_FROM_CART, TOGGLE_CART } from "@/state/cartSlice";
import Image from "next/image";


export default function Cart () {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const isOpen = useSelector((state: RootState) => state.cart.isOpen);
    const dispatch = useDispatch();

    function toggleCart () {
        dispatch(TOGGLE_CART())
    }

    return (
        <div id="cart" className={`${isOpen ? "slide-in-right" : "slide-out-right"} bg-gray-950 flex flex-col gap-4 fixed z-[99] top-0 bottom-0 w-[250px] md:w-[300px] lg:w-[400px] overflow-y-auto`}>
            <div className="flex justify-between items-center mt-2 mx-2">
                <button onClick={toggleCart} className="z-50 w-9 h-9 rounded-full hover:bg-gray-900 flex justify-center items-center">
                    <AiOutlineClose className="text-white text-2xl" />
                </button>
            </div>
            <div className="mt-2 ml-2 flex flex-col gap-4">
                {
                    cartItems.length > 0 ? (
                        <>
                        {cartItems.map((product: CartItems, index: number) => {
                            const prodQuantity = cartItems.find((item) => item.product.id === product.product.id)?.quantity || 0;
                            return(
                                <div key={`${product.product.title}-${index}`} className="px-2 flex justify-between items-start gap-4">
                                    <div className="w-16">
                                        <Image width={64} height={64} className="w-full aspect-square object-contain" src={product.product.image} alt={product.product.image} />
                                    </div>
                                    <div className="flex-1 text-white">
                                        <p className="text-sm text-right font-medium">
                                            {
                                                product.product.title.length > 20 ? product.product.title.slice(0, 20) + "..." : product.product.title 
                                            }
                                        </p>
                                        <p className="text-[0.75rem] text-right">Quantity: {prodQuantity}</p>
                                        <p className="text-lg text-right">${(prodQuantity * product.product.price).toFixed(2)}</p>
                                    </div>
                                    <AiOutlineClose onClick={() => dispatch(DELETE_FROM_CART(product))} className="text-lg text-white hover:text-red-500 cursor-pointer" />
                                </div>
                        )})}
                        <button className="mt-4 w-full bg-blue-500 py-4  text-white font-medium rounded ">
                            Checkout: {cartItems.reduce((total: number, item: CartItems) => total + item.quantity * item.product.price, 0).toFixed(2)}
                        </button>
                        </>
                    ) 
                    : (
                        <div className="absolute inset-0 flex flex-col justify-center items-center">
                            <p className="text-lg text-white">Your cart is empty</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};