import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TripPlannerForm } from "@/components/trip-planner-form"

export const metadata = {
  title: "Plan Your Trip - TravelAI",
  description: "Plan your perfect trip with AI-powered recommendations tailored to your preferences and budget.",
}

export default function PlanTripPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <TripPlannerForm />
      </main>
      <Footer />
    </div>
  )
}
