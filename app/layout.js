export const metadata = {
  title: 'Macaron Shop',
  description: 'Delicious French Macarons',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 