import './globals.css';
import SessionProvider from './providers/Sessionprovider';
import { Manrope, Space_Mono, Inter_Tight, Lato, Phudu } from 'next/font/google';
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
  weight: '400',
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['400', '700'], // Adjust weights as needed
});

const phudu = Phudu({
  subsets: ['latin'],
  variable: '--font-phudu',
  weight: ['300', '400', '700'], // Adjust weights as needed
});

export const metadata: Metadata = {
  title: 'MixMatch',
  description: 'Connect with DJs and Event Planners',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} ${spaceMono.variable} ${lato.variable} ${phudu.variable}`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
