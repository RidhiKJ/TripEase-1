import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/80">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Travel destinations collage"
          fill
          className="object-cover opacity-20 mix-blend-overlay"
          priority
        />
      </div>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Plan Your Perfect Trip with AI
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Discover personalized travel itineraries tailored to your preferences. Let our AI assistant help you
              create unforgettable experiences.
            </p>
          </div>
          <div className="space-x-4">
            <Button size="lg" className="px-8" asChild>
              <a href="/plan-trip">Start Planning</a>
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
