import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Notes App
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create, organize, and manage your notes with ease. Built with Next.js 14,
            Drizzle ORM, and Clerk authentication.
          </p>

          <SignedOut>
            <div className="space-y-4">
              <p className="text-lg text-gray-700">Get started by signing in</p>
              <SignInButton mode="modal">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                  Sign In to Continue
                </button>
              </SignInButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="space-y-4">
              <p className="text-lg text-gray-700">Ready to manage your notes?</p>
              <Link
                href="/notes"
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Go to My Notes
              </Link>
            </div>
          </SignedIn>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">🔐 Secure Authentication</h3>
            <p className="text-gray-600">Powered by Clerk for secure user management</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">🗄️ PostgreSQL Database</h3>
            <p className="text-gray-600">Reliable data storage with Neon PostgreSQL</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">⚡ Modern Stack</h3>
            <p className="text-gray-600">Built with Next.js 14 and Drizzle ORM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
