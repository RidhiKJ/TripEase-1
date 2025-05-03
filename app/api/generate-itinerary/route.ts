import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { destination, duration, budget, interests } = data

    // Generate a simple itinerary without relying on external APIs
    const itinerary = `# ${destination} Itinerary

Day 1: Arrival and Orientation
- Arrive at ${destination} International Airport
- Check-in at your hotel and rest
- Evening walk around the city center to get oriented
- Dinner at a local restaurant to try authentic cuisine

Day 2: Cultural Exploration
- Visit the main historical sites in the morning
- Lunch at a popular local spot
- Afternoon museum tour
- Evening entertainment district exploration

Day 3: Nature and Relaxation
- Morning hike or park visit
- Lunch with scenic views
- Afternoon shopping for souvenirs
- Farewell dinner at a highly-rated restaurant

Travel Tips:
- Local currency: Check exchange rates before arrival
- Transportation: Public transit is recommended
- Weather: Pack accordingly for the season
- Local customs: Research local etiquette before your trip`

    return NextResponse.json({ itinerary })
  } catch (error) {
    console.error("Error generating itinerary:", error)
    return NextResponse.json({ error: "Failed to generate itinerary" }, { status: 500 })
  }
}
