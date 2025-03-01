import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Music, MapPin } from "lucide-react";

// Mock DJs data
const DJs = [
  {
    id: "dj-smith",
    name: "DJ Smith",
    tagline: "Wedding & Corporate Event Specialist",
    rating: 4.9,
    reviewCount: 127,
    location: "New York, NY",
    genres: ["House", "Top 40", "Hip Hop"],
    image:
      "https://images.unsplash.com/photo-1601643157091-ce5c665179ab?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "dj-rodriguez",
    name: "DJ Rodriguez",
    tagline: "Latin & International Music Expert",
    rating: 4.8,
    reviewCount: 98,
    location: "Miami, FL",
    genres: ["Latin", "Reggaeton", "International"],
    image:
      "https://images.unsplash.com/photo-1571935441005-16a9426f8eb6?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "dj-beats",
    name: "DJ Beats",
    tagline: "Hip Hop & R&B Specialist",
    rating: 4.7,
    reviewCount: 112,
    location: "Los Angeles, CA",
    genres: ["Hip Hop", "R&B", "Trap"],
    image:
      "https://images.unsplash.com/photo-1516873240891-4bf014598ab4?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "dj-electra",
    name: "DJ Electra",
    tagline: "Electronic & Dance Music Pro",
    rating: 4.9,
    reviewCount: 145,
    location: "Chicago, IL",
    genres: ["EDM", "House", "Techno"],
    image:
      "https://images.unsplash.com/photo-1545128485-c400ce7b23d0?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "dj-classic",
    name: "DJ Classic",
    tagline: "Retro & Vintage Music Specialist",
    rating: 4.6,
    reviewCount: 87,
    location: "Boston, MA",
    genres: ["80s", "90s", "Disco"],
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "dj-harmony",
    name: "DJ Harmony",
    tagline: "Multi-Genre Event DJ",
    rating: 4.8,
    reviewCount: 103,
    location: "Austin, TX",
    genres: ["Pop", "Rock", "Country"],
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function DJsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Professional DJs</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Browse our roster of experienced DJs specializing in various music
          genres and event types. Find the perfect DJ for your next event.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DJs.map((dj) => (
          <Card key={dj.id} className="overflow-hidden">
            <div className="relative h-[250px]">
              <Image
                src={dj.image}
                alt={dj.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-bold">{dj.name}</h2>
                  <p className="text-muted-foreground">{dj.tagline}</p>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm">
                    {dj.rating} ({dj.reviewCount})
                  </span>
                </div>
              </div>

              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{dj.location}</span>
              </div>

              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Music className="h-4 w-4 mr-1" />
                <div className="flex flex-wrap gap-1">
                  {dj.genres.map((genre) => (
                    <Badge key={genre} variant="outline" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href={`/dj/${dj.id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
