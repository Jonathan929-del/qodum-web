'use client';
// Imports
import Link from 'next/link';
import Image from 'next/image';
import modules from '@/constants/modules';
import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import {MoveRight, ChevronDown} from 'lucide-react';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';





// Main function
const ModulesAccordion = ({isSidebarOpened, setIsSidebarOpened, openedPages, setOpenedPages, setSelectedPage}:any) => {


    // Router
    const pathname = usePathname();


    // Currnet Module
    const [currentModule, setCurrentModule] = useState({});


    // Select Module
    const [selectedModule, setSelectedModule] = useState('');


    // Selected Page
    const [selectedSubPage, setSelectedSubPage] = useState('');


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


    // Thread click
    const pageClick = (page:any) => {
        linkClick();
        setSelectedPage(page);
        setSelectedThread(page);
        if(openedPages.includes(page)){
            return;
        } else {
            const uniquePagesNames = openedPages.filter((item:any, index:any) => openedPages.indexOf(item) === index);
            setOpenedPages([...uniquePagesNames, page]);
        };
        if(page === 'Daily Fee Collection' || page === 'Receipt Wise Fee Type Collection'){
            setIsSidebarOpened(false);
        };
    };


    // Use Effect
    useEffect(() => {


        // Selected Module
        const threadName = pathname.split('/')[2]?.split('-').join(' ').split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
        setSelectedThread(threadName);
        const pageName = pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1);
        setSelectedModule(pageName);
        
        
        // Current Module
        const module = modules.filter(module => module.moduleName === pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1));
        setCurrentModule(module[0]);


        // Window Resizing
        window.addEventListener('resize', updateDimensions);
        if(window.innerWidth > 768){
            setIsSidebarOpened(true);
        }else{
            setIsSidebarOpened(false);
        }
        return () => window.removeEventListener('resize', updateDimensions);

    
    }, [pathname]);


    return (
        <Accordion
            defaultValue={modules.map(module => module.moduleName)}
            type='multiple'
            className='w-full h-full mt-2 overflow-scroll custom-sidebar-scrollbar'
        >
            <AccordionItem
                value={
                    // @ts-ignore
                    currentModule?.moduleName
                }
            >
                {/* Layer 1 */}
                <Link
                    href={`/${selectedModule.toLowerCase().replace(/\s+/g,"-")}`}
                >
                    <AccordionTrigger
                        onClick={() => setIsSidebarOpened(true)}
                        className='w-full flex flex-row justify-between px-4 text-white rounded-[8px] mt-2 transition bg-[#195382]'
                    >
                        <div className='flex flex-row w-full items-center gap-2 transition'>
                            <div className={`${!isSidebarOpened ? 'w-full' : 'w-auto'} flex justify-center`}>
                                <Image
                                    // @ts-ignore
                                    src={currentModule.icon}
                                    width={35}
                                    height={35}
                                    alt='Icon'
                                />
                                {/* {icon} */}
                            </div>
                            <p
                                className={`${isSidebarOpened ? 'block' : 'hidden'} text-[16px] text-bold`}
                            >
                                {
                                    // @ts-ignore
                                    currentModule?.moduleName
                                }
                            </p>
                        </div>
                        <ChevronDown className={`h-4 w-4 ml-12 shrink-0 text-white transition-transform duration-200  ${isSidebarOpened ? 'block' : 'hidden'}`}/>
                    </AccordionTrigger>
                </Link>
                <AccordionContent
                    className={`${isSidebarOpened ? 'block' : 'hidden'} bg-[#F6F6F6] mt-2 ml-4`}
                >


                    {/* Module Pages Links */}
                    <Accordion
                        type="single"
                        collapsible
                    >
                        {
                            // @ts-ignore
                            currentModule?.pages?.map(page => (
                                    <AccordionItem value={page.pageName}>
                                        {/* Layer 2 */}
                                        <AccordionTrigger
                                            onClick={() => setSelectedSubPage(page.pageName)}
                                            className={`flex flex-row justify-between px-4 py-2 mt-[5px] border-l-2 transition rounded-[8px] bg-white hover:bg-[#e7f0f7] hover:border-main-color hover:text-main-color ${selectedSubPage === page.pageName ? 'border-main-color bg-[#e7f0f7] text-main-color' : 'border-white'}`}
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
                                                                    {/* Layer 3 */}
                                                                    <AccordionItem value='name'>
                                                                        <AccordionTrigger
                                                                            className='flex flex-row items-center justify-start ml-2 py-1 pr-2 transition hover:bg-white'
                                                                        >
                                                                            <p className='flex flex-row items-center text-[12px] ml-2'>
                                                                                <p className='font-bold mr-2'>{page.subPages.indexOf(subPage) + 1}.</p>
                                                                                <p>{subPage.subPageName}</p>
                                                                            </p>
                                                                            <ChevronDown className={`h-4 w-4 ml-12 shrink-0 transition-transform duration-200 ${isSidebarOpened ? 'block' : 'hidden'}`}/>
                                                                        </AccordionTrigger>
                                                                        <AccordionContent>
                                                                            {
                                                                                subPage?.threads?.map((thread:any) => (
                                                                                    <Link
                                                                                        onClick={() => pageClick(thread)}
                                                                                        href={`/${selectedModule.toLowerCase().replace(/\s+/g,"-")}/${thread.toLowerCase().replace(/\s+/g,"-")}`}
                                                                                    >
                                                                                        {/* Layer 4 */}
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
                                                                    onClick={() => pageClick(subPage.subPageName)}
                                                                    href={`/${selectedModule.toLowerCase().replace(/\s+/g,"-")}/${subPage?.subPageName?.toLowerCase().replace(/\s+/g,"-")}`}
                                                                >
                                                                    {/* Layer 3 */}
                                                                    <div className='group flex flex-row items-center ml-2 py-1 pr-2 transition hover:bg-white'>
                                                                        <div className={`text-[12px] ml-2 flex flex-row items-center ${selectedThread === subPage.subPageName && 'text-main-color'}`}>
                                                                            <p className='font-bold mr-2'>{page.subPages.indexOf(subPage) + 1}.</p>
                                                                            <p>{subPage.subPageName}</p>
                                                                        </div>
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
        </Accordion>
    );
};





// Export
export default ModulesAccordion;














{/* Home Link */}
{/* <Link
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
            className={`group w-full flex flex-row justify-between px-4 text-white rounded-[8px] mb-2 transition hover:bg-[#195382] ${selectedModule === 'Home' && 'bg-[#195382]'}`}
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
</Link> */}