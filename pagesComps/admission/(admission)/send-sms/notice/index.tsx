'use client';
// Imports
import {useState} from 'react';
import AppOnly from './AppOnly';
import FlashMesage from './FlashMessage';
import {Label} from '@/components/ui/label';
import SmsAndAppMessage from './SmsAndAppMessage';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';





// Main function
const page = () => {

    // Selected page
    const [selectedPage, setSelectedPage] = useState('SMS and App Message');

    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] overflow-y-scroll custom-sidebar-scrollbar sm:w-[80%]'>
                <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Send Notice</h2>     
                <div className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4 gap-2'>

                    {/* Selected page */}
                    <RadioGroup defaultValue={selectedPage} className='flex flex-row py-2'>
                        <div className='flex items-center space-x-[2px]'>
                            <RadioGroupItem
                                value='SMS and App Message'
                                id='SMS and App Message'
                                onClick={() => setSelectedPage('SMS and App Message')}
                            />
                            <Label
                                htmlFor='SMS and App Message'
                                className='text-xs text-hash-color'
                            >
                                SMS and App Message
                            </Label>
                        </div>
                        <div className='flex items-center space-x-[2px]'>
                            <RadioGroupItem
                                value='App Only'
                                id='App Only'
                                onClick={() => setSelectedPage('App Only')}
                            />
                            <Label
                                htmlFor='App Only'
                                className='text-xs text-hash-color'
                            >
                                App Only
                            </Label>
                        </div>
                        <div className='flex items-center space-x-[2px]'>
                            <RadioGroupItem
                                value='Flash Message'
                                id='Flash Message'
                                onClick={() => setSelectedPage('Flash Message')}
                            />
                            <Label
                                htmlFor='Flash Message'
                                className='text-xs text-hash-color'
                            >
                                Flash Message
                            </Label>
                        </div>
                    </RadioGroup>


                    {/* SMS and App Message */}
                    {selectedPage === 'SMS and App Message' && <SmsAndAppMessage />}


                    {/* App Only */}
                    {selectedPage === 'App Only' && <AppOnly />}


                    {/* FLash Message */}
                    {selectedPage === 'Flash Message' && <FlashMesage />}

                </div>
            </div>
        </div>
    );
};





// Export
export default page;