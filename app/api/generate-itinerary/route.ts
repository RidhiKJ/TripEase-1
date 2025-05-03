import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // In production, we would use an environment variable for the Flask API URL
    const flaskApiUrl = process.env.FLASK_API_URL || "http://localhost:5000/generate-itinerary"

    // If we're in a serverless environment where we can't connect to localhost,
    // return mock data instead
    if (process.env.NODE_ENV === "production" && !process.env.FLASK_API_URL) {
      const { destination, duration, budget, interests } = data

      return NextResponse.json({
        itinerary: `# ${destination} Itinerary

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
- Local customs: Research local etiquette before your trip`,
      })
    }

    // Forward the request to the Flask backend
    const response = await fetch(flaskApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(errorData, { status: response.status })
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error generating itinerary:", error)
    return NextResponse.json({ error: "Failed to generate itinerary" }, { status: 500 })
  }
}
