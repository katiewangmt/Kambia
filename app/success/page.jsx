'use client'

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700']
});

function SuccessContent() {
  const [status, setStatus] = useState('loading');
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      setStatus('success');
    }
  }, [sessionId]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 className={cinzel.className} style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
        Thank You for Your Order!
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Your payment was successful. We'll start preparing your macarons right away!
      </p>
      <Link href="/products">
        <button
          className={cinzel.className}
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#736f8a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1.1rem'
          }}
        >
          Order More Macarons
        </button>
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        Loading...
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}