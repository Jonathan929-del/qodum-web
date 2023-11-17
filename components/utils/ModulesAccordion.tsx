'use client';
// Imports
import Link from 'next/link';
import modules from '@/constants/modules';
import {usePathname} from 'next/navigation';
import {ChevronDown, MoveRight} from 'lucide-react';
import {createElement, useEffect, useState} from 'react';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';

 



// Main function
const ModulesAccordion = ({isSidebarOpened, setIsSidebarOpened}:any) => {


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
        if(window.innerWidth > 768){
            setIsSidebarOpened(true);
        }else{
            setIsSidebarOpened(false);
        }
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);
    

    return (
        <Accordion type="single" collapsible
            className='w-full'
        >

            {/* Modules Links */}
            {
                modules.map(module => (
                    <AccordionItem value={module.moduleName}
                        onClick={() => setSelectedModule(module.moduleName)}
                    >
                        <AccordionTrigger
                            onClick={() => setIsSidebarOpened(true)}
                            className={`w-full flex flex-row justify-between px-4 border-l-2 border-b-2 border-b-[#ccc] ${selectedModule === module.moduleName ? 'border-l-main-color border-b-0 bg-[#F6F6F6]' : 'border-l-white hover:bg-[#F6F6F6]'}`}
                        >
                            <div className='flex flex-row items-center gap-1'>
                                <div
                                    className='text-main-color bg-white text-[10px] p-2 rounded-[8px]'
                                >
                                    {createElement(module.icon)}
                                </div>
                                <p
                                    className={`${isSidebarOpened ? 'block' : 'hidden'} ${selectedModule === module.moduleName && 'text-main-color'} text-[16px] text-bold`}
                                >
                                    {module.moduleName}
                                </p>
                            </div>
                            <ChevronDown className={`${isSidebarOpened ? 'block' : 'hidden'} h-4 w-4 shrink-0 transition-transform duration-200 ml-10 text-hash-color`}/>
                        </AccordionTrigger>
                        <AccordionContent
                            className={`${isSidebarOpened ? 'block' : 'hidden'} bg-[#F6F6F6]`}
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
                                                    className={`flex flex-row justify-between py-2 mx-4 px-2 border-l-2 transition hover:bg-white ${selectedPage === page.pageName && 'border-l-main-color'}`}
                                                >
                                                    {page.pageName}
                                                    <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 text-hash-color`}/>
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
                                                                                    className='flex flex-row items-center justify-start ml-4 py-1 pr-2 border-l-2 transition border-main-color hover:bg-white'
                                                                                >
                                                                                    <p
                                                                                        className='text-[12px] ml-2'
                                                                                    >
                                                                                        {subPage.subPageName}
                                                                                    </p>
                                                                                    <ChevronDown
                                                                                        size={18}
                                                                                        className='text-hash-color ml-2'
                                                                                    />
                                                                                </AccordionTrigger>
                                                                                <AccordionContent>
                                                                                    {
                                                                                        subPage?.threads?.map((thread:any) => (
                                                                                            <Link
                                                                                                onClick={() => {
                                                                                                    linkClick();
                                                                                                    setSelectedThread(thread);
                                                                                                }}
                                                                                                href={`/${selectedModule.toLowerCase()}/${thread.toLowerCase().replace(/\s+/g,"-")}`}
                                                                                            >
                                                                                                <div className='group flex flex-row items-center ml-8 py-1 pr-2 transition hover:bg-white'>
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
                                                                            href={`/${selectedModule.toLowerCase()}/${subPage?.subPageName?.toLowerCase().replace(/\s+/g,"-")}`}
                                                                        >
                                                                            <div className='group flex flex-row items-center ml-4 py-1 pr-2 border-l-2 transition border-main-color hover:bg-white'>
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
    );
};





// Export
export default ModulesAccordion;