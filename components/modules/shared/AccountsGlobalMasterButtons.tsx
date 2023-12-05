// Imports
import React from 'react';
import {Button} from '../../ui/button';





// Main Function
const AccountsGlobalMasterButtons = ({setIsViewOpened}:any) => {
    return (
        <div className='flex flex-row items-center justify-between pb-4 pt-8 gap-2'>
            <Button type='submit' className='px-4 h-8 text-white bg-[#00CC55] font-semibold transition opacity-100 border-[0.5px] border-white hover:opacity-90 hover:text-[#00CC55] hover:border-[#00CC55]'>
                Save
            </Button>
            <span
                onClick={() => setIsViewOpened(true)}
                className='flex flex-row items-center px-4 h-8 text-white bg-[#1C6FB5] font-semibold transition opacity-100 cursor-pointer border-[0.5px] border-white hover:opacity-90 hover:text-[#1C6FB5] hover:border-[#1C6FB5] hover:bg-white'
            >
                View
            </span>
            <Button className='px-4 h-8 text-white bg-[#CB9C1D] font-semibold transition opacity-100 border-[0.5px] border-white hover:opacity-90 hover:text-[#CB9C1D] hover:border-[#CB9C1D]'>
                Print
            </Button>
            <Button className='px-4 h-8 text-white bg-[#E27103] font-semibold transition opacity-100 border-[0.5px] border-white hover:opacity-90 hover:text-[#E27103] hover:border-[#E27103]'>
                Cancel
            </Button>
        </div>
    );
};





// Export
export default AccountsGlobalMasterButtons;