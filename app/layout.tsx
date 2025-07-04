import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/navigation/footer';
import Header from '@/components/navigation/header';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Multi-Services Enterprise',
  description: 'Professional multi-service company offering business analysis, construction, general trade, and tourism services',
  keywords: 'business analysis, construction, general trade, tourism, multi-service company',
  authors: [{ name: 'BTIC' }],
  creator: 'BTIC',
  icons: {
    icon: '/images/Logo2.png', // ou /favicon.png, /logo.svg selon ton fichier
  },
  // openGraph: {
  //   title: 'Multi-Services Enterprise',
  //   description: 'Professional multi-service company offering business analysis, construction, general trade, and tourism services',
  //   // url: 'https://www.btic.com',
  //   siteName: 'BTIC',
  //   images: [
  //     {
  //       url: '/Logo2.png',
  //       width: 800,
  //       height: 600,
  //       alt: 'BTIC Logo',
  //     },
  //   ],
  // },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}