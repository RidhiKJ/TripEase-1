import { NextResponse } from "next/server"

// Sample data for different destinations
const destinationData = {
  default: {
    accommodations: [
      "Luxury hotels with ocean views",
      "Boutique hotels in the city center",
      "Budget-friendly hostels",
      "Vacation rentals and apartments",
      "Eco-friendly resorts",
    ],
    attractions: [
      "Historical landmarks and monuments",
      "Museums and art galleries",
      "Natural parks and scenic viewpoints",
      "Local markets and shopping districts",
      "Cultural performances and entertainment",
    ],
    cuisine: [
      "Traditional local dishes",
      "Street food markets",
      "Fine dining experiences",
      "Regional specialties",
      "Fresh seafood restaurants",
    ],
    beverages: [
      "Local craft beers",
      "Regional wines",
      "Traditional spirits",
      "Specialty coffee shops",
      "Fresh fruit juices and smoothies",
    ],
    transportation: [
      "Public transit (subway, buses)",
      "Rental cars",
      "Bicycle rentals",
      "Walking tours",
      "Rideshare services",
    ],
  },
  Paris: {
    accommodations: [
      "Boutique hotels in Le Marais",
      "Luxury accommodations near Champs-Élysées",
      "Charming apartments in Montmartre",
      "Budget-friendly hostels in the Latin Quarter",
      "Historic hotels with Eiffel Tower views",
    ],
    attractions: [
      "Eiffel Tower",
      "Louvre Museum",
      "Notre-Dame Cathedral",
      "Montmartre and Sacré-Cœur",
      "Seine River cruise",
      "Arc de Triomphe",
      "Palace of Versailles (day trip)",
    ],
    cuisine: [
      "Croissants and pastries from local boulangeries",
      "French onion soup",
      "Coq au vin",
      "Beef bourguignon",
      "Escargot",
      "Macarons and fine chocolates",
    ],
    beverages: [
      "French wines (Bordeaux, Burgundy, Champagne)",
      "Café au lait at traditional cafés",
      "Pastis (anise-flavored spirit)",
      "Kir Royale cocktails",
      "Artisanal ciders",
    ],
    transportation: [
      "Paris Metro",
      "Public buses",
      "Vélib' bicycle sharing",
      "Walking through scenic neighborhoods",
      "River taxis on the Seine",
    ],
  },
  Tokyo: {
    accommodations: [
      "Capsule hotels for a unique experience",
      "Traditional ryokans with tatami floors",
      "Modern hotels in Shinjuku",
      "Business hotels in Tokyo Station area",
      "Luxury accommodations in Ginza",
    ],
    attractions: [
      "Tokyo Skytree",
      "Meiji Shrine",
      "Senso-ji Temple in Asakusa",
      "Shibuya Crossing",
      "Shinjuku Gyoen National Garden",
      "Akihabara Electric Town",
      "TeamLab Borderless digital art museum",
    ],
    cuisine: [
      "Fresh sushi and sashimi",
      "Ramen in specialty shops",
      "Tempura",
      "Okonomiyaki (savory pancakes)",
      "Wagyu beef",
      "Kaiseki (traditional multi-course meal)",
    ],
    beverages: [
      "Sake (rice wine)",
      "Matcha green tea",
      "Highball whisky drinks",
      "Umeshu (plum wine)",
      "Specialty coffee in trendy cafés",
    ],
    transportation: [
      "Tokyo Metro and subway lines",
      "JR Yamanote Line (loop around central Tokyo)",
      "Taxis (expensive but convenient)",
      "Rental bicycles",
      "Shinkansen (bullet train) for day trips",
    ],
  },
  "New York": {
    accommodations: [
      "Luxury hotels in Midtown Manhattan",
      "Boutique hotels in SoHo",
      "Budget options in Brooklyn",
      "Apartment rentals in the Upper West Side",
      "Historic hotels near Central Park",
    ],
    attractions: [
      "Empire State Building",
      "Statue of Liberty and Ellis Island",
      "Central Park",
      "Metropolitan Museum of Art",
      "Broadway shows",
      "Times Square",
      "Brooklyn Bridge",
    ],
    cuisine: [
      "New York-style pizza",
      "Bagels with lox and cream cheese",
      "Pastrami sandwiches at delis",
      "International cuisine in ethnic neighborhoods",
      "Food trucks and markets",
      "High-end dining experiences",
    ],
    beverages: [
      "Craft cocktails in speakeasy bars",
      "Local craft beers",
      "New York egg cream (contains neither eggs nor cream)",
      "Manhattan cocktail",
      "Artisanal coffee shops",
    ],
    transportation: [
      "Subway system",
      "Yellow taxis",
      "Rideshare services",
      "Staten Island Ferry (free)",
      "CitiBike bike sharing",
      "Walking (best for experiencing neighborhoods)",
    ],
  },
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { destination, duration, budget, interests } = data

    // Get destination-specific data or use default
    const destData = destinationData[destination] || destinationData.default

    // Select appropriate accommodations based on budget
    let accommodationOptions = destData.accommodations
    if (budget === "low") {
      accommodationOptions = accommodationOptions.filter(
        (a) =>
          a.toLowerCase().includes("budget") ||
          a.toLowerCase().includes("hostel") ||
          a.toLowerCase().includes("apartment"),
      )
    } else if (budget === "high") {
      accommodationOptions = accommodationOptions.filter(
        (a) => a.toLowerCase().includes("luxury") || !a.toLowerCase().includes("budget"),
      )
    }

    if (accommodationOptions.length === 0) {
      accommodationOptions = destData.accommodations
    }

    // Generate a colorful itinerary with emojis
    const itinerary = `# Your Amazing ${destination} Adventure ✨

Day 1: Arrival and Exploration 🌆
- Arrive at ${destination} International Airport
- Check-in at your accommodation and freshen up 🏨
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

## Recommended Accommodations 🏨
${accommodationOptions.map((item) => `- ${item}`).join("\n")}

## Must-See Attractions 🎭
${destData.attractions.map((item) => `- ${item}`).join("\n")}

## Local Cuisine to Try 🍽️
${destData.cuisine.map((item) => `- ${item}`).join("\n")}

## Beverages & Drinks 🍹
${destData.beverages.map((item) => `- ${item}`).join("\n")}

## Getting Around 🚆
${destData.transportation.map((item) => `- ${item}`).join("\n")}

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
