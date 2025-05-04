"use client"

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"
import { useState } from "react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "SJ",
    role: "Travel Enthusiast",
    content:
      "The AI-powered itinerary was spot on! It suggested places I wouldn't have found on my own and saved me hours of planning. My trip to Portugal was perfect thanks to TravelAI.",
    rating: 5,
    color: "ocean",
    location: "Portugal",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "MC",
    role: "Adventure Seeker",
    content:
      "I was skeptical at first, but the personalized recommendations were amazing. The app understood exactly what kind of adventure I was looking for in New Zealand.",
    rating: 5,
    color: "tropical",
    location: "New Zealand",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "ER",
    role: "Family Traveler",
    content:
      "Planning a family trip with kids is usually stressful, but TravelAI made it so easy. The kid-friendly activities and accommodations in our Italy itinerary were perfect.",
    rating: 4,
    color: "sunset",
    location: "Italy",
  },
]

export function Testimonials() {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-ocean-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <div className="inline-block p-1 bg-gradient-to-r from-ocean-500 via-tropical-500 to-sunset-500 rounded-full">
            <div className="bg-white dark:bg-gray-950 rounded-full px-4 py-1.5">
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-ocean-500 via-tropical-500 to-sunset-500">
                TRAVELER STORIES
              </span>
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Memories That Last a Lifetime</h2>
          <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
            Hear from travelers who have used our AI-powered platform to plan their perfect trips and create
            unforgettable experiences.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className={`h-full border-none shadow-lg transition-all duration-300 ${
                hoveredId === testimonial.id ? "shadow-xl -translate-y-1" : ""
              }`}
              onMouseEnter={() => setHoveredId(testimonial.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`h-2 w-full bg-${testimonial.color}-500 rounded-t-lg`}></div>
              <CardHeader className="pb-2 pt-6">
                <div className="flex items-center gap-4">
                  <Avatar className={`ring-2 ring-${testimonial.color}-200 ring-offset-2`}>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback className={`bg-${testimonial.color}-100 text-${testimonial.color}-700`}>
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? `text-${testimonial.color}-500 fill-${testimonial.color}-500`
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <div className="relative">
                  <Quote className={`absolute -top-1 -left-2 h-6 w-6 text-${testimonial.color}-200 rotate-180`} />
                  <p className="text-muted-foreground pt-2 pl-4">{testimonial.content}</p>
                </div>
                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <span className={`text-sm font-medium text-${testimonial.color}-600`}>
                    Trip to {testimonial.location}
                  </span>
                  <span className="text-xs text-muted-foreground">2 months ago</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
