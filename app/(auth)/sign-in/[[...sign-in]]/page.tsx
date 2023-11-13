'use client';
// Import
import {useState} from 'react';
import Image from 'next/image';
import {SignIn} from '@clerk/nextjs';
import {Chrome, X} from 'lucide-react';
import {Button} from '@/components/ui/button';





// Main function
const page = () => {


    // States
    const [isButtonClicked, setIsButtonClicked] = useState(false);


    return (
        <div className='flex w-full h-screen'>
            <div className='flex-1 hidden justify-center items-center relative bg-[#B5B5B5] md:flex'> {/*Image area*/}
                <Image
                    src='/assets/auth img.svg'
                    alt='Auth image'
                    width={500}
                    height={500}
                    priority
                    className='w-full h-full object-cover'
                />
            </div>
            <div className='flex-1 flex flex-col items-center justify-center gap-20'> {/*Form Area*/}
                <Image
                    src='/assets/logo.png'
                    width={250}
                    height={250}
                    alt='Qodum logo'
                />
                <div className='flex flex-col w-full px-10 gap-5 sm:px-20 sm:gap-10'>
                    <h3 className='font-medium text-[24px]'>
                        Sign in
                    </h3>
                    <Button
                        onClick={() => setIsButtonClicked(true)}
                        className='bg-gradient-to-r to-[#56addf] from-[#3e67b1] w-full rounded-full text-white py-7 text-[16px] transition-opacity hover:opacity-90 gap-2'
                    >
                        <Chrome
                            size={40}
                            className='text-white'
                        />
                        Sign in with Google
                    </Button>
                </div>
            </div>
            {isButtonClicked && (
                <div className='w-full h-full absolute z-10 flex justify-center items-center bg-[#000000ba]'>
                    <X
                        className='absolute top-10 right-10 text-white rounded-full bg-black cursor-pointer hover:opacity-50 transition-opacity'
                        size={30}
                        onClick={() => setIsButtonClicked(false)}
                    />
                    <SignIn />
                </div>
            )}
        </div>
    );
};





// Export
export default page;