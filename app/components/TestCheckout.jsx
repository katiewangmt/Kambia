'use client';

export default function TestCheckout() {
  const handleTest = async () => {
    try {
      const testBox = {
        macarons: [
          { name: "Test Macaron", price: 3.75 }
        ]
      };

      console.log('Sending test request...');
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          boxes: [testBox]
        }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        console.error('No redirect URL in response:', data);
      }
    } catch (error) {
      console.error('Test failed:', error);
    }
  };

  return (
    <button 
      onClick={handleTest}
      style={{
        padding: '10px',
        margin: '10px',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
      }}
    >
      Test Checkout
    </button>
  );
} 