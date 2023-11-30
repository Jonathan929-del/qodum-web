'use client';
// Imports
import {useState} from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Topbar from './Pages/Topbar';
import PagesList from './Pages/PagesList';
import ConfigBar from './Pages/ConfigBar';
import HomeTopbar from './Home/HomeTopbar';
import {usePathname} from 'next/navigation';





// Main function
const index = ({children}:any) => {


    // Sidebar Toggler
    const [isSidebarOpened, setIsSidebarOpened] = useState(true);


    // Opened Pages
    const [openedPages, setOpenedPages] = useState([]);
    const [selectedPage, setSelectedPage] = useState('');


    // Pathname
    const pathname = usePathname();


    return (
        <main className='w-full h-screen flex flex-row bg-[#ecedf0] font-Poppins'>
            <Sidebar
                isSidebarOpened={isSidebarOpened}
                setIsSidebarOpened={setIsSidebarOpened}
                openedPages={openedPages}
                setOpenedPages={setOpenedPages}
                setSelectedPage={setSelectedPage}
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
                            {pathname.split('/')[2] && (
                                <PagesList
                                    openedPages={openedPages}
                                    selectedPage={selectedPage}
                                    setOpenedPages={setOpenedPages}
                                    setSelectedPage={setSelectedPage}
                                />
                            )}
                        </>
                    )
                }
                <div className='flex-1 flex flex-col justify-between gap-6 pb-4 overflow-scroll custom-scrollbar'>
                    {children}
                </div>
                <Footer />
            </div>
        </main>
    );
};





// Export
export default index;