'use client';
// Imports
import {useState} from 'react';
import Topbar from './Pages/Topbar';
import Footer from './Pages/Footer';
import Sidebar from './Pages/Sidebar';
import ConfigBar from './Pages/ConfigBar';
import HomeTopbar from './Home/HomeTopbar';
import {usePathname} from 'next/navigation';





// Main function
const index = ({children}:any) => {


    // Sidebar Toggler
    const [isSidebarOpened, setIsSidebarOpened] = useState(true);


    // Pathname
    const pathname = usePathname();


    return (
        <main className='w-full h-screen flex flex-row bg-[#ecedf0] font-Poppins'>
            <Sidebar
                isSidebarOpened={isSidebarOpened}
                setIsSidebarOpened={setIsSidebarOpened}
            />
            <div className='relative flex flex-col flex-1 overflow-hidden'>
                {
                    pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1) === ''
                    ? (
                        <HomeTopbar
                            isSidebarOpened={isSidebarOpened}
                            setIsSidebarOpened={setIsSidebarOpened}
                        />   
                    )
                    : (
                        <>
                            <Topbar
                                isSidebarOpened={isSidebarOpened}
                                setIsSidebarOpened={setIsSidebarOpened}
                            />    
                            <ConfigBar />
                        </>
                    )
                }
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