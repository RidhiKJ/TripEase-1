import Link from "next/link"
import { Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-b from-white to-ocean-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-1 rounded-full bg-gradient-to-r from-ocean-500 via-tropical-500 to-sunset-500">
                <Plane className="h-6 w-6 text-white transform rotate-45" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ocean-600 via-tropical-600 to-sunset-600">
                TravelAI
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-xs">
              AI-powered travel planning that creates personalized itineraries based on your preferences and budget.
              Discover your next adventure with us!
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Facebook"
                className="text-ocean-500 hover:text-ocean-600 hover:bg-ocean-100"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Twitter"
                className="text-tropical-500 hover:text-tropical-600 hover:bg-tropical-100"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Instagram"
                className="text-sunset-500 hover:text-sunset-600 hover:bg-sunset-100"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="LinkedIn"
                className="text-ocean-500 hover:text-ocean-600 hover:bg-ocean-100"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="YouTube"
                className="text-sunset-500 hover:text-sunset-600 hover:bg-sunset-100"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-ocean-600 to-tropical-600">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-ocean-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/plan-trip" className="text-muted-foreground hover:text-tropical-600 transition-colors">
                  Plan Trip
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-sunset-600 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-ocean-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-tropical-600 to-sunset-600">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-tropical-600 transition-colors">
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-muted-foreground hover:text-sunset-600 transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/travel-guides" className="text-muted-foreground hover:text-ocean-600 transition-colors">
                  Travel Guides
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-tropical-600 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-sunset-600 to-ocean-600">
              Subscribe
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for travel tips and exclusive offers.
            </p>
            <div className="space-y-3">
              <div className="relative">
                <Input
                  placeholder="Your email address"
                  type="email"
                  className="pl-4 pr-12 py-6 rounded-full border-ocean-200 focus-visible:ring-ocean-500"
                />
                <Button
                  size="sm"
                  className="absolute right-1.5 top-1.5 rounded-full bg-gradient-to-r from-ocean-500 to-tropical-500 hover:from-ocean-600 hover:to-tropical-600 text-white"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} TravelAI. All rights reserved.</p>
          <div className="flex gap-4 text-xs">
            <Link href="/terms" className="text-muted-foreground hover:text-ocean-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-tropical-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-sunset-600 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
