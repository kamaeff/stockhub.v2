import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import './globals.scss'
import Script from 'next/script'

const rubik = Rubik({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--rubik',
  style: ['normal', 'italic']
})

export const metadata: Metadata = {
  title: 'StockHub12',
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={rubik.className}>{children}</body>
      <Script src='https://telegram.org/js/telegram-web-app.js'></Script>
    </html>
  )
}
