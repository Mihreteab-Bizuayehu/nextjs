import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ecommerce',
  description: 'Smart Ecommerce Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className=" min-h-screen flex flex-col ">
          <Header />
          {children}
          <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
            <p>
              Copyright © {new Date().getFullYear()} - Created by{' Mihreteab'}.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
