// Imports
import {useState}from 'react';
import Buttons from './Buttons';
import HeadsList from './HeadsList';





// Main function
const index = ({form, onSubmit, selectedStudent, setSelectedStudent, selectedInstallments, setSelectedInstallments, heads, setHeads, totalNumberGenerator, setConcessionReason, totalPaidAmount, setTotalPaidAmount, isLoadingHeads, setInstallments, setPaymentReceiptNo, installments, headsSequence}:any) => {


    // Is concession
    const [isConcession, setIsConcession] = useState(false);


    return (
        <div className='h-full flex flex-col border-[0.5px] border-[#ccc] rounded-[8px]'>
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
                headsSequence={headsSequence}
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
                installments={installments}
            />
        </div>
    );
};





// Export
export default index;