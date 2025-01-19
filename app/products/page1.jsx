'use client'

import Image from 'next/image'
import { Cinzel, Montserrat } from 'next/font/google'
import { useState } from 'react'

const cinzel = Cinzel({ subsets: ['latin'], weight: ['400'] })
const montserrat = Montserrat({ subsets: ['latin'] })

export default function ProductsPage() {
  const macarons = [
    {
      id: 1,
      name: 'Matcha Strawberry',
      price: 3.75,
      image: '/kambia-product-photos/matcha-strawberry/matcha-strawberry1.jpeg',
    },
    {
      id: 2,
      name: 'Lemon',
      price: 3.75,
      image: '/kambia-product-photos/lemon/lemon1.jpeg',
    },
    {
      id: 3,
      name: 'Pumpkin Spice',
      price: 3.75,
      image: '/kambia-product-photos/pumpkin-spice/pumpkin-spice1.jpeg',
    },
    {
      id: 4,
      name: 'Apple Pie',
      price: 3.75,
      image: '/kambia-product-photos/apple-pie/apple-pie1.jpeg',
    },
    {
      id: 5,
      name: 'S\'mores',
      price: 3.75,
      image: '/kambia-product-photos/smores/smores1.jpeg',
    },
    {
      id: 6,
      name: 'Coconut',
      price: 3.75,
      image: '/kambia-product-photos/coconut/coconut1.jpeg',
    },
  ]

  // State for selected flavors and cart
  const [selectedFlavors, setSelectedFlavors] = useState([])
  const [cart, setCart] = useState([])

  const handleFlavorToggle = (macaron) => {
    setSelectedFlavors(prev => {
      if (prev.includes(macaron.id)) {
        return prev.filter(id => id !== macaron.id)
      }
      if (prev.length >= 4) return prev
      return [...prev, macaron.id]
    })
  }

  const handleAddToCart = () => {
    if (selectedFlavors.length !== 4) return

    const flavorNames = selectedFlavors
      .map(id => macarons.find(m => m.id === id).name)
    
    setCart(prev => [...prev, flavorNames])
    setSelectedFlavors([]) // Reset selection
  }

  return (
    <div className="flex min-h-screen">
      {/* Left container - Photos and title */}
      <div className="w-3/4 p-8 bg-white">
        <h1 className={`${cinzel.className} text-4xl mb-4`}>Create Your Boxes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {macarons.map((macaron) => (
            <div key={macaron.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="w-full h-48 relative">
                <Image
                  src={macaron.image}
                  alt={`${macaron.name} Macaron`}
                  width={200}
                  height={200}
                  className="mx-auto object-contain"
                  style={{ position: 'static' }}
                />
              </div>
              <div className="p-4">
                <h3 className={`${montserrat.className} text-lg font-semibold`}>
                  {macaron.name}
                </h3>
                <p className="text-gray-600">${macaron.price.toFixed(2)} each</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right container - Selection and Cart */}
      <div className="w-1/4 bg-gray-50 p-6 min-h-screen">
        <h2 className={`${montserrat.className} text-2xl font-bold mb-6`}>
          Select Your Flavors ({selectedFlavors.length}/4)
        </h2>
        
        {/* Flavor checkboxes */}
        <div className="space-y-4 mb-8">
          {macarons.map((macaron) => (
            <label key={macaron.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFlavors.includes(macaron.id)}
                onChange={() => handleFlavorToggle(macaron)}
                disabled={!selectedFlavors.includes(macaron.id) && selectedFlavors.length >= 4}
                className="w-5 h-5 rounded border-gray-300"
              />
              <span className={`${montserrat.className} text-lg`}>{macaron.name}</span>
            </label>
          ))}
        </div>

        {/* Cart section */}
        {cart.length > 0 && (
          <div className="mb-8 border-t border-gray-200 pt-6">
            <h3 className={`${montserrat.className} text-xl font-bold mb-4`}>Cart</h3>
            {cart.map((box, index) => (
              <div key={index} className="mb-3 text-sm">
                Box {index + 1}: {box.join(', ')}
              </div>
            ))}
          </div>
        )}

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={selectedFlavors.length !== 4}
          className={`
            w-full bg-black text-white py-4 px-6 rounded-lg
            ${selectedFlavors.length !== 4 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}
            ${montserrat.className} text-lg font-medium
          `}
        >
          Add Box to Cart
        </button>
      </div>
    </div>
  )
}