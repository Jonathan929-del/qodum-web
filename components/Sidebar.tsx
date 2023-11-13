// Imports
import Image from 'next/image';
import LogOutButton from './LogOutButton';
import {currentUser} from '@clerk/nextjs';





// Main function
const Sidebar = async () => {


    // Fetching user
    const user = await currentUser();


    return (
        <aside className='h-screen hidden flex-col bg-white items-center justify-between pt-10 pb-20 px-10 lg:px-16 md:flex rounded-xl'>


            {/* Qodum Logo */}
            <Image
                src='/assets/logo.png'
                width={150}
                height={150}
                alt='Qodum logo'
            />


            {/* User Image */}
            <div className='flex flex-col items-center'>
                <Image
                    width={150}
                    height={150}
                    alt="User's Image"
                    className='rounded-full border-2 border-main-color'
                    src={`${user?.imageUrl}`}
                />
                <h3 className='font-semibold text-lg mt-4'>
                    {`${user?.firstName} ${user?.lastName}`}
                </h3>
                <h4 className='text-main-color'>
                    Administrator
                </h4>
                <p className='text-sm text-hash-color'>
                    {user?.emailAddresses[0].emailAddress}
                </p>
            </div>


            {/* Logout Button */}
            <LogOutButton />
            

        </aside>
    );
};





// Export
export default Sidebar;