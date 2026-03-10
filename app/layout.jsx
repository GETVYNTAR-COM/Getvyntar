import './globals.css'

export const metadata = {
  title: 'VYNTAR SEO Lead Engine',
  description: 'AI lead discovery for SEO agencies',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
