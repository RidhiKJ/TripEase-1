"use client"

import { useState } from "react"
import {
  CalendarIcon,
  MapPin,
  ArrowRight,
  Check,
  Globe,
  Sparkles,
  Compass,
  Utensils,
  Coffee,
  Bed,
  Camera,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const travelTypes = [
  { id: "solo", label: "Solo", icon: "👤" },
  { id: "couple", label: "Couple", icon: "💑" },
  { id: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
  { id: "group", label: "Group", icon: "👥" },
]

const interestOptions = [
  { id: "adventure", label: "Adventure", icon: "🧗‍♂️", color: "bg-sunset-100 text-sunset-700 border-sunset-200" },
  { id: "culture", label: "Culture", icon: "🏛️", color: "bg-ocean-100 text-ocean-700 border-ocean-200" },
  { id: "food", label: "Food", icon: "🍽️", color: "bg-tropical-100 text-tropical-700 border-tropical-200" },
  { id: "nature", label: "Nature", icon: "🌲", color: "bg-tropical-100 text-tropical-700 border-tropical-200" },
  { id: "nightlife", label: "Nightlife", icon: "🌃", color: "bg-sunset-100 text-sunset-700 border-sunset-200" },
  { id: "shopping", label: "Shopping", icon: "🛍️", color: "bg-ocean-100 text-ocean-700 border-ocean-200" },
  { id: "relaxation", label: "Relaxation", icon: "🧘", color: "bg-tropical-100 text-tropical-700 border-tropical-200" },
  { id: "history", label: "History", icon: "🏺", color: "bg-ocean-100 text-ocean-700 border-ocean-200" },
  { id: "art", label: "Art", icon: "🎨", color: "bg-sunset-100 text-sunset-700 border-sunset-200" },
  { id: "sports", label: "Sports", icon: "⚽", color: "bg-ocean-100 text-ocean-700 border-ocean-200" },
]

const accommodationOptions = [
  { id: "hotel", label: "Hotels", icon: "🏨" },
  { id: "hostel", label: "Hostels", icon: "🛏️" },
  { id: "apartment", label: "Apartments", icon: "🏢" },
  { id: "resort", label: "Resorts", icon: "🌴" },
  { id: "camping", label: "Camping", icon: "⛺" },
]

const cuisineOptions = [
  { id: "local", label: "Local Cuisine", icon: "🍲" },
  { id: "street", label: "Street Food", icon: "🥘" },
  { id: "fine", label: "Fine Dining", icon: "🍷" },
  { id: "vegetarian", label: "Vegetarian", icon: "🥗" },
  { id: "desserts", label: "Desserts & Sweets", icon: "🍰" },
]

export function TripPlannerForm() {
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

  // Accommodations
  const [selectedAccommodations, setSelectedAccommodations] = useState<string[]>([])

  // Cuisine
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])

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

  const handleAccommodationChange = (id: string) => {
    setSelectedAccommodations((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleCuisineChange = (id: string) => {
    setSelectedCuisines((prev) => {
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
      alert("Please provide a destination.")
      return
    }

    setIsGenerating(true)

    try {
      const duration = calculateDuration()

      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination,
          duration,
          budget,
          interests: selectedInterests,
          accommodations: selectedAccommodations,
          cuisines: selectedCuisines,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate itinerary")
      }

      const data = await response.json()
      setItinerary(data.itinerary)
      setCurrentStep(4) // Move to results step
    } catch (error) {
      alert("Failed to generate itinerary. Please try again.")
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
    // Split by sections (headers)
    const sections = text.split(/^##\s+/m)

    return (
      <>
        {/* Process the first section (days) */}
        <div className="mb-8">
          {sections[0].split(/Day \d+:/).map((day, index) => {
            if (index === 0) return null // Skip the title part

            const dayTitle = `Day ${index}:${day.split("\n")[0]}`
            const dayContent = day.substring(day.indexOf("\n")).trim()

            return (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-ocean-700">{dayTitle}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {dayContent
                    .split("- ")
                    .filter(Boolean)
                    .map((item, i) => (
                      <li key={i} className="text-muted-foreground">
                        {item.trim()}
                      </li>
                    ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Process the remaining sections */}
        <Tabs defaultValue="accommodations" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="accommodations" className="flex items-center gap-1">
              <Bed className="h-4 w-4" /> Accommodations
            </TabsTrigger>
            <TabsTrigger value="attractions" className="flex items-center gap-1">
              <Camera className="h-4 w-4" /> Attractions
            </TabsTrigger>
            <TabsTrigger value="cuisine" className="flex items-center gap-1">
              <Utensils className="h-4 w-4" /> Cuisine
            </TabsTrigger>
            <TabsTrigger value="beverages" className="flex items-center gap-1">
              <Coffee className="h-4 w-4" /> Beverages
            </TabsTrigger>
            <TabsTrigger value="transport" className="flex items-center gap-1">
              <Globe className="h-4 w-4" /> Transport
            </TabsTrigger>
          </TabsList>

          {sections.slice(1).map((section, index) => {
            const sectionTitle = section.split("\n")[0].trim()
            const sectionContent = section.substring(section.indexOf("\n")).trim()

            let tabValue = "accommodations"
            if (sectionTitle.includes("Attractions")) tabValue = "attractions"
            else if (sectionTitle.includes("Cuisine")) tabValue = "cuisine"
            else if (sectionTitle.includes("Beverages")) tabValue = "beverages"
            else if (sectionTitle.includes("Getting Around")) tabValue = "transport"

            return (
              <TabsContent key={index} value={tabValue} className="border rounded-lg p-4 bg-white">
                <h3 className="text-lg font-semibold mb-3 text-ocean-700">{sectionTitle}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {sectionContent
                    .split("- ")
                    .filter(Boolean)
                    .map((item, i) => (
                      <li key={i} className="text-muted-foreground">
                        {item.trim()}
                      </li>
                    ))}
                </ul>
              </TabsContent>
            )
          })}
        </Tabs>

        {/* Travel Tips */}
        <div className="mt-8 p-4 bg-ocean-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-ocean-700">Travel Tips</h3>
          <ul className="list-disc pl-5 space-y-1">
            {text
              .split("Travel Tips:")[1]
              .split("- ")
              .filter(Boolean)
              .map((tip, i) => (
                <li key={i} className="text-muted-foreground">
                  {tip.trim()}
                </li>
              ))}
          </ul>
        </div>
      </>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-ocean-50 via-white to-sunset-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <div className="inline-block p-1 bg-gradient-to-r from-ocean-500 via-tropical-500 to-sunset-500 rounded-full">
            <div className="bg-white dark:bg-gray-950 rounded-full px-4 py-1.5">
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-ocean-500 via-tropical-500 to-sunset-500">
                AI TRAVEL PLANNER
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-ocean-600 to-tropical-600">
            Create Your Dream Vacation
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Tell us about your dream trip and our AI will create the perfect itinerary tailored just for you.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          {currentStep < 4 ? (
            <Card className="border-none shadow-xl overflow-hidden bg-white">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ocean-500 via-tropical-500 to-sunset-500"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 text-center",
                        currentStep >= 1
                          ? "bg-ocean-500 border-ocean-500 text-white"
                          : "text-muted-foreground border-muted",
                      )}
                    >
                      {currentStep > 1 ? <Check className="h-5 w-5" /> : <Globe className="h-5 w-5" />}
                    </div>
                    <Separator className="w-12 bg-gradient-to-r from-ocean-200 to-tropical-200" />
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 text-center",
                        currentStep >= 2
                          ? "bg-tropical-500 border-tropical-500 text-white"
                          : "text-muted-foreground border-muted",
                      )}
                    >
                      {currentStep > 2 ? <Check className="h-5 w-5" /> : <Compass className="h-5 w-5" />}
                    </div>
                    <Separator className="w-12 bg-gradient-to-r from-tropical-200 to-sunset-200" />
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 text-center",
                        currentStep >= 3
                          ? "bg-sunset-500 border-sunset-500 text-white"
                          : "text-muted-foreground border-muted",
                      )}
                    >
                      <Sparkles className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl">
                  {currentStep === 1 && "Where do you want to go?"}
                  {currentStep === 2 && "What's your travel style?"}
                  {currentStep === 3 && "What are you interested in?"}
                </CardTitle>
                <CardDescription className="text-base">
                  {currentStep === 1 && "Tell us about your destination and travel dates"}
                  {currentStep === 2 && "Help us understand your budget and travel preferences"}
                  {currentStep === 3 && "Select activities, accommodations, and dining experiences you'd enjoy"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="origin" className="text-base">
                          Origin
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-5 w-5 text-ocean-500" />
                          <Input
                            id="origin"
                            placeholder="Where are you traveling from?"
                            className="pl-10 py-6 text-base border-ocean-200 focus-visible:ring-ocean-500"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destination" className="text-base">
                          Destination
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-5 w-5 text-sunset-500" />
                          <Input
                            id="destination"
                            placeholder="Where would you like to go?"
                            className="pl-10 py-6 text-base border-sunset-200 focus-visible:ring-sunset-500"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="start-date" className="text-base">
                          Start Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="start-date"
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal py-6 text-base border-ocean-200",
                                !startDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-5 w-5 text-ocean-500" />
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
                              className="border-ocean-200"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-date" className="text-base">
                          End Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="end-date"
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal py-6 text-base border-sunset-200",
                                !endDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-5 w-5 text-sunset-500" />
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
                              className="border-sunset-200"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <Label className="text-base">What's your budget?</Label>
                      <RadioGroup defaultValue={budget} onValueChange={setBudget} className="grid grid-cols-3 gap-4">
                        <div>
                          <RadioGroupItem value="low" id="budget-low" className="peer sr-only" />
                          <Label
                            htmlFor="budget-low"
                            className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-ocean-500 [&:has([data-state=checked])]:border-ocean-500 transition-all"
                          >
                            <span className="text-2xl mb-1">💰</span>
                            <span className="text-base font-medium">Budget</span>
                            <span className="text-xs text-muted-foreground">Under $1,000</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="medium" id="budget-medium" className="peer sr-only" />
                          <Label
                            htmlFor="budget-medium"
                            className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-tropical-500 [&:has([data-state=checked])]:border-tropical-500 transition-all"
                          >
                            <span className="text-2xl mb-1">💰💰</span>
                            <span className="text-base font-medium">Moderate</span>
                            <span className="text-xs text-muted-foreground">$1,000 - $3,000</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="high" id="budget-high" className="peer sr-only" />
                          <Label
                            htmlFor="budget-high"
                            className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-sunset-500 [&:has([data-state=checked])]:border-sunset-500 transition-all"
                          >
                            <span className="text-2xl mb-1">💰💰💰</span>
                            <span className="text-base font-medium">Luxury</span>
                            <span className="text-xs text-muted-foreground">$3,000+</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-base">Who are you traveling with?</Label>
                      <div className="flex flex-wrap gap-3">
                        {travelTypes.map((type) => (
                          <Badge
                            key={type.id}
                            variant={travelType.includes(type.id) ? "default" : "outline"}
                            className={`cursor-pointer px-4 py-2 text-base rounded-full ${
                              travelType.includes(type.id)
                                ? "bg-tropical-500 hover:bg-tropical-600 text-white"
                                : "hover:bg-tropical-100 hover:text-tropical-700"
                            }`}
                            onClick={() => handleTravelTypeChange(type.id)}
                          >
                            <span className="mr-1">{type.icon}</span> {type.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label className="text-base">What experiences are you looking for?</Label>
                      <p className="text-sm text-muted-foreground">
                        Select the activities and experiences you're interested in to help us create your perfect
                        itinerary.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {interestOptions.map((interest) => (
                          <div
                            key={interest.id}
                            className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedInterests.includes(interest.id)
                                ? interest.color
                                : "border-muted hover:border-gray-300"
                            }`}
                            onClick={() => handleInterestChange(interest.id)}
                          >
                            <Checkbox
                              id={`interest-${interest.id}`}
                              checked={selectedInterests.includes(interest.id)}
                              className="data-[state=checked]:bg-transparent data-[state=checked]:text-current"
                            />
                            <Label htmlFor={`interest-${interest.id}`} className="cursor-pointer flex items-center">
                              <span className="mr-2 text-xl">{interest.icon}</span> {interest.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-base">Preferred Accommodations</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {accommodationOptions.map((option) => (
                          <div
                            key={option.id}
                            className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedAccommodations.includes(option.id)
                                ? "bg-ocean-100 text-ocean-700 border-ocean-200"
                                : "border-muted hover:border-gray-300"
                            }`}
                            onClick={() => handleAccommodationChange(option.id)}
                          >
                            <Checkbox
                              id={`accommodation-${option.id}`}
                              checked={selectedAccommodations.includes(option.id)}
                              className="data-[state=checked]:bg-transparent data-[state=checked]:text-current"
                            />
                            <Label htmlFor={`accommodation-${option.id}`} className="cursor-pointer flex items-center">
                              <span className="mr-2 text-xl">{option.icon}</span> {option.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-base">Dining Preferences</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {cuisineOptions.map((option) => (
                          <div
                            key={option.id}
                            className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedCuisines.includes(option.id)
                                ? "bg-sunset-100 text-sunset-700 border-sunset-200"
                                : "border-muted hover:border-gray-300"
                            }`}
                            onClick={() => handleCuisineChange(option.id)}
                          >
                            <Checkbox
                              id={`cuisine-${option.id}`}
                              checked={selectedCuisines.includes(option.id)}
                              className="data-[state=checked]:bg-transparent data-[state=checked]:text-current"
                            />
                            <Label htmlFor={`cuisine-${option.id}`} className="cursor-pointer flex items-center">
                              <span className="mr-2 text-xl">{option.icon}</span> {option.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="border-ocean-200 text-ocean-700 hover:bg-ocean-50"
                >
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  className={`${
                    currentStep === 1
                      ? "bg-ocean-500 hover:bg-ocean-600"
                      : currentStep === 2
                        ? "bg-tropical-500 hover:bg-tropical-600"
                        : "bg-sunset-500 hover:bg-sunset-600"
                  } text-white px-8`}
                >
                  {currentStep < 3 ? (
                    <>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "Create My Itinerary"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div>
              {isGenerating ? (
                <Card className="flex flex-col items-center justify-center p-12 border-none shadow-xl bg-white">
                  <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-ocean-500 animate-spin"></div>
                    <div
                      className="absolute inset-3 rounded-full border-t-4 border-b-4 border-tropical-500 animate-spin"
                      style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
                    ></div>
                    <div
                      className="absolute inset-6 rounded-full border-t-4 border-b-4 border-sunset-500 animate-spin"
                      style={{ animationDuration: "2s" }}
                    ></div>
                    <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-ocean-600 via-tropical-600 to-sunset-600">
                    Creating Your Dream Itinerary
                  </h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    Our AI is crafting a personalized travel plan based on your preferences. This may take a moment...
                  </p>
                </Card>
              ) : (
                <Card className="border-none shadow-xl overflow-hidden bg-white">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ocean-500 via-tropical-500 to-sunset-500"></div>
                  <CardHeader className="pb-4 border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-ocean-600 to-tropical-600">
                          Your {destination} Adventure
                        </CardTitle>
                        <CardDescription className="text-base">
                          {startDate &&
                            endDate &&
                            `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")} • `}
                          {budget === "low" && "Budget-Friendly"}
                          {budget === "medium" && "Moderately Priced"}
                          {budget === "high" && "Luxury Experience"}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-ocean-100 text-ocean-700 hover:bg-ocean-200">AI Generated</Badge>
                        <Badge className="bg-sunset-100 text-sunset-700 hover:bg-sunset-200">Personalized</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="prose prose-sm sm:prose max-w-none">
                      {itinerary ? formatItinerary(itinerary) : <p>No itinerary generated yet.</p>}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="border-ocean-200 text-ocean-700 hover:bg-ocean-50"
                    >
                      Plan Another Trip
                    </Button>
                    <Button
                      onClick={() => alert("Feature coming soon!")}
                      className="bg-sunset-500 hover:bg-sunset-600 text-white"
                    >
                      Save Itinerary
                    </Button>
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
