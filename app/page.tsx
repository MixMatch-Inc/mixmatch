import Link from "next/link"
import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-rose-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">MixMatch</h1>
          <p className="text-gray-500 dark:text-gray-400">Connect with people who share your musical taste</p>
        </div>

        <LoginForm />

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-gray-900 dark:hover:text-gray-300">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-gray-900 dark:hover:text-gray-300">
            Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  )
}
