"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { CalendarIcon, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { saveTrip } from "@/actions/trip-actions"
import { useToast } from "@/hooks/use-toast"

export function TripPlanningForm() {
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")
  const [interests, setInterests] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleGenerateItinerary = async () => {
    // Here you would typically call your AI service to generate an itinerary
    // For now, we'll just show a toast message
    toast({
      title: "Generating itinerary",
      description: "Your personalized itinerary is being created.",
    })
  }

  const handleSaveTrip = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save your trip.",
        variant: "destructive",
      })
      router.push("/auth/signin")
      return
    }

    if (!title || !destination) {
      toast({
        title: "Missing information",
        description: "Please provide at least a title and destination.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("origin", origin)
      formData.append("destination", destination)
      if (startDate) formData.append("startDate", startDate.toISOString())
      if (endDate) formData.append("endDate", endDate.toISOString())
      formData.append("budget", budget)
      formData.append("interests", interests)

      const result = await saveTrip(formData)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Your trip has been saved successfully.",
        })
        router.push("/saved-trips")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save trip. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Where Would You Like to Go?</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground">
            Tell us about your dream trip and our AI will create the perfect itinerary for you.
          </p>
        </div>

        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
            <CardDescription>Fill in the details below to get personalized travel recommendations.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-6" onSubmit={handleSaveTrip}>
              <div className="space-y-2">
                <Label htmlFor="title">Trip Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Summer Vacation in Italy"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="origin"
                      placeholder="Where are you traveling from?"
                      className="pl-9"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="destination"
                      placeholder="Where would you like to go?"
                      className="pl-9"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="start-date"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="end-date"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Select onValueChange={setBudget}>
                    <SelectTrigger id="budget">
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget (Under $1,000)</SelectItem>
                      <SelectItem value="moderate">Moderate ($1,000 - $3,000)</SelectItem>
                      <SelectItem value="luxury">Luxury ($3,000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Interests</Label>
                  <Select onValueChange={setInterests}>
                    <SelectTrigger id="interests">
                      <SelectValue placeholder="What are you interested in?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adventure">Adventure & Outdoors</SelectItem>
                      <SelectItem value="culture">Culture & History</SelectItem>
                      <SelectItem value="food">Food & Culinary</SelectItem>
                      <SelectItem value="relaxation">Relaxation & Wellness</SelectItem>
                      <SelectItem value="family">Family Friendly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add any additional details about your trip"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button type="button" size="lg" className="w-full sm:w-auto px-8" onClick={handleGenerateItinerary}>
                  Generate Itinerary
                </Button>
                <Button
                  type="submit"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Trip"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
