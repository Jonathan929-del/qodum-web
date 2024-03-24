'use client';
// Imports
import dynamic from 'next/dynamic';





// Dynamic file
const InvoicePDF = dynamic(() => import("./Pdf"), {ssr:false});





// Main function
const PdfView = ({studentData}:any) => {
    return(
        <InvoicePDF
            studentData={studentData}
        />
    );
};





// Export
export default PdfView;