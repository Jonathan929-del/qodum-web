// Imports
import {createElement, useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import {CircleDollarSignIcon, Wallet, Box, GraduationCap, Users, FileStack, Megaphone, Calendar, Home} from 'lucide-react';





// Main function
const ConfigBar = () => {


        // Pathname
        const pathname = usePathname();


        // Page Name
        const [pageName, setPageName] = useState('/');
        const [icon, setIcon] = useState<any>();


        // Use Effect
        useEffect(() => {
            const page = pathname === '/' ? 'Home' : `${pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1)} ${pathname.split('/')[2] ? '/' : ''} ${pathname.split('/')[2] ? pathname.split('/')[2]?.split('-').join(' ').split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ') : ''}`;
            switch (pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1)) {
                case 'Time-table':
                    setIcon(<Calendar className='text-hash-color p-1'/>);
                    break;
                case 'Accounts':
                    setIcon(<FileStack className='text-hash-color p-1'/>);
                    break;
                case 'Fees':
                    setIcon(<CircleDollarSignIcon className='text-hash-color p-1'/>);
                    break;
                case 'Admission':
                    setIcon(<GraduationCap className='text-hash-color p-1'/>);
                    break;
                case 'Payroll':
                    setIcon(<Wallet className='text-hash-color p-1'/>);
                    break;
                case 'Stocks':
                    setIcon(<Box className='text-hash-color p-1'/>);
                    break;
                case 'Users':
                    setIcon(<Users className='text-hash-color p-1'/>);
                    break;
                case 'Attendance':
                    setIcon(<Megaphone className='text-hash-color p-1'/>);
                    break;
                default:
                    setIcon(<Home className='text-hash-color p-1'/>);
                    break;
            }
            setPageName(page);
        }, [pathname]);


    return (
        <div
            className='w-full bg-white flex flex-row items-center py-3 pl-0 justify-center md:pl-[260px] md:justify-start'
        >
            <div
                className='rounded-[8px] border-2 border-main-color'
            >
                {icon}
            </div>
            <h2
                className='text-md sm:text-lg text-hash-color ml-2'
            >
                {
                    pageName.split(' / ')[0] !== 'Time-table' ? pageName :
                    `${pageName.split(' / ')[0]?.split('-').join(' ').split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ')} / ${pathname.split('/')[2]?.split('-').join(' ').split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ')}`
                }
            </h2>
        </div>
    );
};





// Export
export default ConfigBar;