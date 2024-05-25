import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FirebaseAuthProvider, useFirebaseAuth } from "@/config/AuthContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Outdoor Education Center",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <FirebaseAuthProvider >
      <head>
        <link rel="icon" href="/images/icon.ico"></link>
      </head>
        <body className={inter.className}>{children}</body>
      </FirebaseAuthProvider>
    </html>
  );
}