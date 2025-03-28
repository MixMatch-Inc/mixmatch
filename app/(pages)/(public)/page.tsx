import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MusicIcon, Star, Users } from "lucide-react";
import { fetchDJs } from "@/lib/data";

export default async function Home() {
  // Fetch featured DJs
  const djs = await fetchDJs();
  const featuredDJs = djs.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Find the Perfect DJ for Your Next Event
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  MixMatch connects event organizers with talented DJs based on
                  your musical preferences, budget, and event type.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/explore">
                  <Button size="lg" className="px-8">
                    Find a DJ
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="lg" variant="outline" className="px-8">
                    Join as a DJ
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src="/placeholder.svg?height=550&width=550"
              width={550}
              height={550}
              alt="DJ performing at an event"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                How MixMatch Works
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform makes it easy to find, book, and manage DJs for
                your events.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Find Your DJ</h3>
              <p className="text-muted-foreground">
                Browse profiles, read reviews, and filter DJs by genre,
                location, and price.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CalendarIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Book & Pay</h3>
              <p className="text-muted-foreground">
                Secure your date with transparent pricing and our Stellar-based
                payment system.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <MusicIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Enjoy Your Event</h3>
              <p className="text-muted-foreground">
                Communicate directly with your DJ to ensure the perfect
                soundtrack for your event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured DJs Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Featured DJs
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover top-rated DJs ready to make your event unforgettable.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
            {featuredDJs.map((dj) => (
              <Card key={dj.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width={400}
                    height={200}
                    alt={dj.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{dj.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span>{dj.rating}</span>
                      <span className="text-muted-foreground ml-1">
                        ({dj.reviewCount})
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {dj.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dj.genres?.slice(0, 3).map((genre) => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">${dj.hourlyRate}/hr</span>
                    <Link href={`/djs/${dj.id}`}>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/explore">
              <Button size="lg" variant="outline">
                View All DJs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                What Our Users Say
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from event organizers and DJs who have used MixMatch.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full overflow-hidden w-12 h-12">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    width={50}
                    height={50}
                    alt="Sarah J."
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500" />
                  </div>
                  <p className="italic mb-4">
                    "MixMatch made finding a DJ for our wedding so easy. We
                    found the perfect match for our style and budget, and the
                    communication tools made planning seamless."
                  </p>
                  <div>
                    <p className="font-medium">Sarah J.</p>
                    <p className="text-sm text-muted-foreground">
                      Event Organizer
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full overflow-hidden w-12 h-12">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    width={50}
                    height={50}
                    alt="Marcus T."
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500" />
                  </div>
                  <p className="italic mb-4">
                    "As a DJ, MixMatch has helped me grow my business and
                    connect with clients I wouldn't have found otherwise. The
                    platform is intuitive and the payment system is reliable."
                  </p>
                  <div>
                    <p className="font-medium">Marcus T.</p>
                    <p className="text-sm text-muted-foreground">
                      Professional DJ
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join MixMatch today and find the perfect DJ for your next event.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="px-8">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/explore">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Explore DJs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
