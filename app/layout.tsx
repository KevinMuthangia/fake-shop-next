import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Cart from "@/components/cart";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Fake Shop",
  description: "Ecommerce App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
          <StoreProvider>
            <Navbar />
            <Cart />
           {children}
          </StoreProvider>
        </body>
    </html>
  );
}
