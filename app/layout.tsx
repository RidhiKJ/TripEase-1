import type React from "react"
import "./globals.css"

export const metadata = {
  title: "Travel Planner",
  description: "Plan your perfect trip with our AI-powered travel planner",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
