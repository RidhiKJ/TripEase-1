"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Calendar, Clock, MapPin, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { deleteTrip } from "@/actions/trip-actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Trip = {
  id: string
  title: string
  description: string | null
  origin: string | null
  destination: string
  startDate: Date | null
  endDate: Date | null
  budget: string | null
  interests: string[]
  createdAt: Date
}

interface SavedTripsListProps {
  initialTrips: Trip[]
}

export function SavedTripsList({ initialTrips }: SavedTripsListProps) {
  const router = useRouter()
  const [trips, setTrips] = useState<Trip[]>(initialTrips)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteTrip = async (tripId: string) => {
    setIsDeleting(true)
    try {
      const result = await deleteTrip(tripId)
      if (result.success) {
        setTrips(trips.filter((trip) => trip.id !== tripId))
      }
    } catch (error) {
      console.error("Error deleting trip:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  if (trips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-muted p-3">
          <MapPin className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">No saved trips yet</h2>
        <p className="mt-2 text-muted-foreground">Start planning your next adventure and save your itineraries here.</p>
        <Button className="mt-6" onClick={() => router.push("/plan-trip")}>
          Plan a Trip
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {trips.map((trip) => (
        <Card key={trip.id} className="overflow-hidden">
          <div className="aspect-video relative">
            <Image src="/placeholder.svg?height=400&width=600" alt={trip.title} fill className="object-cover" />
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{trip.title}</CardTitle>
              {trip.budget && <Badge variant="outline">{trip.budget}</Badge>}
            </div>
            <CardDescription>{trip.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {trip.startDate && trip.endDate && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {Math.ceil(
                      (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24),
                    )}{" "}
                    days
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{trip.destination}</span>
              </div>
              {trip.startDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(trip.startDate), "MMM d, yyyy")}</span>
                </div>
              )}
            </div>
            {trip.interests.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {trip.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => router.push(`/trips/${trip.id}`)}>View Details</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this trip. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDeleteTrip(trip.id)} disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
