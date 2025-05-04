import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, TreePalmIcon as PalmTree, Plane, Sun, Umbrella } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-600/90 via-ocean-500/80 to-tropical-600/70"></div>
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Travel destinations collage"
          fill
          className="object-cover mix-blend-overlay opacity-60"
          priority
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 hidden md:block">
        <Plane className="h-12 w-12 text-white/30 animate-float" />
      </div>
      <div className="absolute bottom-20 right-10 hidden md:block">
        <PalmTree className="h-16 w-16 text-white/20 animate-float" style={{ animationDelay: "1s" }} />
      </div>
      <div className="absolute top-40 right-20 hidden md:block">
        <Sun className="h-10 w-10 text-sunset-300/40 animate-pulse-gentle" />
      </div>
      <div className="absolute bottom-40 left-20 hidden md:block">
        <Umbrella className="h-12 w-12 text-tropical-300/30 animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-md">
              Discover Your <span className="text-sunset-300">Perfect Adventure</span> with AI
            </h1>
            <p className="mx-auto max-w-[800px] text-lg sm:text-xl md:text-2xl text-white/90 drop-shadow">
              Let our AI create personalized travel itineraries tailored to your dreams, preferences, and budget. Your
              next unforgettable journey is just a few clicks away.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              size="lg"
              className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              <a href="/plan-trip" className="flex items-center gap-2">
                Start Planning <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30 px-8 py-6 text-lg rounded-full shadow-lg"
            >
              Explore Destinations
            </Button>
          </div>
          <div className="pt-8 flex items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-white/80 text-sm">Destinations</p>
            </div>
            <div className="h-12 border-l border-white/20"></div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-white">10k+</p>
              <p className="text-white/80 text-sm">Happy Travelers</p>
            </div>
            <div className="h-12 border-l border-white/20"></div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-white">98%</p>
              <p className="text-white/80 text-sm">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
