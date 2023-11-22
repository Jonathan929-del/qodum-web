'use client';
// Imports
import Topbar from './Topbar';
import Footer from './Footer';
import {useState} from 'react';
import Sidebar from './Sidebar';
import ConfigBar from './ConfigBar';





// Main function
const index = ({children}:any) => {


    // Sidebar Toggler
    const [isSidebarOpened, setIsSidebarOpened] = useState(true);


    return (
        <main className='w-full h-screen flex flex-row bg-[#ecedf0] font-Poppins'>
            <Sidebar
                isSidebarOpened={isSidebarOpened}
                setIsSidebarOpened={setIsSidebarOpened}
            />
            <div className='relative flex flex-col flex-1 overflow-hidden'>
                <Topbar
                    isSidebarOpened={isSidebarOpened}
                    setIsSidebarOpened={setIsSidebarOpened}
                />
                <ConfigBar />
                <div className='flex-1 flex flex-col justify-between gap-6 overflow-scroll custom-scrollbar'>
                    {children}
                    <Footer />
                </div>
            </div>
        </main>
    );
};





// Export
export default index;