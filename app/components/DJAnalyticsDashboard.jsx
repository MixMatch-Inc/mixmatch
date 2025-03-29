import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Calendar,
  Clock,
  Download,
  Music,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DJAnalyticsDashboard() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            DJ Performance Analytics
          </h1>
          <p className="text-muted-foreground">
            Track your performance metrics and growth over time.
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Play Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86 hrs</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Audience Reach
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,280</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">
              +0.3 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="genres">Genre Distribution</TabsTrigger>
          <TabsTrigger value="engagement">Audience Engagement</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>
                Your event performance over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center border-t pt-4">
              <div className="w-full h-full bg-muted/30 rounded-md flex items-center justify-center">
                <BarChart className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">
                  Performance chart visualization
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="genres" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Genre Distribution</CardTitle>
              <CardDescription>
                Breakdown of music genres played
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center border-t pt-4">
              <div className="w-full h-full bg-muted/30 rounded-md flex items-center justify-center">
                <Music className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">
                  Genre distribution chart
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="engagement" className="space-y-4">
          {/* Engagement content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Audience Engagement</CardTitle>
              <CardDescription>
                How audiences interact during your sets
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center border-t pt-4">
              <div className="w-full h-full bg-muted/30 rounded-md flex items-center justify-center">
                <Users className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">
                  Engagement metrics visualization
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="revenue" className="space-y-4">
          {/* Revenue content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Tracking</CardTitle>
              <CardDescription>
                Financial performance and trends
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center border-t pt-4">
              <div className="w-full h-full bg-muted/30 rounded-md flex items-center justify-center">
                <BarChart className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">
                  Revenue chart visualization
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
