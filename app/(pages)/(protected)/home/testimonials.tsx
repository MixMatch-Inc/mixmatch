import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "MixMatch made finding the perfect DJ for my wedding so easy. The blockchain payment system gave us peace of mind.",
      author: "Sarah Johnson",
      role: "Event Organizer",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "As a DJ, this platform has connected me with clients I would never have found otherwise. The smart contracts ensure I always get paid on time.",
      author: "DJ Maxwell",
      role: "Professional DJ",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "The event management tools are incredible. I was able to plan my corporate event and find an amazing DJ all in one place.",
      author: "Michael Chen",
      role: "Corporate Event Planner",
      rating: 4,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of satisfied DJs and event organizers using MixMatch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-muted rounded-xl p-6 shadow-sm">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-muted-foreground" />
                ))}
              </div>
              <p className="italic mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

