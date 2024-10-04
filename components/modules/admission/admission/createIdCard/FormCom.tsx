'use client';
// Imports
import Search from './Search';
import ImageArea from './ImageArea';
import StudentData from './StudentData';
import { AuthContext } from '@/context/AuthContext';
import { useContext, useEffect, useState } from 'react';





// Main function
const FormCom = ({selectedStudent, setSelectedStudent, students, setIsCardOpened}:any) => {

    // User
    const {user} = useContext(AuthContext);


    // Permissions
    const [permissions, setPermissions] = useState({
        add:false,
        modify:false,
        delete:false,
        print:false,
        read_only:false
    });


    // Use effect
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Admission')?.permissions?.find((pp:any) => pp.sub_menu === 'Create ID Card');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className='w-[90%] flex flex-col items-center p-2 gap-3 border-[0.5px] border-[##E8E8E8] rounded-[8px] sm:w-[70%] overflow-y-scroll custom-sidebar-scrollbar'>

            {/* Search */}
            {permissions.read_only && (
                <Search
                    students={students}
                    selectedStudent={selectedStudent}
                    setSelectedStudent={setSelectedStudent}
                />
            )}


            {/* Student data */}
            <StudentData
                selectedStudent={selectedStudent}
            />


            {/* Image area */}
            <ImageArea
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
                setIsCardOpened={setIsCardOpened}
                permissions={permissions}
            />

        </div>
    );
};





// Export
export default FormCom;