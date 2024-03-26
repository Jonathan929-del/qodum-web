'use client';
// Imports
import {useEffect, useState} from 'react';
import IdCard from '@/components/modules/admission/admission/createIdCard/IdCard';
import FormCom from '@/components/modules/admission/admission/createIdCard/FormCom';
import {fetchAdmittedStudents} from '@/lib/actions/admission/admission/admittedStudent.actions';
import {fetchAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';
import {fetchGlobalSchoolDetails} from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';





// Main function
const page = () => {


    // Students
    const [students, setStudents] = useState<any>([]);


    // Selected student
    const [selectedStudent, setSelectedStudent] = useState({
        name:'',
        adm_no:'',
        father_name:'',
        dob:'',
        class_name:'',
        mother_name:'',
        mobile:'',
        address:'',
        image:'',
        session:'',
        school_image:'',
        school_name:'',
        school_address:'',
        school_phone:'',
        school_mo:'',
        color:localStorage.getItem('id_card_theme_color') ? localStorage.getItem('id_card_theme_color') : ''
    });


    // Is card opened
    const [isCardOpened, setIsCardOpened] = useState(true);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const sessionsRes = await fetchAcademicYears();
            const schoolsRes = await fetchGlobalSchoolDetails();
            const studentsRes = await fetchAdmittedStudents();
            const activeSession = sessionsRes.filter((a:any) => a.is_active);
            setStudents(studentsRes);
            setSelectedStudent({
                name:'',
                adm_no:'',
                father_name:'',
                dob:'',
                class_name:'',
                mother_name:'',
                mobile:'',
                address:'',
                image:'',
                session:activeSession[0].year_name,
                school_image:schoolsRes[0].logo,
                school_name:schoolsRes[0].school_name,
                school_address:schoolsRes[0].school_address,
                school_phone:schoolsRes[0].contact_no,
                school_mo:schoolsRes[0].mobile,
                color:localStorage.getItem('id_card_theme_color') ? localStorage.getItem('id_card_theme_color') : ''
            });
        };
        fetcher();
    }, []);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-4 bg-white overflow-hidden lg:pt-10'>
            {
                isCardOpened ? (
                    <IdCard
                        studentData={selectedStudent}
                        setIsCardOpened={setIsCardOpened}
                    />
                ) : (
                    <FormCom
                        students={students}
                        setIsCardOpened={setIsCardOpened}
                        setSelectedStudent={setSelectedStudent}
                        selectedStudent={selectedStudent}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;