// Imports
import {connectToDb} from '@/lib/mongoose';





// Create Narration Master
export const createNarrationMaster = async () => {
    try {

        
        // Database connection
        connectToDb();


        
    } catch (err:any) {
        console.log(`Error Creating Narration Master: ${err.message}`);
    }
};