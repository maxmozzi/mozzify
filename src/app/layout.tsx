import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import TransitionManager from "@/components/layout/transition-manager";
import { FavoritesProvider } from "@/context/favorites-context";
import FlyingHeart from "@/components/layout/flying-heart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MOZZIFY | Premium Streetwear",
  description: "Modern fashion for the bold.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <FavoritesProvider>
          <TransitionManager>
            <Navbar />
            <FlyingHeart />
            {children}
            <Footer />
          </TransitionManager>
        </FavoritesProvider>
      </body>
    </html>
  );
}
