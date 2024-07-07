// Imports
import StudentsList from './StudentList';
import {useEffect, useState} from 'react';
import {useToast} from '@/components/ui/use-toast';
import {fetchAdmittedStudents} from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main function
function FormCom() {


    // Toast
    const {toast} = useToast();


    // Students
    const [students, setStudents] = useState<any>([{}]);


    // Selected students
    const [selectedStudents, setSelectedStudents] = useState([]);


    // Refresh handler
    const refreshHandler = async () => {
        setStudents([{}]);
        const studentsRes = await fetchAdmittedStudents();
        setStudents(studentsRes);
    };


    // Save handler
    const saveHandler = async () => {
        setStudents([{}]);
        const studentsRes = await fetchAdmittedStudents();
        setStudents(studentsRes);

        toast({title:'Saved Successfully!'});
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const studentsRes = await fetchAdmittedStudents();
            setStudents(studentsRes);
        };
        fetcher();
    }, []);


    return (
        <div className='w-[98%] max-h-[90%] max-w-[1500px] flex flex-col items-center overflow-y-scroll custom-sidebar-scrollbar'>
            <div
                className='w-full flex flex-col items-center pt-6 pb-2'
            >

                {/* Buttons */}
                <div className='flex flex-row items-center gap-2'>
                    <span
                        onClick={refreshHandler}
                        className='flex items-center justify-center px-6 py-2 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[5px] border-white cursor-pointer
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                    >
                        Refresh
                    </span>
                    <span
                        onClick={saveHandler}
                        className='flex items-center justify-center px-6 py-2 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[5px] border-white cursor-pointer
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                    >
                        Save Sibling
                    </span>
                </div>


                <StudentsList
                    students={students}
                    selectedStudents={selectedStudents}
                    setSelectedStudents={setSelectedStudents}
                />

            </div>
        </div>
    )
}





// Export
export default FormCom;