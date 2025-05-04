"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Calendar, DollarSign, Heart } from "lucide-react"
import { useState } from "react"

const itineraries = [
  {
    id: 1,
    title: "Cultural Tour of Japan",
    description: "Explore the rich cultural heritage of Japan with visits to Tokyo, Kyoto, and Osaka.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "10 days",
    location: "Japan",
    season: "Spring",
    budget: "Moderate",
    tags: ["Culture", "History", "Food"],
    color: "ocean",
  },
  {
    id: 2,
    title: "Adventure in Costa Rica",
    description: "Experience thrilling adventures in the lush rainforests and beautiful beaches of Costa Rica.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "7 days",
    location: "Costa Rica",
    season: "Winter",
    budget: "Budget",
    tags: ["Adventure", "Nature", "Wildlife"],
    color: "tropical",
  },
  {
    id: 3,
    title: "Relaxing Santorini Getaway",
    description: "Unwind on the stunning island of Santorini with its breathtaking views and serene atmosphere.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "5 days",
    location: "Greece",
    season: "Summer",
    budget: "Luxury",
    tags: ["Relaxation", "Beach", "Romantic"],
    color: "sunset",
  },
]

export function SuggestedItineraries() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-ocean-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <Badge className="bg-ocean-100 text-ocean-700 hover:bg-ocean-200 px-4 py-1 rounded-full">Popular Trips</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-ocean-600 to-tropical-600">
            Trending Destinations
          </h2>
          <p className="mx-auto max-w-[800px] text-lg text-muted-foreground">
            Explore our curated collection of travel plans designed by our AI based on popular destinations and
            experiences that travelers are loving right now.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {itineraries.map((itinerary) => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-ocean-300 text-ocean-700 hover:bg-ocean-100 hover:text-ocean-800"
            asChild
          >
            <a href="/plan-trip">View More Destinations</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

function ItineraryCard({ itinerary }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const colorMap = {
    ocean: "from-ocean-500 to-ocean-700",
    tropical: "from-tropical-500 to-tropical-700",
    sunset: "from-sunset-500 to-sunset-700",
  }

  const gradientClass = colorMap[itinerary.color] || "from-ocean-500 to-ocean-700"

  return (
    <Card
      className="overflow-hidden border-none shadow-lg destination-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-b ${gradientClass} mix-blend-multiply z-10`}></div>
        <Image
          src={itinerary.image || "/placeholder.svg"}
          alt={itinerary.title}
          fill
          className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full ${isLiked ? "bg-white text-red-500" : "bg-white/30 text-white"} backdrop-blur-sm transition-colors`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <Badge className="bg-white/20 backdrop-blur-sm text-white border-none">{itinerary.budget}</Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{itinerary.title}</CardTitle>
        <CardDescription className="line-clamp-2">{itinerary.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-1.5">
            <Clock className={`h-4 w-4 text-${itinerary.color}-500`} />
            <span>{itinerary.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className={`h-4 w-4 text-${itinerary.color}-500`} />
            <span>{itinerary.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className={`h-4 w-4 text-${itinerary.color}-500`} />
            <span>{itinerary.season}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className={`h-4 w-4 text-${itinerary.color}-500`} />
            <span>{itinerary.budget}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {itinerary.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className={`text-xs bg-${itinerary.color}-100 text-${itinerary.color}-700 hover:bg-${itinerary.color}-200`}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className={`w-full bg-${itinerary.color}-500 hover:bg-${itinerary.color}-600 text-white`} asChild>
          <a href="/plan-trip">View Plan</a>
        </Button>
      </CardFooter>
    </Card>
  )
}
