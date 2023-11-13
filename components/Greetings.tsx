// Imports
import Image from 'next/image';
import {GraduationCap, User} from 'lucide-react';





// Main function
const Greetings = () => {
    return (
        <header className='hidden flex-row justify-between bg-white rounded-[9px] px-10 mt-6 lg:flex'>

            <div className='flex flex-col w-[60%] justify-center'> {/* Texts */}
                <h1 className='text-xl font-bold'>
                    Learn Effectively With Us!
                </h1>
                <p className='mt-6 text-hash-color text-sm'>
                    We Have New Methods to the Learning Process, Faster, More Secure, and Easy to Use.
               </p>
               <div className='flex flex-row justify-between mt-6'>
                    <div className='flex flex-row justify-between items-center'>
                        <GraduationCap
                            size={40}
                            className='rounded-full bg-[#e7f0f7] text-[#195382]'
                        />
                        <div className='flex flex-col items-center ml-2'>
                            <h4 className='text-xl font-semibold'>6,852</h4>
                            <p className='text-sm text-hash-color'>Total Students</p>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <User
                            size={40}
                            className='rounded-full bg-[#e7f0f7] text-[#195382]'
                        />
                        <div className='flex flex-col items-center ml-2'>
                            <h4 className='text-xl font-semibold'>658</h4>
                            <p className='text-sm text-hash-color'>Total Teachers</p>
                        </div>
                    </div>
               </div>
            </div>


            {/* Image */}
            <Image
                width={150}
                height={150}
                alt='Greeting image'
                className='w-auto h-auto'
                src='/assets/greeting.svg'
            />

        </header>
    );
};





// Export
export default Greetings;