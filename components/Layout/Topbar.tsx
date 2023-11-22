// Imports
import Image from 'next/image';
import {Input} from '../ui/input';
import {UserButton} from '@clerk/nextjs';
import {Menu, Scan, Grid3X3, Search, Globe, CalendarDays, Flag, Bell} from 'lucide-react';





// Main function
const Topbar = ({isSidebarOpened, setIsSidebarOpened}:any) => {
    return (
        <nav className='flex flex-col items-center justify-between bg-[#17375e] w-full border-b-[0.5px] border-[#ccc] px-4 py-2 md:flex-row'>
            <div
                className='flex w-full flex-row justify-between items-center gap-3 border-b-[0.5px] border-[#ccc] md:w-auto md:border-b-0'
            >

                {/* Logo */}
                <Image
                    width={125}
                    height={125}
                    alt='Qodum logo'
                    src='/assets/logo.png'
                    className='bg-white p-[2px] rounded-[5px]'
                />

                {/* Icons */}
                <div className='flex flex-row justify-between gap-3'>
                    <div className='flex justify-center items-center border-2 border-[#ccc] bg-white w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'
                        onClick={() => setIsSidebarOpened(!isSidebarOpened)}
                    >
                        <Menu
                            size={18}
                            className='text-hash-color'
                        />
                    </div>
                    <div className='hidden justify-center items-center border-2 border-[#ccc] bg-white w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform md:flex'>
                        <Scan
                            size={18}
                            className='text-hash-color'
                        />
                    </div>
                    <div className='hidden justify-center items-center border-2 border-[#ccc] bg-white w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform md:flex'>
                        <Grid3X3
                            size={18}
                            className='text-hash-color'
                        />
                    </div>
                </div>

                {/* Input */}
                <div
                    className='relative hidden md:block'
                >
                    <Input
                        placeholder='Search'
                        className='rounded-[5px] border-[#ccc] bg-white text-xs text-hash-color w-[250px]'
                    />
                    <Search
                        size={20}
                        className='absolute right-2 top-[25%] text-white cursor-pointer'
                    />
                </div>

            </div>


            <div
                className='flex flex-row w-full justify-between items-center gap-4 mt-2 lg:gap-10 md:w-auto md:mt-0'
            >

                {/* Icons */}
                <div className='flex flex-row justify-between gap-3'>
                    <div className='flex justify-center items-center border-2 border-[#ccc] bg-white w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'>
                        <Globe
                            size={18}
                            className='text-hash-color'
                        />
                    </div>
                    <div className='flex justify-center items-center border-2 border-[#ccc] bg-white w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'>
                        <CalendarDays
                            size={18}
                            className='text-hash-color'
                        />
                    </div>
                    <div className='flex justify-center items-center border-2 border-[#ccc] bg-white w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'>
                        <Flag
                            size={18}
                            className='text-hash-color'
                        />
                    </div>
                    <div className='flex justify-center items-center border-2 border-[#ccc] bg-white w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'>
                        <Bell
                            size={18}
                            className='text-hash-color'
                        />
                    </div>
                </div>

                {/* User Button */}
                <UserButton
                    appearance={{
                        elements:{
                            avatarBox:'rounded-[8px] w-[35px] h-[35px]'
                        }
                    }}
                />

            </div>
        </nav>
    );
};





// Export
export default Topbar;