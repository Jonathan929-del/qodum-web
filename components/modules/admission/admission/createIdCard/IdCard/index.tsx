'use client';
// Improts
import {X} from 'lucide-react';
import PdfView from './PdfView';





// Main function
const index = ({setIsCardOpened, studentData}:any) => {
    return (
        <div className='w-[90%] h-[90%] flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8]'>

        {/* Header */}
        <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
            <h2>Student's ID Card</h2>
            <X color='#3a3a3a' size={18} cursor={'pointer'} onClick={() => setIsCardOpened(false)}/>
        </div>


        <PdfView
            studentData={studentData}
        />

        </div>
    );
};





// Export
export default index;