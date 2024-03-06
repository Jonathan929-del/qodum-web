'use client';
// Imports
import dynamic from 'next/dynamic';





// Dynamic file
const InvoicePDF = dynamic(() => import("./Pdf"), {ssr:false});





// Main function
const PdfView = ({pdfData, totalNumberGenerator}:any) => {
    return(
        <InvoicePDF
            pdfData={pdfData}
            totalNumberGenerator={totalNumberGenerator}
        />
    );
};





// Export
export default PdfView;