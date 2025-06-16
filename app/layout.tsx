import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/navigation/footer';
import Header from '@/components/navigation/header';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Multi-Services Enterprise',
  description: 'Professional multi-service company offering business analysis, construction, general trade, and tourism services',
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