'use client';
// Improts
import PdfView from './PdfView';





// Main function
const index = ({pdfData}:any) => {
    return (
        <div className='h-[98%] w-full flex flex-col items-center mt-2 pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8]'>
            <PdfView
                pdfData={pdfData}
            />
        </div>
    );
};





// Export
export default index;