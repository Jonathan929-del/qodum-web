'use client';
// Imports
import {Button} from '../../ui/button';





// Main Function
const AccountsGlobalMasterButtons = ({setIsViewOpened, narrations}:any) => {


    // Excel downloader
    const narrationsDataArray = narrations.map((narration:any) => {
        return{
            Id:narrations.indexOf(narration),
            Narrations:narration.narration,
            VoucherType:narration.voucher_type
        };
    });

    
    const data = {
        narrations:narrationsDataArray
    };


    return (
        <div className='flex flex-row items-center justify-between pb-4 pt-8 gap-2'>
            <Button type='submit' className='px-4 h-8 text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] rounded-full transition opacity-100 hover:opacity-90'>
                Save
            </Button>
            <span
                onClick={() => setIsViewOpened(true)}
                className='flex items-center px-4 h-8 text-white bg-gradient-to-r from-[#51B272] to-[#94E7B1] rounded-full transition opacity-100 hover:opacity-90 cursor-pointer'
            >
                View
            </span>
            <span
                className='flex items-center px-4 h-8 bg-gradient-to-r from-[#FFC73A] to-[#FFF3AB] rounded-full transition opacity-100 hover:opacity-90 cursor-pointer'
            > 
                Print
            </span> 
            <span
                className='flex items-center px-4 h-8 bg-gradient-to-r from-[#C7C8CA] to-[#EAEDF0] rounded-full transition opacity-100 hover:opacity-90 cursor-pointer'
            >
                Cancel
            </span>
        </div>
    );
};





// Export
export default AccountsGlobalMasterButtons;