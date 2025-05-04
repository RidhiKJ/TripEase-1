import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { destination, duration, budget, interests } = data

    // Generate a colorful itinerary with emojis
    const itinerary = `# Your Amazing ${destination} Adventure ✨

Day 1: Arrival and Exploration 🌆
- Arrive at ${destination} International Airport
- Check-in at your hotel and freshen up 🏨
- Evening walking tour of the city center 🚶‍♂️
- Welcome dinner at a local restaurant featuring authentic cuisine 🍽️

Day 2: Cultural Immersion 🏛️
- Morning visit to the top historical sites and landmarks 🗿
- Lunch at a popular local café ☕
- Afternoon museum or art gallery tour 🎨
- Evening cultural performance or entertainment 🎭

Day 3: Nature and Adventure 🌳
- Morning excursion to nearby natural attractions 🌊
- Picnic lunch with scenic views 🧺
- Afternoon leisure activities or adventure sports 🚵‍♀️
- Farewell dinner at a highly-rated restaurant 🍷

Travel Tips:
- Local currency: Check exchange rates before arrival 💰
- Transportation: Public transit is convenient and affordable 🚆
- Weather: ${destination} is lovely this time of year ☀️
- Local customs: Respect local traditions and dress codes 👗`

    // Simulate a delay to make it feel like AI processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({ itinerary })
  } catch (error) {
    console.error("Error generating itinerary:", error)
    return NextResponse.json({ error: "Failed to generate itinerary" }, { status: 500 })
  }
}
