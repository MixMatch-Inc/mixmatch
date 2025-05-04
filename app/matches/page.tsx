'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Search, Music, MessageSquare } from 'lucide-react';
import { isAuthenticated } from '@/lib/auth';
import { MatchesList } from '@/components/matches/matches-list';
import { MatchesHeader } from '@/components/matches/matches-header';
import { MatchesEmpty } from '@/components/matches/matches-empty';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockFetchMatches = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return [
    {
      id: 'user3',
      name: 'Taylor',
      age: 30,
      mood: ['🔥', '💪', '🤘'],
      bio: 'Fitness instructor by day, metal head by night. Looking for concert buddies.',
      topGenres: ['Metal', 'Rock', 'Punk'],
      anthem: {
        trackId: 'spotify:track:0VjIjW4GlUZAMYd2vXMi3b',
        trackName: 'Master of Puppets',
        artistName: 'Metallica',
        albumArt: 'https://i.scdn.co/image/ab67616d00001e02random3',
        previewUrl: 'https://p.scdn.co/mp3-preview/random3',
      },
      photoUrl: '/placeholder.svg?height=500&width=400',
      matchedAt: '2023-05-03T14:32:45Z',
      lastMessage: {
        text: 'Hey! I saw you like Metallica too. Have you been to any of their concerts?',
        sentAt: '2023-05-03T15:10:22Z',
        isRead: true,
        sentByMatch: true,
      },
      compatibilityScore: 85,
    },
    {
      id: 'user7',
      name: 'Morgan',
      age: 26,
      mood: ['🎵', '🎸', '😌'],
      bio: 'Indie music enthusiast and vinyl collector. Always looking for new bands to discover.',
      topGenres: ['Indie', 'Alternative', 'Folk'],
      anthem: {
        trackId: 'spotify:track:7rglLriMNBPAyuJOMGwi39',
        trackName: 'Myth',
        artistName: 'Beach House',
        albumArt: 'https://i.scdn.co/image/ab67616d00001e02random7',
        previewUrl: 'https://p.scdn.co/mp3-preview/random7',
      },
      photoUrl: '/placeholder.svg?height=500&width=400',
      matchedAt: '2023-05-02T09:15:33Z',
      lastMessage: null,
      compatibilityScore: 92,
    },
    {
      id: 'user9',
      name: 'Riley',
      age: 29,
      mood: ['🎉', '🌙', '❤️'],
      bio: "DJ and electronic music producer. Let's talk about synths and samples!",
      topGenres: ['Electronic', 'House', 'Techno'],
      anthem: {
        trackId: 'spotify:track:3a1lNhkSLSkpJE4MSHpDu9',
        trackName: 'Strobe',
        artistName: 'deadmau5',
        albumArt: 'https://i.scdn.co/image/ab67616d00001e02random9',
        previewUrl: 'https://p.scdn.co/mp3-preview/random9',
      },
      photoUrl: '/placeholder.svg?height=500&width=400',
      matchedAt: '2023-05-01T21:45:12Z',
      lastMessage: {
        text: "I'm going to that festival next month! We should meet up there.",
        sentAt: '2023-05-02T18:22:05Z',
        isRead: false,
        sentByMatch: false,
      },
      compatibilityScore: 78,
    },
    {
      id: 'user12',
      name: 'Jordan',
      age: 27,
      mood: ['😌', '🌊', '☀️'],
      bio: 'Classical pianist with a love for jazz. Coffee enthusiast and book lover.',
      topGenres: ['Classical', 'Jazz', 'Instrumental'],
      anthem: {
        trackId: 'spotify:track:5NGtFXVpXSvwunEIGeviY3',
        trackName: 'Clair de Lune',
        artistName: 'Claude Debussy',
        albumArt: 'https://i.scdn.co/image/ab67616d00001e02random12',
        previewUrl: 'https://p.scdn.co/mp3-preview/random12',
      },
      photoUrl: '/placeholder.svg?height=500&width=400',
      matchedAt: '2023-04-28T16:30:55Z',
      lastMessage: {
        text: "Have you heard the new album by GoGo Penguin? I think you'd love it!",
        sentAt: '2023-04-29T10:15:42Z',
        isRead: true,
        sentByMatch: true,
      },
      compatibilityScore: 89,
    },
    {
      id: 'user15',
      name: 'Alex',
      age: 31,
      mood: ['🤘', '🔥', '💪'],
      bio: 'Hardcore punk and metal fan. Guitarist in a local band. Looking for people to jam with.',
      topGenres: ['Punk', 'Hardcore', 'Metal'],
      anthem: {
        trackId: 'spotify:track:5XcZRgJv3zMhTqCyESjQrF',
        trackName: 'Rise Above',
        artistName: 'Black Flag',
        albumArt: 'https://i.scdn.co/image/ab67616d00001e02random15',
        previewUrl: 'https://p.scdn.co/mp3-preview/random15',
      },
      photoUrl: '/placeholder.svg?height=500&width=400',
      matchedAt: '2023-04-25T19:20:10Z',
      lastMessage: null,
      compatibilityScore: 75,
    },
  ];
};

export type Match = {
  id: string;
  name: string;
  age: number;
  mood: string[];
  bio: string;
  topGenres: string[];
  anthem: {
    trackId: string;
    trackName: string;
    artistName: string;
    albumArt: string;
    previewUrl: string | null;
  };
  photoUrl: string;
  matchedAt: string;
  lastMessage: {
    text: string;
    sentAt: string;
    isRead: boolean;
    sentByMatch: boolean;
  } | null;
  compatibilityScore: number;
};

export default function MatchesPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/');
      return;
    }

    const fetchMatches = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await mockFetchMatches();

        setMatches(data);
        setFilteredMatches(data);
      } catch (err) {
        console.error('Error fetching matches:', err);
        setError('Failed to load matches. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, [router]);

  useEffect(() => {
    let result = [...matches];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (match) =>
          match.name.toLowerCase().includes(query) ||
          match.topGenres.some((genre) =>
            genre.toLowerCase().includes(query)
          ) ||
          match.anthem.trackName.toLowerCase().includes(query) ||
          match.anthem.artistName.toLowerCase().includes(query)
      );
    }

    if (activeTab === 'messages') {
      result = result.filter((match) => match.lastMessage !== null);
    } else if (activeTab === 'new') {
      result = result.filter((match) => match.lastMessage === null);
    }

    setFilteredMatches(result);
  }, [searchQuery, activeTab, matches]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const navigateToChat = (matchId: string) => {
    router.push(`/chat/${matchId}`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-rose-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-600 dark:text-indigo-400" />
          <p className="text-gray-600 dark:text-gray-300">
            Loading your matches...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-rose-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <MatchesHeader matchCount={matches.length} />
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
          {/* Search and filter */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search by name, genre, or song..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={handleTabChange}
          >
            <div className="px-4 border-b border-gray-200 dark:border-gray-700">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900/30"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="messages"
                  className="data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900/30"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </TabsTrigger>
                <TabsTrigger
                  value="new"
                  className="data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900/30"
                >
                  <Music className="h-4 w-4 mr-2" />
                  New
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="p-0 m-0">
              {filteredMatches.length > 0 ? (
                <MatchesList
                  matches={filteredMatches}
                  onChatClick={navigateToChat}
                />
              ) : (
                <MatchesEmpty searchQuery={searchQuery} />
              )}
            </TabsContent>

            <TabsContent value="messages" className="p-0 m-0">
              {filteredMatches.length > 0 ? (
                <MatchesList
                  matches={filteredMatches}
                  onChatClick={navigateToChat}
                />
              ) : (
                <MatchesEmpty searchQuery={searchQuery} filterType="messages" />
              )}
            </TabsContent>

            <TabsContent value="new" className="p-0 m-0">
              {filteredMatches.length > 0 ? (
                <MatchesList
                  matches={filteredMatches}
                  onChatClick={navigateToChat}
                />
              ) : (
                <MatchesEmpty searchQuery={searchQuery} filterType="new" />
              )}
            </TabsContent>
          </Tabs>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-center">
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
