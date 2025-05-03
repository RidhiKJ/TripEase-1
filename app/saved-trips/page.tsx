import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SavedTripsList } from "@/components/saved-trips-list"
import { getUserTrips } from "@/actions/trip-actions"

export default async function SavedTripsPage() {
  const trips = await getUserTrips()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your Saved Trips</h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground">
              View and manage your saved travel itineraries.
            </p>
          </div>
          <SavedTripsList initialTrips={trips} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
