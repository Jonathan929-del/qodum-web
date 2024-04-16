'use client';
// Improts
import PdfView from './PdfView';





// Main function
const index = ({pdfData}:any) => {
    return (
        <div className='h-[98%] w-[100%] flex flex-col items-center mt-2 pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8]'>
            <div className='h-full w-full overflow-x-scroll custom-sidebar-scrollbar'>
                <div
                    className='h-full'
                    style={{minWidth:'100%', width:700 + pdfData.fields.length * 150}}
                >
                    <PdfView
                        pdfData={pdfData}
                    />
                </div>
            </div>
        </div>
    );
};





// Export
export default index;