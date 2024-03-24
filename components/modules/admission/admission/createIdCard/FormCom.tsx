'use client';
// Imports
import Search from './Search';
import ImageArea from './ImageArea';
import StudentData from './StudentData';





// Main function
const FormCom = ({selectedStudent, setSelectedStudent, students, setIsCardOpened}:any) => {
    return (
        <div className='w-[90%] flex flex-col items-center p-2 gap-3 border-[0.5px] border-[##E8E8E8] rounded-[8px] sm:w-[70%] overflow-y-scroll custom-sidebar-scrollbar'>

            {/* Search */}
            <Search
                students={students}
                setSelectedStudent={setSelectedStudent}
            />


            {/* Student data */}
            <StudentData
                selectedStudent={selectedStudent}
            />


            {/* Image area */}
            <ImageArea
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
                setIsCardOpened={setIsCardOpened}
            />

        </div>
    );
};





// Export
export default FormCom;