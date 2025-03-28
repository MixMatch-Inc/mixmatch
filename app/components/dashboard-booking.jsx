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
import { Clock, DollarSign, MapPin, Users } from 'lucide-react';
import { fetchCurrentUser, fetchUserBookings } from '@/lib/data';
import { format } from 'date-fns';

export async function DashboardBookings() {
  const user = await fetchCurrentUser();

  if (!user) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p>Please log in to view your booking requests.</p>
        </CardContent>
      </Card>
    );
  }

  const bookings = await fetchUserBookings(user.id);

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p>No booking requests found.</p>
          {user.role === 'organizer' && (
            <Link href="/explore" className="mt-4 inline-block">
              <Button>Find a DJ</Button>
            </Link>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{booking.event?.name}</CardTitle>
                <CardDescription>
                  {booking.event?.date &&
                    format(new Date(booking.event.date), 'EEEE, MMMM d, yyyy')}
                </CardDescription>
              </div>
              <Badge
                variant={
                  booking.status === 'accepted'
                    ? 'default'
                    : booking.status === 'pending'
                    ? 'outline'
                    : booking.status === 'rejected'
                    ? 'destructive'
                    : 'secondary'
                }
              >
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {user.role === 'dj' ? (
                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Organizer: {booking.organizer?.name}</span>
                </div>
              ) : (
                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>DJ: {booking.dj?.name}</span>
                </div>
              )}
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{booking.event?.time}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{booking.event?.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>
                  ${booking.price} ({booking.paymentStatus})
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            {user.role === 'dj' && booking.status === 'pending' && (
              <>
                <Button variant="outline" size="sm">
                  Decline
                </Button>
                <Button size="sm">Accept</Button>
              </>
            )}
            {user.role === 'organizer' && booking.status === 'pending' && (
              <Button variant="outline" size="sm">
                Cancel Request
              </Button>
            )}
            <Link href={`/events/${booking.event?.id}`}>
              <Button variant="outline" size="sm">
                View Event
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
