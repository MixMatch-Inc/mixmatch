import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Star, MapPin } from 'lucide-react';
import { fetchDJs } from '@/lib/data';

export async function DJExploreList() {
  const djs = await fetchDJs();

  if (djs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No DJs found</h3>
        <p className="text-muted-foreground">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {djs.map((dj) => (
        <Card key={dj.id} className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4">
              <Image
                src="/placeholder.svg?height=200&width=200"
                width={200}
                height={200}
                alt={dj.name}
                className="w-full h-full object-cover aspect-square"
              />
            </div>
            <div className="p-6 md:w-3/4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="text-xl font-bold">{dj.name}</h3>
                <div className="flex items-center mt-1 md:mt-0">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>{dj.rating}</span>
                  <span className="text-muted-foreground ml-1">
                    ({dj.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {dj.location && (
                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{dj.location}</span>
                </div>
              )}

              <p className="text-muted-foreground mb-4 line-clamp-2">
                {dj.bio}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {dj.genres?.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="font-medium text-lg">${dj.hourlyRate}/hr</div>
                <div className="flex gap-2">
                  <Link href={`/djs/${dj.id}`}>
                    <Button variant="outline">View Profile</Button>
                  </Link>
                  <Link href={`/booking/request?djId=${dj.id}`}>
                    <Button>Request to Book</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}