import './globals.css'

export const metadata = {
  title: 'AI Bulletin | Real-Time AI News',
  description: 'Aggregator for the latest Artificial Intelligence news and updates.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
