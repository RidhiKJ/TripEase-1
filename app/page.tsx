import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TripPlanningForm } from "@/components/trip-planning-form"
import { SuggestedItineraries } from "@/components/suggested-itineraries"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TripPlanningForm />
        <SuggestedItineraries />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
