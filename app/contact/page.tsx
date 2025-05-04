import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone, Clock } from "lucide-react"

export const metadata = {
  title: "Contact - TravelAI",
  description: "Get in touch with our team for support or inquiries.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-b from-ocean-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <div className="inline-block p-1 bg-gradient-to-r from-ocean-500 via-tropical-500 to-sunset-500 rounded-full">
                <div className="bg-white dark:bg-gray-950 rounded-full px-4 py-1.5">
                  <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-ocean-500 via-tropical-500 to-sunset-500">
                    GET IN TOUCH
                  </span>
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-ocean-600 to-tropical-600">
                Contact Us
              </h1>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                Have questions or feedback? We're here to help you plan your perfect adventure.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-none shadow-lg overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-ocean-500 to-tropical-500"></div>
                <CardHeader>
                  <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-ocean-600 to-tropical-600">
                    Send Us a Message
                  </CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name" className="text-ocean-700">
                          First name
                        </Label>
                        <Input
                          id="first-name"
                          placeholder="John"
                          className="border-ocean-200 focus-visible:ring-ocean-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name" className="text-tropical-700">
                          Last name
                        </Label>
                        <Input
                          id="last-name"
                          placeholder="Doe"
                          className="border-tropical-200 focus-visible:ring-tropical-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-ocean-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        placeholder="john.doe@example.com"
                        type="email"
                        className="border-ocean-200 focus-visible:ring-ocean-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-tropical-700">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        placeholder="How can we help you?"
                        className="border-tropical-200 focus-visible:ring-tropical-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sunset-700">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide as much detail as possible..."
                        className="min-h-[120px] border-sunset-200 focus-visible:ring-sunset-500"
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-ocean-500 to-tropical-500 hover:from-ocean-600 hover:to-tropical-600 text-white">
                    Send Message
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-8">
                <Card className="border-none shadow-lg overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-tropical-500 to-sunset-500"></div>
                  <CardHeader>
                    <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-tropical-600 to-sunset-600">
                      Contact Information
                    </CardTitle>
                    <CardDescription className="text-base">
                      Reach out to us through any of these channels.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-full bg-ocean-100">
                        <Mail className="h-5 w-5 text-ocean-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-ocean-700">Email</h3>
                        <p className="text-sm text-muted-foreground">info@travelai.example.com</p>
                        <p className="text-sm text-muted-foreground">support@travelai.example.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-full bg-tropical-100">
                        <Phone className="h-5 w-5 text-tropical-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-tropical-700">Phone</h3>
                        <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-full bg-sunset-100">
                        <MapPin className="h-5 w-5 text-sunset-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sunset-700">Office</h3>
                        <p className="text-sm text-muted-foreground">123 Travel Street</p>
                        <p className="text-sm text-muted-foreground">San Francisco, CA 94103</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-full bg-ocean-100">
                        <Clock className="h-5 w-5 text-ocean-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-ocean-700">Business Hours</h3>
                        <p className="text-sm text-muted-foreground">Monday-Friday: 9am-5pm EST</p>
                        <p className="text-sm text-muted-foreground">Saturday: 10am-2pm EST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-sunset-500 to-ocean-500"></div>
                  <CardHeader>
                    <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-sunset-600 to-ocean-600">
                      Frequently Asked Questions
                    </CardTitle>
                    <CardDescription className="text-base">Quick answers to common questions.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-sunset-50">
                      <h3 className="font-medium text-sunset-700">How does the AI generate itineraries?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Our AI analyzes your preferences, budget, and interests to create personalized recommendations
                        based on data from thousands of successful trips.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-ocean-50">
                      <h3 className="font-medium text-ocean-700">Is the service free to use?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Basic itinerary generation is free. Premium features require a subscription starting at
                        $9.99/month.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-tropical-50">
                      <h3 className="font-medium text-tropical-700">Can I modify the generated itinerary?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Yes, you can customize any part of your itinerary after it's generated. Our AI learns from your
                        changes to improve future recommendations.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
