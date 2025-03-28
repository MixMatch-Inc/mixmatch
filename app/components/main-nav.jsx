'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MusicIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserNav } from '@/components/user-nav';
import { useState, useEffect } from 'react';
import { fetchCurrentUser } from '@/lib/data';

export function MainNav() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const isLoggedIn = !!user;

  const navItems = [
    {
      title: 'Home',
      href: '/',
      showWhen: 'always',
    },
    {
      title: 'Explore DJs',
      href: '/explore',
      showWhen: 'always',
    },
    {
      title: 'Dashboard',
      href: '/dashboard',
      showWhen: 'loggedIn',
    },
    {
      title: 'Events',
      href: '/events',
      showWhen: 'loggedIn',
    },
    {
      title: 'Messages',
      href: '/messages',
      showWhen: 'loggedIn',
    },
  ];

  const filteredNavItems = navItems.filter(
    (item) =>
      item.showWhen === 'always' || (item.showWhen === 'loggedIn' && isLoggedIn)
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <MusicIcon className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">MixMatch</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6 text-sm">
          {filteredNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === item.href
                  ? 'text-foreground font-medium'
                  : 'text-foreground/60'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {!loading && (
            <>
              {isLoggedIn ? (
                <UserNav user={user} />
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm">Sign up</Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
