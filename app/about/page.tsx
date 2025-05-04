import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MapPin, Users, Award, Globe } from "lucide-react"

export const metadata = {
  title: "About - TravelAI",
  description: "Learn more about our AI-powered travel planning platform.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-b from-ocean-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <div className="inline-block p-1 bg-gradient-to-r from-ocean-500 via-tropical-500 to-sunset-500 rounded-full">
                <div className="bg-white dark:bg-gray-950 rounded-full px-4 py-1.5">
                  <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-ocean-500 via-tropical-500 to-sunset-500">
                    OUR STORY
                  </span>
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-ocean-600 to-tropical-600">
                About TravelAI
              </h1>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                Our mission is to make travel planning effortless and personalized, helping you create unforgettable
                memories.
              </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-ocean-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-ocean-100">
                    <Globe className="h-6 w-6 text-ocean-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-ocean-700">Our Story</h2>
                </div>
                <p className="text-muted-foreground">
                  TravelAI was founded by a group of travel enthusiasts and AI experts who wanted to solve the common
                  problem of travel planning. We believe that everyone deserves a perfectly tailored travel experience
                  without spending hours researching and planning. Our platform combines cutting-edge AI technology with
                  human expertise to create the perfect travel itineraries for any destination.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-tropical-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-tropical-100">
                    <Award className="h-6 w-6 text-tropical-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-tropical-700">Our Technology</h2>
                </div>
                <p className="text-muted-foreground">
                  We use advanced artificial intelligence to analyze your preferences, budget, and interests to create
                  personalized travel itineraries. Our AI considers factors like weather, local events, and seasonal
                  attractions to ensure you have the best possible experience. We continuously improve our algorithms
                  based on feedback from thousands of successful trips.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-sunset-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-sunset-100">
                    <Users className="h-6 w-6 text-sunset-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-sunset-700">Our Team</h2>
                </div>
                <p className="text-muted-foreground">
                  Our diverse team combines expertise in travel, technology, and customer service. We're passionate
                  about helping people discover new places and create unforgettable memories. With team members who have
                  visited over 100 countries collectively, we bring real-world travel experience to our AI-powered
                  platform.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-ocean-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-ocean-100">
                    <MapPin className="h-6 w-6 text-ocean-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-ocean-700">Contact Us</h2>
                </div>
                <p className="text-muted-foreground">
                  Have questions or feedback? We'd love to hear from you! Reach out to us at{" "}
                  <a href="mailto:info@travelai.example.com" className="text-ocean-600 hover:underline">
                    info@travelai.example.com
                  </a>{" "}
                  or visit our{" "}
                  <a href="/contact" className="text-ocean-600 hover:underline">
                    contact page
                  </a>{" "}
                  for more ways to get in touch.
                </p>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="text-3xl font-bold text-ocean-600">50+</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-3xl font-bold text-tropical-600">500+</div>
                <div className="text-sm text-muted-foreground">Destinations</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-3xl font-bold text-sunset-600">10k+</div>
                <div className="text-sm text-muted-foreground">Happy Travelers</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-3xl font-bold text-ocean-600">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
