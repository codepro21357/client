import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";
import ReduxProvider from "@/providers/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reinholders-Admin",
  description: "Reinholders admin page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <ReduxProvider>
            <Toaster />
            {children}
          </ReduxProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
