import './globals.css';
import SessionProvider from './providers/Sessionprovider';
import { Manrope, Space_Mono, Inter_Tight } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: '400'
});

export const metadata: Metadata = {
  title: 'MixMatch',
  description: 'Connect with DJs and Event Planners',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} ${spaceMono.variable}`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
