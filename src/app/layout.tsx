import type { Metadata } from "next";

// Google Fonts
import { Inter } from "next/font/google";

// Style
import "./globals.css";

// Redux Toolkit
import StoreProvider from "@/store/storeProvider";

// Components
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";

// Font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// TanStack Query
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "react-hot-toast";

// Metadata
export const metadata: Metadata = {
  title: "Tjermin Marketplace",
  description: "Find your perfect things from our premium selection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <QueryProvider>
          <StoreProvider>
            <Toaster position="bottom-right" reverseOrder={false} />
            <Header />
            {children}
            <Footer />
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
