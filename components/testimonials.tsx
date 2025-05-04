import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

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
  },
]

export function Testimonials() {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Travelers Say</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground">
            Hear from travelers who have used our AI-powered platform to plan their perfect trips.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
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
                        i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
