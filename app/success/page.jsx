'use client'

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
        <p className="mb-4">We'll start preparing your macarons right away.</p>
        <a
          href="/products"
          className="inline-block bg-[#736f8a] text-white px-6 py-3 rounded-md hover:bg-[#5d596e] transition-colors"
        >
          Order More
        </a>
      </div>
    </div>
  );
}