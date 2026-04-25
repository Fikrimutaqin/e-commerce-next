import { HEADER_MENU, FOOTER_MENU_SOSMED } from "@/constants/menu";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="w-full flex flex-col items-center justify-center mt-auto">
        <section id="footer" className="flex lg:h-40 bg-black flex-col lg:flex-row lg:justify-between justify-center items-center w-full lg:px-[215px] px-4 py-8 lg:gap-y-0 gap-y-2">
          {/* Logo Footer */}
          <div className="flex flex-col lg:justify-start lg:items-start justify-center items-center gap-y-2">
            <Link href={"/"}>
              <p className="font-bold text-white text-2xl">TJERMIN</p>
            </Link>
            <p className="text-secondary text-sm">© {new Date().getFullYear()} AutoElite. All rights reserved.</p>
          </div>
          {/* Menu Footer */}
          <div className="flex flex-row lg:gap-x-5 gap-x-2 justify-center items-center mt-3 lg:mt-0">
            {HEADER_MENU.map((item, index) => {
              return (
                <Link href={item.href} key={index}>
                  <p className="text-secondary text-sm">{item.title}</p>
                </Link>
              );
            })}
          </div>
          {/* Menu Sosmed */}
          <div className="flex flex-row gap-x-5 justify-center items-center mt-2 lg:mt-0">
            {FOOTER_MENU_SOSMED.map((i) => {
              return (
                <Link href={i.href} className="w-10 h-10 bg-primary/50 flex items-center justify-center rounded-full" target="_blank" key={i.title}>
                  <Image src={i.icon || ""} alt={i.title} width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
                </Link>
              );
            })}
          </div>
        </section>
      </footer>
    </>
  );
}
