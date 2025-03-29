import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Calendar,
  Clock,
  ImagePlus,
  MapPin,
  Music,
  Plus,
  Search,
  Upload,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function DJEventHistory() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Event History & Reporting
          </h1>
          <p className="text-muted-foreground">
            Log and manage your past events and performances.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Event
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <Tabs defaultValue="upcoming" className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </TabsList>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="w-[200px] pl-8"
                />
              </div>
            </div>

            <TabsContent value="upcoming" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>Summer Beach Party</CardTitle>
                      <CardDescription>Oceanfront Resort</CardDescription>
                    </div>
                    <Badge>Confirmed</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">June 15, 2025</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">8:00 PM - 2:00 AM</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Miami Beach, FL</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Expected: 500+ guests</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">Prepare Setlist</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>Club Neon Anniversary</CardTitle>
                      <CardDescription>Club Neon Downtown</CardDescription>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">July 8, 2025</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">10:00 PM - 4:00 AM</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Los Angeles, CA</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Expected: 300 guests</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">Confirm Event</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {/* Past events content */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>New Year's Eve Bash</CardTitle>
                      <CardDescription>Grand Hotel Ballroom</CardDescription>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">December 31, 2024</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">9:00 PM - 3:00 AM</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Attendance: 750 guests</span>
                    </div>
                    <div className="flex items-center">
                      <Music className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">42 tracks played</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Report
                  </Button>
                  <Button variant="secondary" size="sm">
                    Add Media
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="drafts" className="space-y-4">
              {/* Draft events content */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>Wedding Reception</CardTitle>
                      <CardDescription>Smith-Johnson Wedding</CardDescription>
                    </div>
                    <Badge variant="outline">Draft</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">August 12, 2025</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Chicago, IL</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Edit Draft
                  </Button>
                  <Button size="sm">Complete Details</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:w-1/3 mt-6 lg:mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Log details for your event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-name">Event Name</Label>
                <Input id="event-name" placeholder="Enter event name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Input id="venue" placeholder="Enter venue name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="audience-size">Estimated Audience Size</Label>
                <Input
                  id="audience-size"
                  type="number"
                  placeholder="Number of attendees"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="genre">Primary Genre</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="techno">Techno</SelectItem>
                    <SelectItem value="hiphop">Hip Hop</SelectItem>
                    <SelectItem value="rnb">R&B</SelectItem>
                    <SelectItem value="pop">Pop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Performance Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about the event..."
                />
              </div>
              <div className="space-y-2">
                <Label>Media</Label>
                <div className="border border-dashed rounded-lg p-4 text-center">
                  <Button
                    variant="ghost"
                    className="w-full h-20 flex flex-col items-center justify-center"
                  >
                    <ImagePlus className="h-8 w-8 mb-2 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Upload photos or videos
                    </span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <Button>Save Event</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
