'use server';
// Imports
import User from '../models/User.model';
import {connectToDb} from '../mongoose';





// Sign up interface
interface SignUpProps{
    email:string;
    password:string;
};

// Sign up
export const signUpUser = async ({email, password}:SignUpProps) => {
    try {
        
    } catch (err:any) {
        console.log(`Failed to register user: ${err.message}`);
    }
};