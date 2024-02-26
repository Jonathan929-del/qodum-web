// Imports
import Inputs from './Inputs';
import Search from './Search';
import EntryMode from './EntryMode';
import HeadsArea from './HeadsArea';





// Main function
const index = ({installments, form, onSubmit, selectedStudent, setSelectedStudent, selectedInstallments, setSelectedInstallments, heads, setHeads, setIsViewOpened, setInstallments, students, sections, classes, chequeDetails, setChequeDetails, ddDetails, setddDetails, neftDetails, setNeftDetails, totalNumberGenerator, payments}:any) => {
    return (
        <div className='basis-[70%] min-w-[400px] flex flex-col gap-3 px-2'>





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
            />





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
            />
        </div>
    );
};





// Export
export default index;