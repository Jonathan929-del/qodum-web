// Imports
import React from 'react';
import Image from 'next/image';
import {Progress} from '@/components/ui/progress';
import {Landmark, Banknote, PersonStanding, Hourglass, Briefcase} from 'lucide-react';





// Main function
const FeesCardsOne = () => {
    return (
        <div className='flex flex-col gap-4 md:flex-row'>


            {/* Card One */}
            <div className='flex flex-col w-full bg-white py-4 px-2 rounded-[8px] md:w-1/2 lg:w-1/3'>
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
                                <p className='text-xs mb-[2px]'>Boys</p>
                                <Progress value={61.1} indicatorColor='bg-[#959595]'/>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-row ml-[2px] justify-center items-center text-sm xl:flex-row'>
                            <p>743</p>
                            <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>(61.1%)</span>
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
                                <p className='text-xs mb-[2px]'>Girls</p>
                                <Progress value={38.9} indicatorColor='bg-[#dd288f]'/>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-row ml-[2px] justify-center items-center text-sm xl:flex-row'>
                            <p>474</p>
                            <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>(38.9%)</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Card Two */}
            <div className='flex flex-col w-full bg-white py-4 px-2 rounded-[8px] md:w-1/2 lg:w-2/3'>
                    <div className='flex flex-row justify-center text-sm'>
                        <p className='font-bold'>Free Revenue Summary</p>
                        <span className='ml-2 text-hash-color'>(2018 - 2019)</span>
                    </div>
                    <div className='flex flex-row justify-center mt-2 items-center'>
                        <span className='text-hash-color text-sm'>Total:</span>
                        <p className='font-bold ml-2 text-xl'>₹ 4,55,07,620.12</p>
                    </div>
                    <div className='flex flex-col mt-4 gap-2'>
                        <div className='flex flex-row items-center justify-between'>
                            <div className='flex-1 flex flex-row items-center justify-start'>
                                <Hourglass color='#FE7565'/>
                                <div className='ml-2 flex-1'>
                                    <p className='text-xs mb-[2px]'>Outstanding Revenue</p>
                                    <Progress value={80.69} indicatorColor='bg-[#FE7565]'/>
                                </div>
                            </div>
                            <div className='flex-1 flex flex-col justify-center items-center text-sm xl:flex-row'>
                                <p>₹ 36,721,535.05</p>
                                <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>(80.69%)</span>
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <div className='flex-1 flex flex-row items-center justify-start'>
                                <Briefcase color='#31BE8B'/>
                                <div className='ml-2 flex-1'>
                                    <p className='text-xs mb-[2px]'>Total Received (YTD)</p>
                                    <Progress value={19.31} indicatorColor='bg-[#31BE8B]'/>
                                </div>
                            </div>
                            <div className='flex-1 flex flex-col justify-center items-center text-sm xl:flex-row'>
                                <p>₹ 8,786,085.07</p>
                                <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>(19.31%)</span>
                            </div>
                        </div>
                    </div>
                </div>


        </div>
    );
};





// Export
export default FeesCardsOne;