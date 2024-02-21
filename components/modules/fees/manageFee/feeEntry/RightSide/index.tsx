// Imports
import Inputs from './Inputs';
import Search from './Search';
import EntryMode from './EntryMode';
import HeadsArea from './HeadsArea';





// Main function
const index = ({installments, classes, sections, form, onSubmit, setIsViewOpened, students, selectedStudent, setSelectedStudent, setIsLoading, selectedInstallments, setSelectedInstallments, setInstallments, heads, setHeads}:any) => {
    return (
        <div className='basis-[70%] min-w-[400px] flex flex-col gap-3 px-2'>
            {/* Search */}
            <Search
                classes={classes}
                sections={sections}
                students={students}
                setSelectedStudent={setSelectedStudent}
                setIsViewOpened={setIsViewOpened}
                setIsLoading={setIsLoading}
                setSelectedInstallments={setSelectedInstallments}
                setInstallments={setInstallments}
            />





            {/* Inputs */}
            <Inputs
                form={form}
                installments={installments}
                selectedInstallments={selectedInstallments}
                setSelectedInstallments={setSelectedInstallments}
            />





            {/* Entry Mode */}
            <EntryMode
                form={form}
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
            />
        </div>
    );
};





// Export
export default index;