export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to our Macaron Shop</h1>
      <a href="/products" className="mt-4 text-blue-600 hover:underline">
        View Our Products
      </a>
    </div>
  )
} 