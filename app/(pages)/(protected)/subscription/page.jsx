import { useEffect, useState } from 'react';
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
import { Check } from 'lucide-react';
import { fetchCurrentUser, fetchUserSubscription } from '@/lib/data';

export default function SubscriptionPage() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        const userSubscription = await fetchUserSubscription(currentUser.id);
        setSubscription(userSubscription);
      }
    };

    loadData();
  }, []);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Subscription Plans</h1>
      <p className="text-muted-foreground mb-8">
        Choose the perfect plan for your needs
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          className={subscription?.plan === 'basic' ? 'border-primary' : ''}
        >
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>For occasional event organizers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold">
              $9.99
              <span className="text-muted-foreground text-sm font-normal">
                /month
              </span>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary" />
                <span>Up to 10 bookings per month</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary" />
                <span>Basic analytics</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary" />
                <span>Email support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {subscription?.plan === 'basic' ? (
              <Button className="w-full" disabled>
                Current Plan
              </Button>
            ) : (
              <Link href="/subscription/checkout?plan=basic" className="w-full">
                <Button
                  className="w-full"
                  variant={subscription ? 'outline' : 'default'}
                >
                  {subscription ? 'Switch Plan' : 'Subscribe'}
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>

        <Card
          className={`${
            subscription?.plan === 'pro' ? 'border-primary' : ''
          } border-2`}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Pro</CardTitle>
              <div className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                Popular
              </div>
            </div>
            <CardDescription>
              For professional DJs and event planners
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold">
              $29.99
              <span className="text-muted-foreground text-sm font-normal">
                /month
              </span>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary" />
                <span>Featured profile</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary" />
                <span>Priority in search results</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary" />
                <span>Analytics dashboard</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary" />
                <span>Unlimited bookings</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {subscription?.plan === 'pro' ? (
              <Button className="w-full" disabled>
                Current Plan
              </Button>
            ) : (
              <Link href="/subscription/checkout?plan=pro" className="w-full">
                <Button
                  className="w-full"
                  variant={subscription ? 'outline' : 'default'}
                >
                  {subscription ? 'Switch Plan' : 'Subscribe'}
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>

        <Card
          className={subscription?.plan === 'premium' ? 'border-primary' : ''}
        >
          <CardHeader>
            <CardTitle>Premium</CardTitle>
            <CardDescription>For high-volume professionals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold">
              $49.99
              <span className="text-muted-foreground text-sm font-normal">
                /month
              </span>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary" />
                <span>All Pro features</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary" />
                <span>Priority support</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary" />
                <span>Custom branding</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {subscription?.plan === 'premium' ? (
              <Button className="w-full" disabled>
                Current Plan
              </Button>
            ) : (
              <Link
                href="/subscription/checkout?plan=premium"
                className="w-full"
              >
                <Button
                  className="w-full"
                  variant={subscription ? 'outline' : 'default'}
                >
                  {subscription ? 'Switch Plan' : 'Subscribe'}
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>

      {subscription && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Your Subscription</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current Plan</span>
                  <span className="font-medium capitalize">
                    {subscription.plan}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Price</span>
                  <span>${subscription.price}/month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Renewal Date</span>
                  <span>
                    {new Date(subscription.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <span className="capitalize">{subscription.status}</span>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline">Manage Payment Method</Button>
                  <Button variant="destructive">Cancel Subscription</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
