// Imports
import {useState}from 'react';
import Buttons from './Buttons';
import HeadsList from './HeadsList';





// Main function
const index = ({form, onSubmit, selectedStudent, setSelectedStudent, selectedInstallments, setSelectedInstallments, heads, setHeads, totalNumberGenerator, setConcessionReason, totalPaidAmount, setTotalPaidAmount, isLoadingHeads, setInstallments, setPaymentReceiptNo}:any) => {


    // Is concession
    const [isConcession, setIsConcession] = useState(false);


    return (
        <div className='h-full flex flex-col gap-2'>
            <HeadsList
                selectedStudent={selectedStudent}
                selectedInstallments={selectedInstallments}
                setTotalPaidAmount={setTotalPaidAmount}
                totalPaidAmount={totalPaidAmount}
                form={form}
                heads={heads}
                setHeads={setHeads}
                totalNumberGenerator={totalNumberGenerator}
                setIsConcession={setIsConcession}
                isLoadingHeads={isLoadingHeads}
                
            />
            <Buttons
                form={form}
                onSubmit={onSubmit}
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
                selectedInstallments={selectedInstallments}
                setSelectedInstallments={setSelectedInstallments}
                totalPaidAmount={totalPaidAmount}
                setTotalPaidAmount={setTotalPaidAmount}
                totalNumberGenerator={totalNumberGenerator}
                heads={heads}
                setConcessionReason={setConcessionReason}
                isConcession={isConcession}
                setIsConcession={setIsConcession}
                setHeads={setHeads}
                setInstallments={setInstallments}
                setPaymentReceiptNo={setPaymentReceiptNo}
            />
        </div>
    );
};





// Export
export default index;