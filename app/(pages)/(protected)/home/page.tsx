import { ArrowRight, Calendar, CreditCard, Music, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FeatureCard } from "@/components/feature-card"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  const features = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "DJ Matching",
      description: "Find the perfect DJ for your event based on style, availability, and budget.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Event Management",
      description: "Streamline planning with integrated scheduling, communication, and checklists.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Secure Payments",
      description: "Blockchain-based contracts and payments ensure transparent, secure transactions.",
    },
    {
      icon: <Music className="h-10 w-10 text-primary" />,
      title: "Music Libraries",
      description: "Browse DJ portfolios with sample mixes and music style preferences.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
          <div
            className="h-[600px] bg-cover bg-center"
            style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200')" }}
          />
          <div className="container absolute inset-0 z-20 flex flex-col justify-center">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Connect with the Perfect DJ for Your Event
              </h1>
              <p className="text-xl text-white/90">
                MixMatch streamlines event planning by connecting you with talented DJs and providing essential
                management tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="text-lg">
                  Sign Up Now
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg">
                  Find DJs
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="py-20 bg-muted">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why Choose MixMatch?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our platform combines cutting-edge technology with user-friendly features to make event planning
                seamless.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Blockchain Integration Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Secure Blockchain Technology</h2>
                <p className="text-xl text-muted-foreground mb-6">
                  MixMatch leverages blockchain technology to ensure secure, transparent transactions between DJs and
                  event organizers.
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Smart Contracts</h3>
                      <p className="text-muted-foreground">
                        Automated agreements ensure both parties fulfill obligations
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Secure Payments</h3>
                      <p className="text-muted-foreground">
                        Escrow-based payment system protects both DJs and organizers
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Transparent History</h3>
                      <p className="text-muted-foreground">Immutable record of all transactions and agreements</p>
                    </div>
                  </li>
                </ul>
                <Button className="mt-8">Learn More About Our Technology</Button>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="/placeholder.svg?height=600&width=600"
                    alt="Blockchain technology illustration"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-xl shadow-lg max-w-xs">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold">100% Secure</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    All transactions are secured by blockchain technology, ensuring transparency and trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Testimonials Section */}
        <Testimonials />

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Ready to Find Your Perfect DJ Match?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-10">
              Join thousands of event organizers and DJs who are already using MixMatch to create unforgettable events.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="text-lg">
                Sign Up Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 text-lg"
              >
                Browse DJs
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

