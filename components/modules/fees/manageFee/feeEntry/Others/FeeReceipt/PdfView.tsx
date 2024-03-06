'use client';
// Imports
import dynamic from 'next/dynamic';





// Dynamic file
const InvoicePDF = dynamic(() => import("./Pdf"), {ssr:false});





// Main function
const PdfView = ({receiptPaymentData, totalNumberGenerator}:any) => {
    return(
        <InvoicePDF
            receiptPaymentData={receiptPaymentData}
            totalNumberGenerator={totalNumberGenerator}
        />
    );
};





// Export
export default PdfView;