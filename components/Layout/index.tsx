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
        <main className='w-full h-screen flex flex-col bg-[#ecedf0] font-Poppins'>
            <Topbar
                isSidebarOpened={isSidebarOpened}
                setIsSidebarOpened={setIsSidebarOpened}
            />
            <ConfigBar />
            <div className='relative flex flex-row flex-1 overflow-hidden'>
                <Sidebar
                    isSidebarOpened={isSidebarOpened}
                    setIsSidebarOpened={setIsSidebarOpened}
                />
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