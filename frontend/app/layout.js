import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';

// Optional: import Navbar and Footer if you want
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata = {
  title: 'SettleTrack - Blockchain Trade Settlement',
  description:
    'Blockchain-powered trade settlement with ML risk detection',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          h-full
          bg-background
          text-foreground
          antialiased
        `}
      >
        {/* Optional Navbar */}
        {/* <Navbar /> */}

        <main className="min-h-screen">{children}</main>

        {/* Optional Footer */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
