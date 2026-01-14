'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        SettleTrack
      </Link>

      <div className="flex gap-6 text-sm">
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link href="/settle" className="hover:text-gray-300">
          Settlement
        </Link>
        <Link href="/risk" className="hover:text-gray-300">
          ML Risk
        </Link>
      </div>
    </nav>
  );
}
