// Imports
import {useState}from 'react';
import Buttons from './Buttons';
import HeadsList from './HeadsList';





// Main function
const index = ({form, onSubmit, selectedStudent, setSelectedStudent, selectedInstallments, setSelectedInstallments, heads, setHeads, totalNumberGenerator, setConcessionReason, totalPaidAmount, setTotalPaidAmount, isLoadingHeads, installments}:any) => {


    // Is concession
    const [isConcession, setIsConcession] = useState(false);


    return (
        <div className='flex flex-col gap-2'>
            {selectedStudent.affiliated_heads?.heads?.length > 0 && (
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
            )}
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
                installments={installments}
                setHeads={setHeads}
            />
        </div>
    );
};





// Export
export default index;