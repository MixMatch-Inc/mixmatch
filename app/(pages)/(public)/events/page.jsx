import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Clock, MapPin, Music, Users } from "lucide-react";
import { fetchEventById } from "@/lib/data";
import { EventChat } from "@/components/event-chat";
import { format } from "date-fns";

export default async function EventPage({ params }) {
  const event = await fetchEventById(params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{event.name}</h1>
          <p className="text-muted-foreground">
            {format(new Date(event.date), "EEEE, MMMM d, yyyy")} at {event.time}
          </p>
        </div>
        <Badge
          className="md:self-start text-sm"
          variant={
            event.status === "confirmed"
              ? "default"
              : event.status === "pending"
                ? "outline"
                : event.status === "canceled"
                  ? "destructive"
                  : "secondary"
          }
        >
          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Event Details</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Date & Time</div>
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{format(new Date(event.date), "MMMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Location</div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Description</div>
                    <p>{event.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Event Type</div>
                      <div>{event.eventType}</div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Attendees</div>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{event.attendees}</span>
                      </div>
                    </div>
                  </div>

                  {event.specialRequests && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Special Requests</div>
                      <p>{event.specialRequests}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>People</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Organizer</div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{event.organizer?.name}</span>
                    </div>
                  </div>

                  {event.dj && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">DJ</div>
                      <div className="flex items-center">
                        <Music className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{event.dj.name}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="chat">
              <EventChat eventId={event.id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {event.status === "confirmed" && (
                <>
                  <Link href={`/events/${event.id}/edit`} className="w-full">
                    <Button className="w-full">Edit Event</Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    Cancel Event
                  </Button>
                </>
              )}

              {event.status === "pending" && !event.djId && (
                <Link href="/explore" className="w-full">
                  <Button className="w-full">Find a DJ</Button>
                </Link>
              )}

              {event.status === "completed" && (
                <Link href={`/reviews/create?eventId=${event.id}`} className="w-full">
                  <Button className="w-full">Leave a Review</Button>
                </Link>
              )}

              <Link href="/dashboard" className="w-full">
                <Button variant="outline" className="w-full">
                  Back to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          {event.status === "confirmed" && (
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription>Payment status for this event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="outline">Paid</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">$750.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Payment Date</span>
                  <span>Oct 5, 2023</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span>Stellar</span>
                </div>
                <Button variant="outline" className="w-full">
                  View Receipt
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
