// Imports
import Inputs from './Inputs';
import Search from './Search';
import {useState} from 'react';
import EntryMode from './EntryMode';
import HeadsArea from './HeadsArea';





// Main function
const index = ({installments, form, onSubmit, selectedStudent, setSelectedStudent, selectedInstallments, setSelectedInstallments, heads, setHeads, setIsViewOpened, setInstallments, students, sections, classes, chequeDetails, setChequeDetails, ddDetails, setddDetails, neftDetails, setNeftDetails, totalNumberGenerator, payments, setConcessionReason}:any) => {


    // Total paid amount
    const [totalPaidAmount, setTotalPaidAmount] = useState<any>();


    // Show button click
    const showButtonClick = () => {
        setHeads([]);
        const assignedHeads = selectedStudent?.affiliated_heads?.heads?.filter((h:any) => {
            if(h.amounts.length === 1){
                return selectedInstallments.includes(h.installment);
            }else{
                const amounts = h.amounts;
                return h.installment === 'All installments' && amounts.filter((a:any) => selectedInstallments.includes(a.name)).length > 0;
            };
        });
        console.log(assignedHeads);
        setHeads(assignedHeads);
        form.setValue('total_paid_amount', totalNumberGenerator(assignedHeads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value) - (Number(a.conc_amount) + Number(a.last_rec_amount)))))));
        setTotalPaidAmount(totalNumberGenerator(assignedHeads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
    };
    

    return (
        <div className='w-[70%] min-w-[400px] flex flex-col justify-between gap-3 px-2'>




            <div className='flex flex-col gap-3'>
                {/* Search */}
                <Search
                    classes={classes}
                    sections={sections}
                    students={students}
                    setSelectedStudent={setSelectedStudent}
                    setIsViewOpened={setIsViewOpened}
                    setSelectedInstallments={setSelectedInstallments}
                    setInstallments={setInstallments}
                />





                {/* Inputs */}
                <Inputs
                    form={form}
                    installments={installments}
                    selectedInstallments={selectedInstallments}
                    setSelectedInstallments={setSelectedInstallments}
                    chequeDetails={chequeDetails}
                    setChequeDetails={setChequeDetails}
                    ddDetails={ddDetails}
                    setddDetails={setddDetails}
                    neftDetails={neftDetails}
                    setNeftDetails={setNeftDetails}
                    payments={payments}
                />





                {/* Entry Mode */}
                <EntryMode
                    form={form}
                    selectedStudent={selectedStudent}
                    totalNumberGenerator={totalNumberGenerator}
                    installments={installments}
                    setSelectedInstallments={setSelectedInstallments}
                    payments={payments}
                    showButtonClick={showButtonClick}
                />
            </div>





            {/* Heads Area */}
            <HeadsArea
                form={form}
                onSubmit={onSubmit}
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
                selectedInstallments={selectedInstallments}
                setSelectedInstallments={setSelectedInstallments}
                heads={heads}
                setHeads={setHeads}
                totalNumberGenerator={totalNumberGenerator}
                setConcessionReason={setConcessionReason}
                totalPaidAmount={totalPaidAmount}
                setTotalPaidAmount={setTotalPaidAmount}
            />
        </div>
    );
};





// Export
export default index;