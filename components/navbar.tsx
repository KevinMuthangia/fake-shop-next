"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { categories } from "@/constants";
import { AiOutlineClose, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state";
import { TOGGLE_CART } from "@/state/cartSlice";



export default function Navbar() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
    const [search, setSearch] = useState('');

    const toggleSearch = () =>{ 
        setIsSearchVisible(!isSearchVisible)
        setSearch("")
    };

    function toggleMobileNav() {   
        setIsMobileNavVisible(!isMobileNavVisible)
    }

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    };
    function toggleCart() {
        dispatch(TOGGLE_CART())
    }

    useEffect(() => {
        const mobileNav = document.getElementById('mobileNav');
        if(isMobileNavVisible) {
            mobileNav?.classList.add('slide-in-right');
            mobileNav?.classList.remove('slide-out-right');
        } else {
            mobileNav?.classList.add('slide-out-right');
            mobileNav?.classList.remove('slide-in-right');
        }

    }, [isMobileNavVisible]);


    return (
        <nav className="z-40 fixed top-0 left-0 right-0 px-[6%] h-16 flex justify-between items-center gap-4 bg-gray-800 text-white">
            <Link href="/"><h3 className="text-xl md:text-2xl font-medium">FAKE SHOP</h3></Link> 
            {/* ---------DESKTOP NAV--------- */}
            {
                !isSearchVisible ? (
                    <ul className="hidden lg:flex gap-4">
                        {
                            categories.map((category: string, index: number) => (
                                <li key={`${category}-${index}`} className="font-medium text-lg" >
                                <Link className="py-2 px-4 hover:bg-gray-900 rounded-full ease-in duration-200 capitalize" href={`/category/${category}`}>{category.includes('clothing') ? category.slice(0, -11) : category }</Link>
                                </li>
                            ))
                        }
                    </ul>
                ) : (
                    <div className="relative flex items-center gap-4 min-w-[400px] py-2 px-6 rounded-full bg-gray-900">
                        <AiOutlineSearch className="text-xl" />
                        <input 
                        className="bg-transparent text-white flex-1 mr-3 outline-none"
                        placeholder="What are you looking for?" 
                        name="search"
                        onChange={handleSearch}
                        value={search}
                        />
                        <button onClick={toggleSearch} className="absolute right-1 w-9 h-9 rounded-full hover:bg-gray-800 flex justify-center items-center">
                            <AiOutlineClose className="text-xl" />
                        </button>
                    </div>
                )
            }
           
            <div className="flex gap-2 sm:gap-4">
                <button onClick={toggleSearch} className="w-9 h-9 rounded-full hover:bg-gray-900 hidden lg:flex justify-center items-center">
                    <AiOutlineSearch className="text-xl" />
                </button>
                <button className="w-9 h-9 rounded-full hover:bg-gray-900 hidden lg:flex justify-center items-center">
                    <AiOutlineUser className="text-xl" />
                </button>
                <button onClick={toggleCart} className="relative w-9 h-9 rounded-full hover:bg-gray-900 flex justify-center items-center">
                    <IoCartOutline className="text-xl" />
                    {
                        cartItems.length > 0 && <div className="absolute w-5 h-5 rounded-full -top-1 -right-1 bg-blue-500 text-white text-sm font-medium">{cartItems.length}</div>
                    }
                </button>
                <button onClick={toggleMobileNav} className="w-9 h-9 rounded-full hover:bg-gray-900 flex lg:hidden justify-center items-center">
                    <RxHamburgerMenu className="text-xl"/>
                </button>
            </div>

            {/* MOBILE NAV */}

            <div id="mobileNav" className={`${isMobileNavVisible ? 'slide-in-right': 'slide-out-right'} bg-gray-950 lg:hidden flex flex-col gap-4 fixed z-50 top-0 bottom-0 w-[250px] md:w-[300px]`}>
                <div className="flex justify-between items-center mt-2 mx-2">
                    <button onClick={toggleMobileNav} className="w-9 h-9 rounded-full hover:bg-gray-900 flex justify-center items-center">
                        <AiOutlineClose className="text-white text-2xl" />
                    </button>
                    <button className="w-9 h-9 rounded-full hover:bg-gray-900 flex justify-center items-center">
                        <AiOutlineUser className="text-xl" />
                    </button>
                </div>
                <div className="flex bg-gray-900 mx-4 rounded">
                    <input 
                            className="py-2 px-2 bg-transparent text-white flex-1 rounded outline-none"
                            placeholder="Search" 
                            name="search"
                            onChange={handleSearch}
                            value={search}
                            />
                    </div>
                <div className="mt-2 ml-2 flex flex-col gap-4">
                    {
                        categories.map((category: string, index: number) => (
                            <Link onClick={() => setIsMobileNavVisible(false)} key={`${category}-${index}`} className="mx-2 p-2 hover:bg-gray-900 capitalize rounded" href={`/category/${category}`}>
                                {category}
                            </Link>
                        ))
                    }    
                </div>
            </div>
        </nav>
    );
};