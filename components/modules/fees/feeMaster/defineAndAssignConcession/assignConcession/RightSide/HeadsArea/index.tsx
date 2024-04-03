// Imports
import Buttons from './Buttons';
import HeadsList from './HeadsList';





// Main function
const index = ({form, selectedStudent, setSelectedStudent, heads, setHeads, totalNumberGenerator, isLoadingHeads}:any) => {
    return (
        <div className='h-full flex flex-col gap-2'>
            <HeadsList
                selectedStudent={selectedStudent}
                form={form}
                heads={heads}
                setHeads={setHeads}
                totalNumberGenerator={totalNumberGenerator}
                isLoadingHeads={isLoadingHeads}
                
            />
            <Buttons
                form={form}
                setSelectedStudent={setSelectedStudent}
                setHeads={setHeads}
            />
        </div>
    );
};





// Export
export default index;