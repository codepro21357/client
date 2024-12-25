import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { dancingScript, montserrat, neueMetana } from "@/utils/fonts";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Reinholders - Investment",
  description: "This is Reinholders Crypto Investment app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${dancingScript.variable} ${neueMetana.variable} 
        font-montserrat`}
      >
        <Toaster />
        <ReactQueryClientProvider>
          <ReduxProvider>
            <Navbar />
            {children}
            <Footer />
          </ReduxProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
