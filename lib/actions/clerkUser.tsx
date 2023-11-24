'use server';
// Imports
import {currentUser} from '@clerk/nextjs';





// Fetching clerk user
export const fetchClerkUser = async () => {
    try {
        const user = await currentUser();
        return user;        
    } catch (err:any) {
        console.log(`Error fetching clerk user: ${err.message}`);
    }
};