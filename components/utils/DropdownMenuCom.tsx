// Imports
import Link from 'next/link';
import {Menu} from 'lucide-react';
import {createElement} from 'react';
import modules from '@/constants/modules';
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';





// Main function
const DropdownMenuCom = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none flex justify-center items-center border-2 text-hash-color border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'>
                <Menu
                    size={18}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='bg-white rounded-[8px]'
            >
                {modules.map(module => (
                    <Link
                        target='_blank'
                        href={`/${module.moduleName.toLowerCase().replace(/\s+/g,"-")}`}
                    >
                        <div
                            className={`group w-full flex flex-row justify-between rounded-[8px] px-4 py-2 mt-2 transition hover:bg-[#195382] text-xs`}
                        >
                                <div className={`flex flex-row w-full items-center gap-2 transition group-hover:text-white`}>
                                    <div className='flex justify-center'>
                                        {createElement(module.icon)}
                                    </div>
                                    <p
                                        className='text-[16px] text-bold'
                                    >
                                        {module.moduleName}
                                    </p>
                                </div>
                        </div>
                    </Link>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};





// Export
export default DropdownMenuCom;