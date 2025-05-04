"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

// In-memory storage for trips (replace with database in production)
const trips = []
let tripIdCounter = 1

export async function saveTrip(formData: FormData) {
  const session = await auth()

  if (!session || !session.user) {
    return {
      error: "You must be signed in to save a trip",
    }
  }

  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const origin = formData.get("origin") as string
    const destination = formData.get("destination") as string
    const startDateStr = formData.get("startDate") as string
    const endDateStr = formData.get("endDate") as string
    const budget = formData.get("budget") as string
    const interests = formData.get("interests") as string

    // Validate required fields
    if (!title || !destination) {
      return {
        error: "Title and destination are required",
      }
    }

    // Parse dates if provided
    const startDate = startDateStr ? new Date(startDateStr) : null
    const endDate = endDateStr ? new Date(endDateStr) : null

    // Parse interests into an array
    const interestsArray = interests ? interests.split(",").map((i) => i.trim()) : []

    const trip = {
      id: String(tripIdCounter++),
      title,
      description,
      origin,
      destination,
      startDate,
      endDate,
      budget,
      interests: interestsArray,
      userId: session.user.id,
      createdAt: new Date(),
    }

    trips.push(trip)

    revalidatePath("/saved-trips")

    return {
      success: true,
      trip,
    }
  } catch (error) {
    console.error("Error saving trip:", error)
    return {
      error: "Failed to save trip. Please try again.",
    }
  }
}

export async function getUserTrips() {
  const session = await auth()

  if (!session || !session.user) {
    return []
  }

  try {
    // Filter trips by user ID
    const userTrips = trips.filter((trip) => trip.userId === session.user.id)

    // Sort by creation date (newest first)
    return userTrips.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.error("Error fetching trips:", error)
    return []
  }
}

export async function deleteTrip(tripId: string) {
  const session = await auth()

  if (!session || !session.user) {
    return {
      error: "You must be signed in to delete a trip",
    }
  }

  try {
    // Check if the trip belongs to the user
    const tripIndex = trips.findIndex((trip) => trip.id === tripId && trip.userId === session.user.id)

    if (tripIndex === -1) {
      return {
        error: "Trip not found or you don't have permission to delete it",
      }
    }

    // Remove the trip
    trips.splice(tripIndex, 1)

    revalidatePath("/saved-trips")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error deleting trip:", error)
    return {
      error: "Failed to delete trip. Please try again.",
    }
  }
}
