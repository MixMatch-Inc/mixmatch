import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users, Music } from 'lucide-react';
import { fetchCurrentUser, fetchUserEvents } from '@/lib/data';
import { format } from 'date-fns';

interface DashboardEventsProps {
  type: 'upcoming' | 'past';
}

export async function DashboardEvents({ type }: DashboardEventsProps) {
  const user = await fetchCurrentUser();

  if (!user) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p>Please log in to view your events.</p>
        </CardContent>
      </Card>
    );
  }

  const events = await fetchUserEvents(user.id);

  // Filter events based on type
  const now = new Date();
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return type === 'upcoming' ? eventDate >= now : eventDate < now;
  });

  if (filteredEvents.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p>No {type} events found.</p>
          {type === 'upcoming' && (
            <Link href="/events/create" className="mt-4 inline-block">
              <Button>Create New Event</Button>
            </Link>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {filteredEvents.map((event) => (
        <Card key={event.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription>
                  {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
                </CardDescription>
              </div>
              <Badge
                variant={
                  event.status === 'confirmed'
                    ? 'default'
                    : event.status === 'pending'
                    ? 'outline'
                    : event.status === 'canceled'
                    ? 'destructive'
                    : 'secondary'
                }
              >
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{event.attendees} attendees</span>
              </div>
              {event.djId && event.dj && (
                <div className="flex items-center text-sm">
                  <Music className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>DJ: {event.dj.name}</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Link href={`/events/${event.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
            {type === 'upcoming' && event.status !== 'canceled' && (
              <Link href={`/events/${event.id}/edit`}>
                <Button size="sm">Manage Event</Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
