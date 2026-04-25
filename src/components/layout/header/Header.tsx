"use client";

import Image from "next/image";
import { TOP_BAR_MESSAGE, HEADER_MENU } from "@/constants/menu";
import Link from "next/link";
import { useState, useMemo, useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchQuery } from "@/store/slices/appSlice";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";

export default function Header() {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { title, subtitle, linkText, linkHref } = TOP_BAR_MESSAGE;

  const [openMenu, setOpenMenu] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(true);
  const [openSearch, setOpenSearch] = useState(false);

  const { totalQuantity } = useAppSelector((state) => state.cart);
  const { searchQuery } = useAppSelector((state) => state.app);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setOpenSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when search section opens
  useEffect(() => {
    if (openSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [openSearch]);

  const { data: products } = useQuery({
    queryKey: ['products-search'],
    queryFn: () => productService.getAllProducts(50),
  });

  const suggestions = useMemo(() => {
    if (!searchQuery || !products) return [];
    return products.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 4);
  }, [searchQuery, products]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSelectProduct = (id: number) => {
    dispatch(setSearchQuery(""));
    setOpenSearch(false);
    router.push(`/product/${id}`);
  };

  const _RenderSuggestions = () => {
    if (suggestions.length === 0 || !searchQuery) return null;
    return (
      <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md mt-2 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden z-100 animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="p-3 border-b border-gray-50 flex justify-between items-center bg-slate-50/50">
          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest px-2">Suggestions</span>
          <span className="text-[10px] text-primary font-bold px-2">{suggestions.length} Items Found</span>
        </div>
        <div className="flex flex-col max-h-[380px] overflow-y-auto">
          {suggestions.map((product) => (
            <div
              key={product.id}
              onClick={() => handleSelectProduct(product.id)}
              className="flex flex-row items-center p-3 lg:p-4 hover:bg-primary/5 cursor-pointer transition-all group border-b border-gray-50 last:border-none"
            >
              <div className="relative w-12 h-12 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-100">
                <Image src={product.image} alt={product.title} fill className="object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="ml-4 flex flex-col overflow-hidden flex-1">
                <p className="text-sm font-bold text-black line-clamp-1 group-hover:text-primary transition-colors">{product.title}</p>
                <p className="text-[10px] text-secondary font-semibold uppercase tracking-wider">{product.category}</p>
              </div>
              <div className="ml-4 text-right">
                <p className="text-sm font-bold text-primary">${product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 bg-slate-50/80 text-center border-t border-gray-50">
          <button onClick={() => { setOpenSearch(false); router.push("/"); }} className="text-[11px] font-bold text-secondary hover:text-primary transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center gap-x-2 mx-auto uppercase tracking-tighter">
            View All Results
            <Image src="/images/icons/ic-chevron-right.svg" alt="more" width={10} height={10} className="opacity-50" />
          </button>
        </div>
      </div>
    );
  };

  const _RenderCardSideMenu = () => {
    return (
      <div className="w-full bg-white h-auto p-4 flex flex-col gap-y-4 animate-fade-in-up border-t border-gray-100 shadow-inner">
        {HEADER_MENU.map((item) => (
          <Link key={item.title} href={item.href} onClick={() => setOpenMenu(false)}>
            <p className="text-secondary text-sm font-bold hover:text-primary transition-colors py-2 border-b border-gray-50">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <header className="flex flex-col w-full sticky top-0 z-60 shadow-sm bg-white" ref={searchRef}>
      {/* Top Header */}
      {hideTopBar && (
        <section className="lg:flex hidden items-center justify-center w-full h-11 bg-slate-50 border-b border-gray-100 gap-x-2 px-4 lg:px-[215px]">
          <button onClick={() => setHideTopBar(false)} className="bg-transparent border-none p-1 cursor-pointer hover:bg-gray-200 rounded-full transition-colors flex items-center justify-center">
            <Image src="/images/icons/ic-times.svg" alt="close" width={14} height={14} />
          </button>
          <p className="text-secondary text-xs">
            <span className="font-bold text-black">{title}</span> — {subtitle}
          </p>
          <Link href={linkHref} className="text-primary text-xs font-bold hover:underline ml-2">
            {linkText}
          </Link>
        </section>
      )}

      {/* Main Header */}
      <section className="w-full bg-white flex flex-row justify-between items-center px-4 lg:px-[215px] py-4 lg:py-5">
        {/* Brand & Nav */}
        <div className="flex flex-row items-center gap-x-12">
          <Link href="/">
            <p className="font-extrabold text-black text-2xl tracking-tighter uppercase group">
              Tjermin<span className="text-primary group-hover:animate-ping">.</span>
            </p>
          </Link>
          <nav className="hidden lg:flex flex-row gap-x-8">
            {HEADER_MENU.map((item) => (
              <Link key={item.title} href={item.href}>
                <p className="text-secondary text-[12px] font-bold hover:text-primary transition-colors tracking-widest uppercase">
                  {item.title}
                </p>
              </Link>
            ))}
          </nav>
        </div>

        {/* Action Icons */}
        <div className="flex flex-row items-center gap-x-2 lg:gap-x-5">
          {/* Search Toggle Button (Always Visible) */}
          <button
            onClick={() => setOpenSearch(!openSearch)}
            className={`p-2 rounded-xl transition-all duration-300 flex items-center justify-center bg-transparent border-none cursor-pointer ${openSearch ? 'bg-primary/10 text-primary scale-110' : 'hover:bg-slate-50 text-black'}`}
          >
            <Image src="/images/icons/ic-search.svg" alt="search" width={22} height={22} />
          </button>

          <Link href="/" className="p-2 hover:bg-slate-50 rounded-xl transition-colors hidden lg:block">
            <Image src="/images/icons/ic-user.svg" alt="user" width={22} height={22} />
          </Link>

          <Link href="/cart" className="p-2 hover:bg-slate-50 rounded-xl transition-colors relative group">
            <Image src="/images/icons/ic-cart.svg" alt="cart" width={22} height={22} className="group-hover:scale-110 transition-transform" />
            {totalQuantity > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-heartbeat border-2 border-white shadow-md">
                {totalQuantity}
              </span>
            )}
          </Link>

          <button onClick={() => setOpenMenu(!openMenu)} className="lg:hidden p-2 hover:bg-slate-50 rounded-xl transition-colors bg-transparent border-none cursor-pointer">
            <Image src="/images/icons/ic-hambuger.svg" alt="menu" width={22} height={22} />
          </button>
        </div>
      </section>

      {/* Search Section (Appears when toggled, both Desktop & Mobile) */}
      {openSearch && (
        <div className="w-full px-4 lg:px-[215px] pb-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="relative">
            <div className="flex items-center bg-white border-2 border-primary rounded-2xl px-5 py-3 lg:py-4 shadow-2xl shadow-primary/10">
              <Image src="/images/icons/ic-search.svg" alt="search" width={22} height={22} className="opacity-40" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="What are you looking for today? Type here..."
                className="bg-transparent border-none outline-none text-sm lg:text-base ml-4 w-full font-bold text-black placeholder:font-medium placeholder:text-gray-400"
              />
              {searchQuery && (
                <button onClick={() => dispatch(setSearchQuery(""))} className="bg-transparent border-none p-2 cursor-pointer text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all">
                  <Image src="/images/icons/ic-times.svg" alt="clear" width={16} height={16} />
                </button>
              )}
            </div>
            <_RenderSuggestions />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobile && openMenu && <_RenderCardSideMenu />}
    </header>
  );
}
