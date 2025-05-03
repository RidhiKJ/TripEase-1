import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Calendar, DollarSign } from "lucide-react"

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
  },
]

export function SuggestedItineraries() {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Suggested Itineraries</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground">
            Explore our curated collection of travel plans designed by our AI based on popular destinations and
            experiences.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {itineraries.map((itinerary) => (
            <Card key={itinerary.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={itinerary.image || "/placeholder.svg"}
                  alt={itinerary.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{itinerary.title}</CardTitle>
                  <Badge variant="outline">{itinerary.budget}</Badge>
                </div>
                <CardDescription>{itinerary.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{itinerary.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{itinerary.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{itinerary.season}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{itinerary.budget}</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {itinerary.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <a href="/plan-trip">View Plan</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="outline" asChild>
            <a href="/plan-trip">View More Itineraries</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
