// Imports
import {clerkMiddleware} from '@clerk/nextjs/server';



// This example protects all routes including api/trpc routes
export default clerkMiddleware({});
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};