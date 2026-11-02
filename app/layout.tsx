import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navigation/Navbar';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WishlistDrawer } from '@/components/cart/WishlistDrawer';
import { QuotationModal } from '@/components/quotation/QuotationModal';

export const metadata: Metadata = {
  title: 'VIRTUO — Premium Interactive 3D Virtual Showroom',
  description:
    'Experience design beyond reality. Explore, customize, and configure luxury furniture in an interactive 3D virtual showroom built with React Three Fiber.',
  keywords: [
    'Virtual Showroom',
    '3D Furniture',
    'Luxury Interior Design',
    'Interactive 3D WebGL',
    'React Three Fiber',
    'Architectural Visualizer',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a0d] text-[#f0f0f5] antialiased selection:bg-amber-300 selection:text-black">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <CartDrawer />
        <WishlistDrawer />
        <QuotationModal />
      </body>
    </html>
  );
}

