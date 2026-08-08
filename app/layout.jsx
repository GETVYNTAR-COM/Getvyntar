import './globals.css'

export const metadata = {
  title: 'VYNTAR - Get Found on Google | Free Visibility Scan',
  description: 'Free visibility scan for local businesses. We help you get found by the people already searching for you on Google.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
