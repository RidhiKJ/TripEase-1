import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "About - TravelAI",
  description: "Learn more about our AI-powered travel planning platform.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About TravelAI</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our mission is to make travel planning effortless and personalized.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground">
                TravelAI was founded by a group of travel enthusiasts and AI experts who wanted to solve the common
                problem of travel planning. We believe that everyone deserves a perfectly tailored travel experience
                without spending hours researching and planning.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Our Technology</h2>
              <p className="text-muted-foreground">
                We use advanced artificial intelligence to analyze your preferences, budget, and interests to create
                personalized travel itineraries. Our AI considers factors like weather, local events, and seasonal
                attractions to ensure you have the best possible experience.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Our Team</h2>
              <p className="text-muted-foreground">
                Our diverse team combines expertise in travel, technology, and customer service. We're passionate about
                helping people discover new places and create unforgettable memories.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                Have questions or feedback? We'd love to hear from you! Reach out to us at{" "}
                <a href="mailto:info@travelai.example.com" className="text-primary hover:underline">
                  info@travelai.example.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
