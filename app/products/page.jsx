'use client'

import Image from 'next/image'

const ProductPage = () => {
  const macarons = [
    {
      id: 1,
      name: 'Matcha Strawberry',
      price: 3.75,
      image: '/kambia-product-photos/matcha-strawberry/matcha-strawberry1.png',
    },
    {
      id: 2,
      name: 'Lemon',
      price: 3.75,
      image: '/kambia-product-photos/lemon/lemon1.png',
    },
    {
      id: 3,
      name: 'Pumpkin Spice',
      price: 3.75,
      image: '/kambia-product-photos/pumpkin-spice/pumpkin-spice1.png',
    },
    {
      id: 4,
      name: 'Apple Pie',
      price: 3.75,
      image: '/kambia-product-photos/apple-pie/apple-pie1.png',
    },
    {
      id: 5,
      name: 'S\'mores',
      price: 3.75,
      image: '/kambia-product-photos/smores/smores1.png',
    },
    {
      id: 6,
      name: 'Coconut',
      price: 3.75,
      image: '/kambia-product-photos/coconut/coconut1.png',
    },
  ]

  const handleAddToCart = (product) => {
    console.log(`Added ${product.name} to cart`)
  }

  return (
    <div className="w-full px-8 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Macarons</h1>

      {/* Use grid for guaranteed wrapping */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {macarons.map((macaron) => (
          <div 
            key={macaron.id} 
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-center mb-4 w-full h-[200px] overflow-hidden rounded-lg">
              <Image
                src={macaron.image}
                alt={macaron.name}
                width={300}
                height={200}
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">{macaron.name}</h2>
            <p className="text-gray-600 mb-4 text-center">${macaron.price.toFixed(2)}</p>
            <button
              onClick={() => handleAddToCart(macaron)}
              className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductPage