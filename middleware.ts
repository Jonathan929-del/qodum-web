// Imports
import {authMiddleware} from '@clerk/nextjs/server';



// This example protects all routes including api/trpc routes
export default authMiddleware({});
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};