// Imports
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Globe, GraduationCap, PieChart} from 'lucide-react';





// Main function
const Footer = () => {
    return (
        <footer className='flex flex-col items-center justify-between w-full bg-[#F3F8FB] px-4 py-2 lg:flex-row lg:py-[2px]'>


            <Link
                target='_blank'
                href='https://qodumtech.com'
                className='flex flex-row w-full items-start text-[#2A78B8] lg:w-auto'
            >
                <Globe
                    size={20}
                    className='mr-1'
                />
                qodumtech.com
            </Link>

            <div className='flex flex-col w-full items-start gap-0 mt-4 text-sm xl:flex-row xl:gap-4 lg:items-start lg:w-auto lg:gap-2 lg:mt-0'>
                <div className='flex flex-row items-center'>
                    <GraduationCap />
                    <p className='ml-2'>
                        Academic Year: 2023 - 2024
                    </p>
                </div>
                <div className='flex flex-row items-center'>
                    <PieChart />
                    <p className='ml-2'>
                        Financial Year: 2023 - 2024
                    </p>
                </div>
            </div>


            <div className='flex w-full justify-end lg:w-auto'>
                <Image
                    alt='Logo'
                    width={100}
                    height={100}
                    src='/assets/logo.png'
                />
            </div>


        </footer>
    );
};





// Export
export default Footer;