// API service for interacting with the backend

export interface ItineraryRequest {
  destination: string
  duration: string
  budget: string
  interests: string
}

export interface ItineraryResponse {
  itinerary: string
}

export async function generateItinerary(data: ItineraryRequest): Promise<ItineraryResponse> {
  try {
    // Use the Next.js API route
    const apiUrl = "/api/generate-itinerary"

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error generating itinerary:", error)

    // Fallback response if the API call fails
    return {
      itinerary: `# ${data.destination} Itinerary

Day 1: Arrival and Orientation
- Arrive at ${data.destination} International Airport
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
    }
  }
}
