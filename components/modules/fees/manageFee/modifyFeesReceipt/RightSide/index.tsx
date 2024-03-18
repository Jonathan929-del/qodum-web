// Imports
import Search from './Search';
import HeadsList from './HeadsList';





// Main function
const index = ({sections, classes, totalNumberGenerator, setIsViewOpened, students, setSelectedStudent, selectedStudent}:any) => {
    return (
        <div className='w-[70%] min-w-[400px] flex flex-col justify-between px-2'>


            {/* Search */}
            <Search
                classes={classes}
                sections={sections}
                students={students}
                setIsViewOpened={setIsViewOpened}
                setSelectedStudent={setSelectedStudent}
            />


            {/* Payments List */}
            <HeadsList
                selectedStudent={selectedStudent}
                totalNumberGenerator={totalNumberGenerator}
                setSelectedStudent={setSelectedStudent}
            />


        </div>
    );
};





// Export
export default index;