import './globals.css';
import SessionProvider from './providers/Sessionprovider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MixMatch',
  description: 'Connect with DJs and Event Planners',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
