// Imports
import {useState}from 'react';
import Buttons from './Buttons';
import HeadsList from './HeadsList';





// Main function
const index = ({form, onSubmit, selectedStudent, setSelectedStudent, selectedInstallments, setSelectedInstallments, heads, setHeads, totalNumberGenerator}:any) => {


    // Total paid amount
    const [totalPaidAmount, setTotalPaidAmount] = useState<any>();


    return (
        <div className='flex flex-col gap-2'>
            {selectedStudent.name && (
                <HeadsList
                    selectedStudent={selectedStudent}
                    selectedInstallments={selectedInstallments}
                    setTotalPaidAmount={setTotalPaidAmount}
                    totalPaidAmount={totalPaidAmount}
                    form={form}
                    heads={heads}
                    setHeads={setHeads}
                    totalNumberGenerator={totalNumberGenerator}
                    
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
            />
        </div>
    );
};





// Export
export default index;