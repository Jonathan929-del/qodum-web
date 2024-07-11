// Imports
import React from 'react';
import moment from 'moment';
import {Menu} from 'lucide-react';
import Clock from 'react-live-clock';
import {UserButton} from '@clerk/nextjs';





// Main function
const HomeTopbar = ({isSidebarOpened, setIsSidebarOpened}:any) => {


    // Today's Date
    const date = new Date();
    const today = moment(date).format('ddd, DD MMM Y');


    return (
        <nav className='flex flex-row justify-between items-center bg-white rounded-[8px] mt-4 mx-4 py-2 px-6'>
            <div className='flex flex-col items-center'>
                <p className='text-[#5392C6] text-sm mb-2'>{today}</p>
                <Clock format={'HH:mm:ss'} ticking={true} className='text-4xl'/>
            </div>
            <div className='hidden md:block'>
                <UserButton />
            </div>
            <div
                className='flex justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform md:hidden'
                onClick={() => setIsSidebarOpened(!isSidebarOpened)}
            >
                <Menu
                    size={18}
                    className='text-hash-color'
                />
            </div>
        </nav>
    );
};





// Export
export default HomeTopbar;