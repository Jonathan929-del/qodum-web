'use client';
// Imports
import dynamic from 'next/dynamic';





// Dynamic file
const InvoicePDF = dynamic(() => import("./Pdf"), {ssr:false});





// Main function
const PdfView = ({pdfData}:any) => {
    return(
        <InvoicePDF
            pdfData={pdfData}
        />
    );
};





// Export
export default PdfView;