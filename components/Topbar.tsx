// Imports
import moment from 'moment';
import LiveClock from './LiveClock';
import {UserButton, currentUser} from '@clerk/nextjs';
import Image from 'next/image';





// Main function
const Topbar = async () => {


    // User fetching
    const user = await currentUser();


    // Day
    const today = moment(new Date()).format('ddd, LL');


    return (
        <nav className='flex flex-row justify-between bg-white rounded-[9px] px-4 py-2 mt-6 lg:px-10'>


            {/* Date */}
            <div className='flex-col items-center hidden md:flex'>
                <p className='text-main-color text-sm mb-2'>
                    {today}
                </p>
                <p className='text-3xl'>
                    <LiveClock />
                </p>
            </div>


            {/* Qodum Logo */}
            <Image
                width={150}
                height={150}
                alt='Qodum logo'
                src='/assets/logo.png'
                className='block md:hidden'
            />


            {/* User image */}
            <div className='flex-row items-center flex'>
                <UserButton />
                <p className='pl-2 text-lg hidden lg:block'>
                    {`${user?.firstName} ${user?.lastName}`}
                </p>
            </div>


        </nav>
    );
};





// Export
export default Topbar;