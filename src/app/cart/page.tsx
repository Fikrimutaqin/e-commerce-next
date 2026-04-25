"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, removeFromCart, clearCart } from "@/store/slices/cartSlice";
import BasicButton from "@/components/common/buttons/BasicButton";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CartPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { items, totalAmount, totalQuantity } = useAppSelector((state) => state.cart);

    const handleIncrease = (item: any) => {
        dispatch(addToCart({ product: item, quantity: 1 }));
    };

    const handleDecrease = (item: any) => {
        if (item.quantity > 1) {
            dispatch(addToCart({ product: item, quantity: -1 }));
        } else {
            handleRemove(item.id);
        }
    };

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
        toast.success("Item removed from cart");
    };

    if (items.length === 0) {
        return (
            <main className="flex flex-col items-center justify-center min-h-[70vh] px-4">
                <div className="w-64 h-64 relative mb-8">
                    <Image src="/images/icons/ic-cart.svg" alt="Empty Cart" fill className="opacity-10" />
                </div>
                <h1 className="text-3xl font-bold text-black mb-2">Your cart is empty</h1>
                <p className="text-secondary mb-8 text-center max-w-md">
                    Looks like you haven't added anything to your cart yet. Explore our premium collection and find something you love.
                </p>
                <Link href="/">
                    <BasicButton onClick={() => { console.log("hellow") }} type="button" className="w-[240px] h-14 bg-primary text-white! font-bold rounded-xl shadow-lg shadow-primary/20">
                        Start Shopping
                    </BasicButton>
                </Link>
            </main>
        );
    }

    return (
        <main className="flex flex-col w-full min-h-screen bg-slate-50/50 pb-20">
            {/* Header */}
            <section className="w-full bg-white border-b border-gray-100 py-12 px-4 lg:px-[215px]">
                <h1 className="text-4xl font-bold text-black">Shopping Cart</h1>
                <p className="text-secondary mt-2">You have {totalQuantity} items in your cart</p>
            </section>

            <section className="flex flex-col lg:flex-row w-full px-4 lg:px-[215px] py-10 lg:gap-x-12">
                {/* Left: Cart Items */}
                <div className="flex flex-col w-full lg:w-2/3 gap-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex flex-row items-center bg-white p-4 lg:p-6 rounded-2xl shadow-sm border border-gray-50 group hover:border-primary/20 transition-all gap-x-2">
                            {/* Product Image */}
                            <div className="relative w-24 lg:w-32 aspect-square bg-slate-50 rounded-xl overflow-hidden shrink-0 cursor-pointer" onClick={() => router.push(`/product/${item.id}`)}>
                                <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100px, 150px" className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            {/* Info */}
                            <div className="flex flex-col flex-1 ml-4 lg:ml-8 gap-y-1">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.category}</span>
                                <h3 className="text-base lg:text-lg font-bold text-black line-clamp-1 cursor-pointer hover:text-primary transition-colors" onClick={() => router.push(`/product/${item.id}`)}>
                                    {item.title}
                                </h3>
                                <p className="text-secondary text-sm font-medium mt-1">${item.price.toLocaleString()}</p>

                                {/* Mobile Quantity Selector */}
                                <div className="flex lg:hidden flex-row items-center bg-slate-50 rounded-lg w-fit mt-2">
                                    <button onClick={() => handleDecrease(item)} className="px-3 py-1 text-lg font-bold hover:text-primary">-</button>
                                    <span className="px-2 font-bold text-sm">{item.quantity}</span>
                                    <button onClick={() => handleIncrease(item)} className="px-3 py-1 text-lg font-bold hover:text-primary">+</button>
                                </div>
                            </div>

                            {/* Desktop Controls */}
                            <div className="hidden lg:flex flex-row items-center gap-x-8">
                                {/* Quantity */}
                                <div className="flex flex-row items-center bg-slate-50 rounded-xl px-2 h-12 border border-gray-100">
                                    <button onClick={() => handleDecrease(item)} className="w-8 h-8 flex items-center justify-center text-xl font-medium hover:text-primary transition-colors">-</button>
                                    <span className="w-10 text-center font-bold">{item.quantity}</span>
                                    <button onClick={() => handleIncrease(item)} className="w-8 h-8 flex items-center justify-center text-xl font-medium hover:text-primary transition-colors">+</button>
                                </div>
                                {/* Subtotal */}
                                <p className="text-lg font-bold text-black w-24 text-right">
                                    ${(item.price * item.quantity).toLocaleString()}
                                </p>
                            </div>

                            {/* Remove Button */}
                            <button onClick={() => handleRemove(item.id)} className="ml-4 lg:ml-8 p-2 text-gray-400 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </button>
                        </div>
                    ))}

                    <button onClick={() => dispatch(clearCart())} className="text-secondary hover:text-red-500 text-sm font-semibold mt-4 text-left w-fit transition-colors px-2">
                        Clear all items
                    </button>
                </div>

                {/* Right: Order Summary */}
                <div className="flex flex-col w-full lg:w-1/3 mt-12 lg:mt-0">
                    <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 sticky top-28 border border-gray-50">
                        <h2 className="text-xl font-bold text-black mb-6">Order Summary</h2>

                        <div className="flex flex-col gap-y-4 pb-6 border-b border-gray-100">
                            <div className="flex justify-between items-center text-secondary">
                                <span>Subtotal</span>
                                <span className="text-black font-semibold">${totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-secondary">
                                <span>Shipping Fee</span>
                                <span className="text-green font-bold uppercase text-xs tracking-wider">Free</span>
                            </div>
                            <div className="flex justify-between items-center text-secondary">
                                <span>Estimated Tax</span>
                                <span className="text-black font-semibold">$0.00</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center py-6">
                            <span className="text-lg font-bold text-black">Total Amount</span>
                            <span className="text-2xl font-bold text-primary">${totalAmount.toLocaleString()}</span>
                        </div>

                        <BasicButton type="button" onClick={() => { console.log("Checkout"); }} className="w-full! h-14 bg-black text-white! font-bold rounded-xl hover:bg-primary transition-all shadow-lg">
                            Proceed to Checkout
                        </BasicButton>

                        <div className="flex flex-col gap-y-3 mt-8 pt-8 border-t border-gray-100">
                            <div className="flex items-center gap-x-3 text-secondary text-xs">
                                <div className="w-2 h-2 bg-green rounded-full"></div>
                                <span>Secure Checkout guaranteed</span>
                            </div>
                            <div className="flex items-center gap-x-3 text-secondary text-xs">
                                <div className="w-2 h-2 bg-green rounded-full"></div>
                                <span>30-Day Money-back policy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
