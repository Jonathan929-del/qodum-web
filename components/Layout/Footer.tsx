// Imports
import React from 'react';
import {Link as LinkIcon} from 'lucide-react'
import Link from 'next/link';





// Main function
const Footer = () => {
    return (
        <footer className='w-full flex flex-col justify-between rounded-[8px] bg-[#DFECF6] px-6 py-4 gap-3 lg:px-10 sm:flex-row sm:gap-0'>

            <p className='font-semibold'>
                Academic Year: 2023 - 2024
            </p>

            <Link
                href='/'
                className='flex flex-row items-center text-[#2273b6]'
            >
                <LinkIcon
                size={20}
                    className='mr-1'
                />
                Kisanpgcollegeraksa.ac.an
            </Link>

        </footer>
    );
};





// Export
export default Footer;