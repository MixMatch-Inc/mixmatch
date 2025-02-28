import { ArrowRight } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Sign up and create your profile as an event organizer or DJ.",
    },
    {
      number: "02",
      title: "Browse & Connect",
      description: "Search for DJs or events based on your preferences and requirements.",
    },
    {
      number: "03",
      title: "Secure Booking",
      description: "Use our blockchain-based smart contracts for secure, transparent agreements.",
    },
    {
      number: "04",
      title: "Manage Your Event",
      description: "Access planning tools, communication features, and payment processing.",
    },
  ]

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">How MixMatch Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our simple process connects DJs and event organizers in just a few steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-background rounded-xl p-6 h-full flex flex-col">
                <div className="text-4xl font-bold text-primary/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-8 w-8 text-primary/40" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

