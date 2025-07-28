import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "OM Network India | Empowering IT and Network Solutions",
  description: "OM Network India specializes in advanced network solutions, IT infrastructure management, software consulting, and cutting-edge technology services. Partner with us to enhance your business connectivity and digital performance.",
  keywords: "network solutions, IT infrastructure, software consulting, technology services, client network management, digital transformation, IT support",
  icons: {
    icon: "/icons/Fab-Icon.png",
    shortcut: "/icons/Fab-Icon.png",
    apple: "/icons/Fab-Icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <head>
        <link rel="icon" href="/icons/Fab-Icon.jpg" sizes="any" />
        <link rel="shortcut icon" href="/icons/Fab-Icon.jpg" />
        <link rel="apple-touch-icon" href="/icons/Fab-Icon.jpg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >

        <main className="pt-7 min-h-screen">
          <ToastContainer position="top-right" autoClose={3000} />
          {children}
        </main>

      </body>
    </html>
  );
}
