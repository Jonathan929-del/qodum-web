'use client';
// Imports
// Imports
import Link from 'next/link';
import Image from 'next/image';
import modules from '@/constants/modules';
import {usePathname} from 'next/navigation';
import {createElement, useEffect, useState} from 'react';
import {MoveRight, ChevronDown, Home, X} from 'lucide-react';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';





// Main function
const Sidebar = ({isSidebarOpened, setIsSidebarOpened}:any) => {


    // Pathname
    const pathname = usePathname();


    // Select Module
    const [selectedModule, setSelectedModule] = useState('');


    // Selected Page
    const [selectedPage, setSelectedPage] = useState('');


    // Selected thread
    const [selectedThread, setSelectedThread] = useState('');


    // Window Width
    const [width, setWidth] = useState(window.innerWidth);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
        if(window.innerWidth > 768){
            setIsSidebarOpened(true);
        }else{
            setIsSidebarOpened(false);
        }
    };


    // Link Clicked
    const linkClick = () => {
        width < 768 && setIsSidebarOpened(false);
    };
    
    
    // Use Effect
    useEffect(() => {
        window.addEventListener('resize', updateDimensions);
        const threadName = pathname.split('/')[2]?.split('-').join(' ').split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
        setSelectedThread(threadName);
        const pageName = pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1);
        setSelectedModule(pageName === '' ? 'Home' : pageName);
        if(window.innerWidth > 768){
            setIsSidebarOpened(true);
        }else{
            setIsSidebarOpened(false);
        }
        return () => window.removeEventListener('resize', updateDimensions);
    }, [pathname]);


    return (
        <aside
            className={`flex flex-col bg-[#FAFAFA] items-center pt-10 pb-20 transition overflow-scroll custom-sidebar-scrollbar px-4 z-10
                        absolute h-[100%] w-full md:left-0 ${isSidebarOpened ? 'left-0' : 'left-[-100%]'} md:relative md:w-auto`}
        >


            {/* Logo */}
            <div className='w-full flex flex-row items-center justify-between border-b-[0.5px] border-[#ccc] md:justify-center'>
                <Image
                    width={125}
                    height={125}
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
            <Accordion type="single" collapsible
                className='w-full mt-10'
            >

                <Link
                    onClick={() => {
                        linkClick();
                        setSelectedPage('');
                    }}
                    href='/'
                >
                    <AccordionItem
                        value='Home'
                        onClick={() => setSelectedModule('Home')}
                    >
                        <AccordionTrigger
                            onClick={() => setIsSidebarOpened(true)}
                            className={`group w-full flex flex-row justify-between px-4 text-white rounded-[8px] mb-4 transition hover:bg-[#195382] ${selectedModule === 'Home' && 'bg-[#195382]'}`}
                        >
                            <div className={`flex flex-row items-center gap-2 transition group-hover:text-white ${selectedModule === 'Home' ? 'text-white' : 'text-black'}`}>
                                <div className={`${!isSidebarOpened && 'px-10'}`}>
                                    <Home />
                                </div>
                                <p
                                    className={`${isSidebarOpened ? 'block' : 'hidden'} text-[16px] text-bold`}
                                >
                                    Home
                                </p>
                            </div>
                        </AccordionTrigger>
                    </AccordionItem>
                </Link>


                {/* Modules Links */}
                {
                    modules.map(module => (
                        <AccordionItem
                            value={module.moduleName}
                            onClick={() => setSelectedModule(module.moduleName)}
                        >
                            <AccordionTrigger
                                onClick={() => setIsSidebarOpened(true)}
                                className={`group w-full flex flex-row justify-between px-4 text-white rounded-[8px] mt-2 transition hover:bg-[#195382] ${selectedModule === module.moduleName && 'bg-[#195382]'}`}
                            >
                                <div className={`flex flex-row items-center gap-2 transition group-hover:text-white ${selectedModule === module.moduleName ? 'text-white' : 'text-black'}`}>
                                    <div className={`${!isSidebarOpened && 'px-10'}`}>
                                        {createElement(module.icon)}
                                    </div>
                                    <p
                                        className={`${isSidebarOpened ? 'block' : 'hidden'} text-[16px] text-bold`}
                                    >
                                        {module.moduleName}
                                    </p>
                                </div>
                                <ChevronDown className={`h-4 w-4 ml-12 shrink-0 text-hash-color transition-transform duration-200 group-hover:text-white ${isSidebarOpened ? 'block' : 'hidden'} ${selectedModule === module.moduleName && 'text-white'}`}/>
                            </AccordionTrigger>
                            <AccordionContent
                                className={`${isSidebarOpened ? 'block' : 'hidden'} bg-[#F6F6F6] mt-2`}
                            >
                                
                                {/* Module Pages Links */}
                                <Accordion
                                    type="single"
                                    collapsible
                                >
                                    {
                                        module.pages.map(page => (
                                                <AccordionItem value={page.pageName}>
                                                    <AccordionTrigger
                                                        onClick={() => setSelectedPage(page.pageName)}
                                                        className={`flex flex-row justify-between px-4 py-2 mt-[5px] border-l-2 transition rounded-[8px] bg-white hover:bg-[#e7f0f7] hover:border-main-color hover:text-main-color ${selectedPage === page.pageName ? 'border-main-color bg-[#e7f0f7] text-main-color' : 'border-white'}`}
                                                    >
                                                        {page.pageName}
                                                        <ChevronDown className={`h-4 w-4 ml-2 shrink-0 transition-transform duration-200 ${isSidebarOpened ? 'block' : 'hidden'}`}/>
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        {
                                                            page.subPages.map((subPage:any) => 
                                                                {
                                                                    return subPage?.threads ?
                                                                        (
                                                                            <Accordion
                                                                                type="single"
                                                                                collapsible
                                                                            >
                                                                                <AccordionItem value='name'>
                                                                                    <AccordionTrigger
                                                                                        className='flex flex-row items-center justify-start ml-2 py-1 pr-2 border-l-2 transition border-main-color hover:bg-white'
                                                                                    >
                                                                                        <p
                                                                                            className='text-[12px] ml-2'
                                                                                        >
                                                                                            {subPage.subPageName}
                                                                                        </p>
                                                                                        <ChevronDown className={`h-4 w-4 ml-12 shrink-0 transition-transform duration-200 ${isSidebarOpened ? 'block' : 'hidden'}`}/>
                                                                                    </AccordionTrigger>
                                                                                    <AccordionContent>
                                                                                        {
                                                                                            subPage?.threads?.map((thread:any) => (
                                                                                                <Link
                                                                                                    onClick={() => {
                                                                                                        linkClick();
                                                                                                        setSelectedThread(thread);
                                                                                                    }}
                                                                                                    href={`/${selectedModule.toLowerCase().replace(/\s+/g,"-")}/${thread.toLowerCase().replace(/\s+/g,"-")}`}
                                                                                                >
                                                                                                    <div className='group flex flex-row items-center ml-8 py-1 pr-2 transition-transform hover:bg-white'>
                                                                                                        <p
                                                                                                            className={`text-[12px] transition ${selectedThread === thread && 'text-main-color'}`}
                                                                                                        >
                                                                                                            {thread}
                                                                                                        </p>
                                                                                                        <MoveRight
                                                                                                            size={18}
                                                                                                            className='hidden text-main-color ml-2 group-hover:block transition'
                                                                                                        />
                                                                                                    </div>
                                                                                                </Link>
                                                                                            ))
                                                                                        }
                                                                                    </AccordionContent>
                                                                                </AccordionItem>
                                                                            </Accordion>
                                                                        )
                                                                        :
                                                                        (
                                                                            <Link
                                                                                onClick={() => {
                                                                                    linkClick();
                                                                                    setSelectedThread(subPage.subPageName);
                                                                                }}
                                                                                href={`/${selectedModule.toLowerCase().replace(/\s+/g,"-")}/${subPage?.subPageName?.toLowerCase().replace(/\s+/g,"-")}`}
                                                                            >
                                                                                <div className='group flex flex-row items-center ml-2 py-1 pr-2 border-l-2 transition border-main-color hover:bg-white'>
                                                                                    <p
                                                                                        className={`text-[12px] ml-2 ${selectedThread === subPage.subPageName && 'text-main-color'}`}
                                                                                    >
                                                                                        {subPage.subPageName}
                                                                                    </p>
                                                                                    <MoveRight
                                                                                        size={18}
                                                                                        className='opacity-0 text-main-color ml-2 group-hover:opacity-100 transition'
                                                                                    />
                                                                                </div>
                                                                            </Link>
                                                                        )
                                                                }
                                                            )
                                                        }
                                                    </AccordionContent>
                                                </AccordionItem>
                                        ))
                                    }
                                </Accordion>
                            </AccordionContent>
                        </AccordionItem>
                    ))
                }

            </Accordion>
        </aside>
    );
};





// Export
export default Sidebar;