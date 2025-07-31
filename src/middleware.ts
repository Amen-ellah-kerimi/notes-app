import { clerkMiddleware } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';


export needAuthentificationRoute = createRouteMatcher(['/notes(.*)']);
export isProtectedRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
    const {userId, redirectToSignIn} = await auth();
    if (needAuthentificationRoute(req)) await auth.protect();
    if (isProtectedRoute(req)) {
        if(!userId){
            console.error("an unauthenticated user tried to access admin panel");
            return redirectToSignIn();
        }
        try {
            const isAuthorized = db.select(isAdmin).from(users).where(eq).limit(1);
            
})


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
