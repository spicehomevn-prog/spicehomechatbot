'use client';
import dynamic from 'next/dynamic';

const GuestApp = dynamic(() => import('@/components/GuestApp'), { ssr: false });

export default function Home() {
  return <GuestApp />;
}
