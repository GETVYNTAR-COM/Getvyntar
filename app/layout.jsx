import Script from 'next/script'
import './globals.css'

const GA_ID = 'G-RWVHRTDE2Q'

export const metadata = {
  title: 'VYNTAR - Get Found on Google | Free Visibility Scan',
  description: 'Free visibility scan for local businesses. We help you get found by the people already searching for you on Google.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}
