export default function HeroSection() {
    return (
        <section className="relative h-[280px] lg:h-[420px] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
                style={{
                    backgroundImage: "url('/images/heros/hero-background.webp')"
                }}
            />

            {/* Overlay: bg-primary with 90% opacity */}
            <div className="absolute inset-0 bg-primary/85 mix-blend-multiply" />

            {/* Content */}
            <div className="flex flex-col justify-center items-center w-full z-10 lg:gap-y-3 gap-y-2 text-center px-1 lg:px-0">
                <p className="text-white lg:text-5xl text-3xl font-bold tracking-[2px]">Tjermin Marketplace</p>
                <p className="text-white lg:text-xl text-sm font-medium">Find your perfect things from our premium selection.</p>
            </div>
        </section>
    );
}