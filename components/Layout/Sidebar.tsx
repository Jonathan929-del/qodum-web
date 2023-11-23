'use client';
// Imports
import Image from 'next/image';
import {X} from 'lucide-react';
import ModulesAccordion from './ModulesAccordion';





// Main function
const Sidebar = ({isSidebarOpened, setIsSidebarOpened}:any) => {
    return (
        <aside
            className={`flex flex-col bg-[#FAFAFA] items-center transition z-10
                        absolute h-[100%] w-full md:left-0 ${isSidebarOpened ? 'left-0 px-4' : 'left-[-100%] px-2'} md:relative md:w-auto`}
        >

            {/* Logo */}
            <div className='w-full flex flex-row items-center justify-between py-6 border-b-[0.5px] border-[#ccc] md:justify-center'>
                <Image
                    width={isSidebarOpened ? 125 : 100}
                    height={isSidebarOpened ? 125 : 100}
                    alt='Qodum logo'
                    src='/assets/logo.png'
                    className='p-[2px] rounded-[5px]'
                />
                <div
                    className='flex justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition md:hidden'
                    onClick={() => setIsSidebarOpened(false)}
                >
                    <X
                        size={18}
                        className='text-hash-color'
                    />
                </div>
            </div>


            {/* Accordion */}
            <ModulesAccordion
                isSidebarOpened={isSidebarOpened}
                setIsSidebarOpened={setIsSidebarOpened}
            />
            
        </aside>
    );
};





// Export
export default Sidebar;