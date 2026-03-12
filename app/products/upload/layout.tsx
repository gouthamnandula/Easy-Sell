import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Upload Product | Easy Sell',
  description: 'Add your product to Easy Sell with images, pricing, and contact details.',
  alternates: {
    canonical: '/products/upload',
  },
  openGraph: {
    title: 'Upload Product | Easy Sell',
    description: 'Add your product to Easy Sell with images, pricing, and contact details.',
    url: '/products/upload',
    siteName: 'Easy Sell',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Upload Product | Easy Sell',
    description: 'Add your product to Easy Sell with images, pricing, and contact details.',
  },
};

export default function UploadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
