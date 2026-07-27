import './globals.css'

export const metadata = {
  title: 'VYNTAR - Get Found on Google | Local Business Visibility',
  description: 'We help local businesses get found by the people already searching for them. More customers find you, trust you, and choose you.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
