"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Calendar as CalendarIcon,
  Clock,
  Music,
  Headphones,
  Award,
  MapPin,
  Instagram,
  Facebook,
  Globe,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock DJ data
const djData = {
  id: "dj-smith",
  name: "DJ Smith",
  tagline: "Wedding & Corporate Event Specialist",
  rating: 4.9,
  reviewCount: 127,
  location: "New York, NY",
  experience: "10+ years",
  bio: "DJ Smith is a versatile DJ with over a decade of experience specializing in weddings, corporate events, and private parties. Known for reading the crowd perfectly and creating unforgettable atmospheres, Smith has performed at over 500 events across the country.",
  profileImage:
    "https://images.unsplash.com/photo-1601643157091-ce5c665179ab?q=80&w=1000&auto=format&fit=crop",
  coverImage:
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop",
  genres: ["House", "Top 40", "Hip Hop", "R&B", "80s/90s", "Electronic"],
  equipment: [
    "Pioneer CDJ-3000",
    "DJM-900NXS2 Mixer",
    "Premium Sound System",
    "Lighting Package",
  ],
  socialMedia: {
    instagram: "djsmith",
    facebook: "djsmithofficial",
    website: "djsmith.com",
  },
  musicSamples: [
    {
      id: "mix-1",
      title: "Wedding Dance Floor Hits",
      duration: "12:45",
      genre: "Pop/Dance",
      coverArt:
        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "mix-2",
      title: "Corporate Event Ambient Mix",
      duration: "15:20",
      genre: "Lounge/Ambient",
      coverArt:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "mix-3",
      title: "Summer Party Vibes",
      duration: "18:30",
      genre: "House/EDM",
      coverArt:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "mix-4",
      title: "Hip Hop Classics Remix",
      duration: "14:15",
      genre: "Hip Hop",
      coverArt:
        "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=1000&auto=format&fit=crop",
    },
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Sarah & Michael",
      event: "Wedding",
      date: "June 15, 2024",
      content:
        "DJ Smith was absolutely amazing at our wedding! He kept the dance floor packed all night and perfectly mixed our requested songs with crowd pleasers. Highly recommend!",
      rating: 5,
    },
    {
      id: "test-2",
      name: "Acme Corporation",
      event: "Annual Gala",
      date: "December 10, 2024",
      content:
        "We've hired DJ Smith for our company events three years in a row. Professional, punctual, and always delivers the perfect atmosphere for our corporate gatherings.",
      rating: 5,
    },
    {
      id: "test-3",
      name: "Jennifer B.",
      event: "40th Birthday Party",
      date: "March 22, 2024",
      content:
        "DJ Smith made my 40th birthday party unforgettable! Great music selection and he was so accommodating with last-minute requests. Will definitely book again!",
      rating: 4,
    },
  ],
  upcomingEvents: [
    {
      id: "event-1",
      name: "Summer Beach Club",
      date: "July 15, 2025",
      location: "Oceanside Resort",
    },
    {
      id: "event-2",
      name: "Tech Conference After-Party",
      date: "August 5, 2025",
      location: "Downtown Convention Center",
    },
  ],
  pricing: {
    wedding: "$1,200 - $2,500",
    corporate: "$1,000 - $2,000",
    private: "$800 - $1,500",
  },
  availability: {
    booked: [
      new Date(2025, 5, 10),
      new Date(2025, 5, 11),
      new Date(2025, 5, 17),
      new Date(2025, 5, 24),
      new Date(2025, 5, 25),
      new Date(2025, 6, 1),
      new Date(2025, 6, 2),
    ],
  },
};

export default function DJProfilePage({ params }: { params: { id: string } }) {
  const [currentMix, setCurrentMix] = (useState < string) | (null > null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedDate, setSelectedDate] =
    (useState < Date) | (undefined > undefined);
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  // Function to check if a date is booked
  const isDateBooked = (date: Date) => {
    return djData.availability.booked.some(
      (bookedDate) =>
        bookedDate.getDate() === date.getDate() &&
        bookedDate.getMonth() === date.getMonth() &&
        bookedDate.getFullYear() === date.getFullYear()
    );
  };

  // Function to toggle play/pause for a mix
  const togglePlay = (mixId: string) => {
    if (currentMix === mixId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentMix(mixId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={djData.coverImage}
          alt={`${djData.name} cover image`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Section */}
          <div className="md:w-1/3">
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-[300px]">
                <Image
                  src={djData.profileImage}
                  alt={djData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h1 className="text-2xl font-bold">{djData.name}</h1>
                  <p className="text-muted-foreground">{djData.tagline}</p>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-medium">{djData.rating}</span>
                  </div>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {djData.reviewCount} reviews
                  </span>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{djData.location}</span>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{djData.experience} experience</span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {djData.genres.map((genre) => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Equipment</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {djData.equipment.map((item) => (
                      <li key={item} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Connect</h3>
                  <div className="flex space-x-4">
                    <a
                      href={`https://instagram.com/${djData.socialMedia.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href={`https://facebook.com/${djData.socialMedia.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href={`https://${djData.socialMedia.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Globe className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                <Separator />

                <div className="pt-2">
                  <Dialog
                    open={showBookingDialog}
                    onOpenChange={setShowBookingDialog}
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full">Book DJ Smith</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Book DJ Smith</DialogTitle>
                        <DialogDescription>
                          Check availability and request a booking for your
                          event.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Select a date</h4>
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) =>
                              date < new Date() || isDateBooked(date)
                            }
                            modifiers={{
                              booked: djData.availability.booked,
                            }}
                            modifiersStyles={{
                              booked: {
                                backgroundColor:
                                  "hsl(var(--destructive) / 0.1)",
                              },
                            }}
                            className="rounded-md border"
                            components={{
                              DayContent: (props) => {
                                const isBooked = isDateBooked(props.date);
                                return (
                                  <div
                                    className={cn(
                                      "relative w-full h-full flex items-center justify-center",
                                      isBooked && "text-destructive font-medium"
                                    )}
                                  >
                                    {props.date.getDate()}
                                    {isBooked && (
                                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-destructive"></div>
                                    )}
                                  </div>
                                );
                              },
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                            <span>Available</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-destructive/30"></div>
                            <span>Booked</span>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setShowBookingDialog(false)}
                        >
                          Cancel
                        </Button>
                        <Link
                          href={
                            selectedDate
                              ? `/booking?date=${selectedDate.toISOString()}&dj=${
                                  djData.id
                                }`
                              : "/booking"
                          }
                        >
                          <Button disabled={!selectedDate}>
                            Continue to Booking
                          </Button>
                        </Link>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-2/3">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="music">Music</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold">About {djData.name}</h2>
                      <p className="text-muted-foreground">{djData.bio}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center text-center">
                          <Award className="h-8 w-8 mb-2 text-primary" />
                          <h3 className="font-medium">Experience</h3>
                          <p className="text-muted-foreground">
                            {djData.experience}
                          </p>
                        </div>
                        <div className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center text-center">
                          <Music className="h-8 w-8 mb-2 text-primary" />
                          <h3 className="font-medium">Events</h3>
                          <p className="text-muted-foreground">
                            500+ Performed
                          </p>
                        </div>
                        <div className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center text-center">
                          <Headphones className="h-8 w-8 mb-2 text-primary" />
                          <h3 className="font-medium">Music Library</h3>
                          <p className="text-muted-foreground">
                            10,000+ Tracks
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">
                      Upcoming Public Events
                    </h2>
                    {djData.upcomingEvents.length > 0 ? (
                      <div className="space-y-4">
                        {djData.upcomingEvents.map((event) => (
                          <div
                            key={event.id}
                            className="flex justify-between items-center p-4 border rounded-md"
                          >
                            <div>
                              <h3 className="font-medium">{event.name}</h3>
                              <div className="text-sm text-muted-foreground flex items-center mt-1">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                <span>{event.date}</span>
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center mt-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        No upcoming public events at this time.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Music Tab */}
              <TabsContent value="music" className="space-y-6 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">Music Samples</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {djData.musicSamples.map((mix) => (
                        <div
                          key={mix.id}
                          className={cn(
                            "border rounded-md overflow-hidden",
                            currentMix === mix.id && "border-primary"
                          )}
                        >
                          <div className="relative h-[160px]">
                            <Image
                              src={mix.coverArt}
                              alt={mix.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <button
                                onClick={() => togglePlay(mix.id)}
                                className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors"
                              >
                                {currentMix === mix.id && isPlaying ? (
                                  <Pause className="h-6 w-6" />
                                ) : (
                                  <Play className="h-6 w-6 ml-1" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium">{mix.title}</h3>
                            <div className="flex justify-between text-sm text-muted-foreground mt-1">
                              <span>{mix.genre}</span>
                              <span>{mix.duration}</span>
                            </div>
                            {currentMix === mix.id && (
                              <div className="mt-3">
                                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-primary"
                                    style={{ width: isPlaying ? "45%" : "0%" }}
                                  ></div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                  <div className="flex space-x-2">
                                    <button className="text-muted-foreground hover:text-foreground">
                                      <SkipBack className="h-4 w-4" />
                                    </button>
                                    <button
                                      className="text-foreground"
                                      onClick={() => setIsPlaying(!isPlaying)}
                                    >
                                      {isPlaying ? (
                                        <Pause className="h-4 w-4" />
                                      ) : (
                                        <Play className="h-4 w-4" />
                                      )}
                                    </button>
                                    <button className="text-muted-foreground hover:text-foreground">
                                      <SkipForward className="h-4 w-4" />
                                    </button>
                                  </div>
                                  <button className="text-muted-foreground hover:text-foreground">
                                    <Volume2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Client Reviews</h2>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium">
                          {djData.rating}
                        </span>
                        <span className="ml-1 text-muted-foreground">
                          ({djData.reviewCount})
                        </span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {djData.testimonials.map((testimonial) => (
                        <div
                          key={testimonial.id}
                          className="border-b pb-6 last:border-0"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">
                                {testimonial.name}
                              </h3>
                              <div className="text-sm text-muted-foreground mt-1">
                                {testimonial.event} • {testimonial.date}
                              </div>
                            </div>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "h-4 w-4",
                                    i < testimonial.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-muted"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-3 text-muted-foreground">
                            {testimonial.content}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full mt-4">
                      View All {djData.reviewCount} Reviews
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pricing Tab */}
              <TabsContent value="pricing" className="space-y-6 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-6">
                      Pricing & Packages
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-primary p-4 text-primary-foreground">
                          <h3 className="text-lg font-medium">
                            Wedding Package
                          </h3>
                        </div>
                        <div className="p-6">
                          <div className="text-2xl font-bold mb-4">
                            {djData.pricing.wedding}
                          </div>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>6 hours of DJ services</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Professional sound system</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Wireless microphone</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Lighting package</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>MC services</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Customized playlist</span>
                            </li>
                          </ul>
                          <Button
                            className="w-full mt-6"
                            onClick={() => setShowBookingDialog(true)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-primary p-4 text-primary-foreground">
                          <h3 className="text-lg font-medium">
                            Corporate Package
                          </h3>
                        </div>
                        <div className="p-6">
                          <div className="text-2xl font-bold mb-4">
                            {djData.pricing.corporate}
                          </div>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>4 hours of DJ services</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Professional sound system</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Wireless microphone</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Background music</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Corporate-appropriate playlist</span>
                            </li>
                          </ul>
                          <Button
                            className="w-full mt-6"
                            onClick={() => setShowBookingDialog(true)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-primary p-4 text-primary-foreground">
                          <h3 className="text-lg font-medium">
                            Private Party Package
                          </h3>
                        </div>
                        <div className="p-6">
                          <div className="text-2xl font-bold mb-4">
                            {djData.pricing.private}
                          </div>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>4 hours of DJ services</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Professional sound system</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Basic lighting</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Customized playlist</span>
                            </li>
                          </ul>
                          <Button
                            className="w-full mt-6"
                            onClick={() => setShowBookingDialog(true)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-muted rounded-md">
                      <h3 className="font-medium mb-2">Custom Packages</h3>
                      <p className="text-muted-foreground mb-4">
                        Need something specific for your event? Contact DJ Smith
                        for a custom quote tailored to your requirements.
                      </p>
                      <Button variant="outline">Request Custom Quote</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
