// Imports
import Link from 'next/link';
import {Menu} from 'lucide-react';
import {createElement} from 'react';
import modules from '@/constants/modules';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import Image from 'next/image';





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
                        href={`/${module.moduleName.toLowerCase().replace(/\s+/g,"-")}`}
                    >
                        <DropdownMenuItem className='h-full w-full py-0 px-0 cursor-pointer'>
                            <div
                                className={`group w-full flex flex-row justify-between px-2 py-2 text-xs transition hover:bg-[#e1e1e1]`}
                            >
                                    <div className={`flex flex-row w-full items-center gap-2 transition`}>
                                        <div className='flex justify-center'>
                                            {module.icon && (
                                                <Image
                                                    src={module.icon}
                                                    alt='Icon'
                                                    height={20}
                                                    width={20}
                                                />
                                            )}
                                        </div>
                                        <p className=''>
                                            {module.moduleName}
                                        </p>
                                    </div>
                            </div>
                        </DropdownMenuItem>
                    </Link>
                ))}
            </DropdownMenuContent>
            {/* <DropdownMenuTrigger className='outline-none flex justify-center items-center border-2 text-hash-color border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'>
                <Menu
                    size={18}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='bg-white rounded-[8px]'
            >
                {modules.map(module => (
                    <Link
                        href={`/${module.moduleName.toLowerCase().replace(/\s+/g,"-")}`}
                    >
                        <DropdownMenuItem className='cursor-pointer h-full py-0'>
                            <div
                                className={`group w-full flex flex-row justify-between rounded-[8px] px-4 py-[2px] mt-2 transition hover:bg-[#195382] text-xs`}
                            >
                                    <div className={`flex flex-row w-full items-center gap-2 transition group-hover:text-white`}>
                                        <div className='flex justify-center'>
                                            {createElement(module.icon)}
                                        </div>
                                        <p className='font-semibold'>
                                            {module.moduleName}
                                        </p>
                                    </div>
                            </div>
                        </DropdownMenuItem>
                    </Link>
                ))}
            </DropdownMenuContent> */}
        </DropdownMenu>
    );
};





// Export
export default DropdownMenuCom;