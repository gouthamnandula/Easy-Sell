import type { Metadata } from "next";
import { Nunito, Josefin_Sans } from "next/font/google";
import { getCanonicalUrl } from "@/utils";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {  //this is a special export that next.js uses to set the metadata of the page, this is a feature of next.js that allows us to set the metadata of the page in a simple way, we can set the title, description, keywords, etc. of the page using this export, and next.js will automatically add the appropriate meta tags to the head of the page.
  title: "Easy Sell",
  description: "Discover the power of simplicity with Easy Sell – the ultimate solution for effortless selling products. Unlock convenience and boost your sales.",
  alternates: { //this is used to set the canonical url of the page, this is a feature of next.js that allows us to set the canonical url of the page in a simple way, we can set the canonical url of the page using this property, and next.js will automatically add the appropriate link tag to the head of the page.
    canonical: getCanonicalUrl(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className}`}
      >
        <Header font={josefinSans.className} />
        <div className="bg-gray-951 min-h-screen py-12">  
          {children}
        </div>
        <Footer font={josefinSans.className}/>
      </body>
    </html>
  );
}
