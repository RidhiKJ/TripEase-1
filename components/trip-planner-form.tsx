"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { CalendarIcon, Loader2, MapPin, ArrowRight, Check } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { generateItinerary } from "@/services/api"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const travelTypes = [
  { id: "solo", label: "Solo" },
  { id: "couple", label: "Couple" },
  { id: "family", label: "Family" },
  { id: "group", label: "Group" },
]

const interestOptions = [
  { id: "adventure", label: "Adventure" },
  { id: "culture", label: "Culture" },
  { id: "food", label: "Food" },
  { id: "nature", label: "Nature" },
  { id: "nightlife", label: "Nightlife" },
  { id: "shopping", label: "Shopping" },
  { id: "relaxation", label: "Relaxation" },
  { id: "history", label: "History" },
  { id: "art", label: "Art" },
  { id: "sports", label: "Sports" },
]

export function TripPlannerForm() {
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()

  // Form state
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [itinerary, setItinerary] = useState<string | null>(null)

  // Travel Details
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  // Preferences
  const [budget, setBudget] = useState<string>("medium")
  const [travelType, setTravelType] = useState<string[]>([])

  // Interests
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const handleTravelTypeChange = (id: string) => {
    setTravelType((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleInterestChange = (id: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const calculateDuration = () => {
    if (!startDate || !endDate) return "0"
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays.toString()
  }

  const handleGenerateItinerary = async () => {
    if (!destination) {
      toast({
        title: "Missing information",
        description: "Please provide a destination.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const duration = calculateDuration()
      const budgetMap: Record<string, string> = {
        low: "500",
        medium: "1500",
        high: "5000",
      }

      const response = await generateItinerary({
        destination,
        duration: duration === "0" ? "3" : duration, // Default to 3 days if no dates selected
        budget: budgetMap[budget] || "1500",
        interests: selectedInterests.join(", ") || "general tourism",
      })

      setItinerary(response.itinerary)
      setCurrentStep(4) // Move to results step
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate itinerary. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handleGenerateItinerary()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const formatItinerary = (text: string) => {
    // Split by days or sections
    const sections = text.split(/Day \d+:|(?:\r\n|\r|\n){2,}/).filter(Boolean)

    return sections.map((section, index) => {
      const title = section.split(/(?:\r\n|\r|\n)/)[0].trim()
      const content = section.substring(title.length).trim()

      return (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground whitespace-pre-line">{content}</p>
        </div>
      )
    })
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Plan Your Trip with AI</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Tell us about your dream trip and our AI will create the perfect itinerary for you.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          {currentStep < 4 ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border text-center",
                        currentStep >= 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                      )}
                    >
                      {currentStep > 1 ? <Check className="h-4 w-4" /> : "1"}
                    </div>
                    <Separator className="w-8" />
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border text-center",
                        currentStep >= 2 ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                      )}
                    >
                      {currentStep > 2 ? <Check className="h-4 w-4" /> : "2"}
                    </div>
                    <Separator className="w-8" />
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border text-center",
                        currentStep >= 3 ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                      )}
                    >
                      3
                    </div>
                  </div>
                </div>
                <CardTitle>
                  {currentStep === 1 && "Travel Details"}
                  {currentStep === 2 && "Preferences"}
                  {currentStep === 3 && "Interests"}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Enter your origin, destination, and travel dates"}
                  {currentStep === 2 && "Select your budget and travel type"}
                  {currentStep === 3 && "Choose your interests for personalized recommendations"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentStep === 1 && (
                  <div className="space-y-6">
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
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={setStartDate}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
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
                            <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={setEndDate}
                              initialFocus
                              disabled={(date) => date < (startDate || new Date())}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label>Budget</Label>
                      <RadioGroup defaultValue={budget} onValueChange={setBudget} className="grid grid-cols-3 gap-4">
                        <div>
                          <RadioGroupItem value="low" id="budget-low" className="peer sr-only" />
                          <Label
                            htmlFor="budget-low"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <span className="text-sm font-medium">Low</span>
                            <span className="text-xs text-muted-foreground">Under $1,000</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="medium" id="budget-medium" className="peer sr-only" />
                          <Label
                            htmlFor="budget-medium"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <span className="text-sm font-medium">Medium</span>
                            <span className="text-xs text-muted-foreground">$1,000 - $3,000</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="high" id="budget-high" className="peer sr-only" />
                          <Label
                            htmlFor="budget-high"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <span className="text-sm font-medium">High</span>
                            <span className="text-xs text-muted-foreground">$3,000+</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label>Travel Type</Label>
                      <div className="flex flex-wrap gap-3">
                        {travelTypes.map((type) => (
                          <Badge
                            key={type.id}
                            variant={travelType.includes(type.id) ? "default" : "outline"}
                            className="cursor-pointer px-3 py-1 text-sm"
                            onClick={() => handleTravelTypeChange(type.id)}
                          >
                            {type.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label>Select Your Interests</Label>
                      <p className="text-sm text-muted-foreground">
                        Choose the activities and experiences you're interested in.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {interestOptions.map((interest) => (
                          <div key={interest.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`interest-${interest.id}`}
                              checked={selectedInterests.includes(interest.id)}
                              onCheckedChange={() => handleInterestChange(interest.id)}
                            />
                            <Label htmlFor={`interest-${interest.id}`}>{interest.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                  Back
                </Button>
                <Button onClick={nextStep}>
                  {currentStep < 3 ? (
                    <>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "Generate Itinerary"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div>
              {isGenerating ? (
                <Card className="flex flex-col items-center justify-center p-12">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Generating Your Perfect Itinerary</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    Our AI is crafting a personalized travel plan based on your preferences. This may take a moment...
                  </p>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Your Personalized Travel Itinerary</CardTitle>
                    <CardDescription>
                      {destination && `Destination: ${destination}`}
                      {startDate && endDate && ` • ${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`}
                      {budget && ` • ${budget.charAt(0).toUpperCase() + budget.slice(1)} Budget`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm sm:prose max-w-none">
                      {itinerary ? formatItinerary(itinerary) : <p>No itinerary generated yet.</p>}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      Plan Another Trip
                    </Button>
                    {session ? (
                      <Button
                        onClick={() => {
                          toast({
                            title: "Success",
                            description: "Itinerary saved to your account.",
                          })
                        }}
                      >
                        Save Itinerary
                      </Button>
                    ) : (
                      <Button onClick={() => router.push("/auth/signin")}>Sign In to Save</Button>
                    )}
                  </CardFooter>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
