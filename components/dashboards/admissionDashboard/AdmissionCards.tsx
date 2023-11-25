// Imports
import React from 'react';
import {Landmark, Banknote, PersonStanding, Globe} from 'lucide-react';
import {Progress} from '@/components/ui/progress';
import Image from 'next/image';





// Main function
const AdmissionCards = () => {
    return (
        <div className='grid grid-rows-4 grid-cols-1 gap-4 mt-4 sm:grid-cols-2 sm:grid-rows-2 md:grid-rows-4 md:grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 2xl:grid-cols-4 2xl:grid-rows-1'>


            {/* Card One */}
            <div className='flex flex-col flex-1 bg-white py-4 px-2 rounded-[8px]'>
                <div className='flex flex-row justify-center text-sm'>
                    <p className='font-bold'>Student Headcounts</p>
                    <span className='ml-2 text-hash-color'>(YTD)</span>
                </div>
                <div className='flex flex-row justify-center mt-2 items-center'>
                    <span className='text-hash-color text-sm'>Total:</span>
                    <p className='font-bold ml-2 text-xl'>3850</p>
                </div>
                <div className='flex flex-col mt-4 gap-2'>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex-1 flex flex-row items-center justify-start'>
                            <PersonStanding color='#959595'/>
                            <div className='ml-2 flex-1'>
                                <Progress value={60} indicatorColor='bg-[#959595]'/>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-row ml-[2px] justify-center items-center text-sm xl:flex-row'>
                            <p>23,10</p>
                            <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>(60%)</span>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex-1 flex flex-row items-center justify-start'>
                            <Image
                                width={25}
                                height={25}
                                alt='Girl icon'
                                src='/assets/girl.png'
                            />
                            <div className='ml-2 flex-1'>
                                <Progress value={40} indicatorColor='bg-[#dd288f]'/>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-row ml-[2px] justify-center items-center text-sm xl:flex-row'>
                            <p>1540</p>
                            <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>(40%)</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Card Two */}
            <div className='flex flex-col flex-1 bg-white py-4 px-2 rounded-[8px]'>
                <div className='flex flex-row justify-center text-sm'>
                    <p className='font-bold'>New Admission Statistics</p>
                    <span className='ml-2 text-hash-color'>(YTD)</span>
                </div>
                <div className='flex flex-row justify-center mt-2 items-center'>
                    <span className='text-hash-color text-sm'>Total:</span>
                    <p className='font-bold ml-2 text-xl'>290</p>
                </div>
                <div className='flex flex-col mt-4 gap-2'>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex-1 flex flex-row items-center justify-start'>
                            <Landmark color='#EC8428'/>
                            <div className='ml-2 flex-1'>
                                <Progress value={70} indicatorColor='bg-[#EC8428]'/>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-row ml-[2px] justify-center items-center text-sm xl:flex-row'>
                            <p>203</p>
                            <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>(70%)</span>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex-1 flex flex-row items-center justify-start'>
                            <Globe color='#12A6C5'/>
                            <div className='ml-2 flex-1'>
                                <Progress value={30} indicatorColor='bg-[#12A6C5]'/>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-row ml-[2px] justify-center items-center text-sm xl:flex-row'>
                            <p>87</p>
                            <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>(30%)</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Card Three */}
            <div className='flex flex-col bg-white py-4 px-2 rounded-[8px]'>
                <div className='flex flex-row justify-center text-sm'>
                    <p className='font-bold'>New Admission Ratio</p>
                    <span className='ml-2 text-hash-color'>(vs. prev. year)</span>
                </div>
                <div className='flex-1 flex flex-row mt-4 gap-2'>
                    <div className='flex-1 flex flex-col'>
                        <div className='flex-1'/>
                        <div className='flex-1 flex flex-row items-center'>
                            <PersonStanding color='#959595'/>
                            <p>Boys</p>
                        </div>
                        <div className='flex-1 flex flex-row items-center'>
                            <Image
                                width={25}
                                height={25}
                                alt='Girl icon'
                                src='/assets/girl.png'
                            />
                            <p>Girls</p>
                        </div>
                    </div>
                    <div className='flex-1 flex flex-col items-center'>
                        <p className='flex-1 flex items-center font-semibold'>This Year</p>
                        <p className='flex-1 flex flex-row items-center justify-center text-sm'>210 (+13.5%)</p>
                        <p className='flex-1 flex flex-row items-center justify-center text-sm'>80 (-15.78%)</p>
                    </div>
                    <div className='flex-1 flex flex-col items-center'>
                        <p className='flex-1 flex items-center font-semibold'>Prev Year</p>
                        <p className='flex-1 flex flex-row items-center justify-center text-sm'>185</p>
                        <p className='flex-1 flex flex-row items-center justify-center text-sm'>95</p>
                    </div>
                </div>
            </div>


            {/* Card Four */}
            <div className='flex flex-col bg-white py-4 px-2 rounded-[8px]'>
                <div className='flex flex-row justify-center text-sm'>
                    <p className='font-bold'>Student Statistics</p>
                    <span className='ml-2 text-hash-color'>(vs. prev. year)</span>
                </div>
                <div className='flex-1 flex flex-row items-center mt-4 gap-2'>
                    <div className='h-full flex-1 flex flex-col'>
                        <div className='flex-1'/>
                        <div className='flex-1 flex flex-row items-center'>
                            <PersonStanding color='#959595'/>
                            <p>Boys</p>
                        </div>
                        <div className='flex-1 flex flex-row items-center'>
                            <Image
                                width={25}
                                height={25}
                                alt='Girl icon'
                                src='/assets/girl.png'
                            />
                            <p>Girls</p>
                        </div>
                    </div>
                    <div className='h-full flex-1 flex flex-col items-center justify-between'>
                        <p className='flex-1 flex items-center font-semibold'>This Year</p>
                        <p className='flex-1 flex flex-row items-center justify-center text-sm'>2310 (+10%)</p>
                        <p className='flex-1 flex flex-row items-center justify-center text-sm'>1540 (+5.4%)</p>
                    </div>
                    <div className='h-full flex-1 flex flex-col items-center'>
                        <p className='flex-1 flex items-center font-semibold'>Prev Year</p>
                        <p className='flex-1 flex flex-row items-center justify-center text-sm'>2100</p>
                        <p className='flex-1 flex flex-row items-center justify-center text-sm'>1460</p>
                    </div>
                </div>
            </div>


        </div>
    );
};





// Export
export default AdmissionCards;