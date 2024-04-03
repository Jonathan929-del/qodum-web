// Imports
import Inputs from './Inputs';
import Search from './Search';
import HeadsArea from './HeadsArea';





// Main function
const index = ({form, selectedStudent, setSelectedStudent, heads, setHeads, setIsViewOpened, students, sections, classes, totalNumberGenerator, showButtonClick, isLoadingHeads}:any) => {

    

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
                />






                {/* Inputs */}
                <Inputs
                    form={form}
                    selectedStudent={selectedStudent}
                    showButtonClick={showButtonClick}
                />
            </div>





            {/* Heads Area */}
            <HeadsArea
                form={form}
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
                heads={heads}
                setHeads={setHeads}
                totalNumberGenerator={totalNumberGenerator}
                isLoadingHeads={isLoadingHeads}
            />
        </div>
    );
};





// Export
export default index;