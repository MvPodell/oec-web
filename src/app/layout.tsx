import type { Metadata } from "next";
import { Alegreya_Sans, Open_Sans } from "next/font/google";
import "./globals.css";
import { FirebaseAuthProvider } from "@/config/AuthContext";

const alegreyaSans = Alegreya_Sans({ style: "normal", weight: ["100", "300", "400", "500", "700", "800"], subsets: ["latin"] });
const openSans= Open_Sans({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Outdoor Education Center",
  description: "Generated by create next app",
};

export default async function RootLayout({
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
        <body className={alegreyaSans.className}>{children}</body>
      </FirebaseAuthProvider>
    </html>
  );
}
