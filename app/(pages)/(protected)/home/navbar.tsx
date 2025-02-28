"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              MixMatch
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-sm font-medium hover:text-primary">
            How It Works
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            For DJs
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            For Organizers
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Pricing
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm">
            Log In
          </Button>
          <Button size="sm">Sign Up</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col gap-4">
            <Link href="#" className="text-sm font-medium py-2 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </Link>
            <Link href="#" className="text-sm font-medium py-2 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              For DJs
            </Link>
            <Link href="#" className="text-sm font-medium py-2 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              For Organizers
            </Link>
            <Link href="#" className="text-sm font-medium py-2 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="ghost" className="justify-start" onClick={() => setIsMenuOpen(false)}>
                Log In
              </Button>
              <Button className="w-full" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

