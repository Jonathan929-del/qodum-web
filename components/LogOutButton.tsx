// Imports
import {Button} from './ui/button';
import {LogOut} from 'lucide-react';
import {SignOutButton} from '@clerk/nextjs';





// Main function
const LogOutButton = () => {
    return (
        <SignOutButton>
            <Button
                className='main-button w-[100%]'
            >
                <LogOut
                    className='rotate-180 mr-2'
                />
                Logout
            </Button>
        </SignOutButton>
    );
};





// Export
export default LogOutButton;