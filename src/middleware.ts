import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const isPublicRoute    = createRouteMatcher(['/']);
export const isPrivateRoute   = createRouteMatcher(['/notes(.*)']);
export const isIgnoredRoute   = createRouteMatcher(['/api/webhooks(.*)']);
export const isProtectedRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
    console.log(`Middleware running for ${req.url}`);
    const {userId, redirectToSignIn} = await auth();
    if (isPrivateRoute(req)) {
        console.log(`- Request to private route: ${req.url}`);
        await auth.protect();
        console.log(`- auth().protect() was called.`);
    }
    if (isProtectedRoute(req)) {
        console.log(`- Request to protected route: ${req.url}, userId: ${userId}`);
        await auth.protect();
        if(!userId){
            console.log(`- Unauthorized user attempted to access admin panel.`);
            return redirectToSignIn();
        }
    }




            
})


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

 

