import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { SuggestedItineraries } from "@/components/suggested-itineraries"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Map, Calendar, Sparkles, Globe, Compass, Heart } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <Badge className="bg-ocean-100 text-ocean-700 hover:bg-ocean-200 px-4 py-1 rounded-full">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-ocean-600 to-tropical-600">
                Travel Planning Made Simple
              </h2>
              <p className="mx-auto max-w-[800px] text-lg text-muted-foreground">
                Our AI-powered platform takes the stress out of travel planning, so you can focus on creating memories
                that last a lifetime.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-ocean-50">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-ocean-100">
                    <Sparkles className="h-8 w-8 text-ocean-600" />
                  </div>
                  <h3 className="text-xl font-bold text-ocean-700">AI-Powered Recommendations</h3>
                  <p className="text-muted-foreground">
                    Our advanced AI analyzes thousands of data points to create personalized itineraries tailored to
                    your preferences.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-tropical-50">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-tropical-100">
                    <Map className="h-8 w-8 text-tropical-600" />
                  </div>
                  <h3 className="text-xl font-bold text-tropical-700">Curated Destinations</h3>
                  <p className="text-muted-foreground">
                    Discover hidden gems and popular attractions with our carefully curated collection of destinations
                    worldwide.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-sunset-50">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-sunset-100">
                    <Calendar className="h-8 w-8 text-sunset-600" />
                  </div>
                  <h3 className="text-xl font-bold text-sunset-700">Flexible Planning</h3>
                  <p className="text-muted-foreground">
                    Easily customize your itinerary, adjust dates, and make changes on the fly with our intuitive
                    planning tools.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 flex justify-center">
              <Button
                className="bg-gradient-to-r from-ocean-500 to-tropical-500 hover:from-ocean-600 hover:to-tropical-600 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
                asChild
              >
                <a href="/plan-trip">Start Your Adventure</a>
              </Button>
            </div>
          </div>
        </section>

        <SuggestedItineraries />
        <Testimonials />

        {/* CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-600 to-tropical-600"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10">
              <Globe className="h-24 w-24 text-white animate-float" />
            </div>
            <div className="absolute bottom-20 right-10">
              <Compass className="h-32 w-32 text-white animate-float" style={{ animationDelay: "1s" }} />
            </div>
            <div className="absolute top-40 right-20">
              <Plane className="h-16 w-16 text-white animate-float" style={{ animationDelay: "1.5s" }} />
            </div>
            <div className="absolute bottom-40 left-20">
              <Heart className="h-20 w-20 text-white animate-float" style={{ animationDelay: "2s" }} />
            </div>
          </div>
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                Ready to Explore the World?
              </h2>
              <p className="text-lg mb-8 text-white/90">
                Let our AI create your perfect travel itinerary in seconds. Join thousands of happy travelers who have
                discovered their dream destinations with TravelAI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-ocean-600 hover:bg-white/90 px-8 py-6 text-lg rounded-full shadow-lg"
                >
                  <a href="/plan-trip">Plan Your Trip</a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full shadow-lg"
                >
                  <a href="/about">Learn More</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
