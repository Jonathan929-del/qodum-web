'use client';
// Imports
import Image from 'next/image';
import {useContext} from 'react';
import NoticeImage from '@/public/assets/AppControl/Notice.png';
import ClassNoticeImage from '@/public/assets/AppControl/ClassNotice.png';
import LessonPlanImage from '@/public/assets/AppControl/LessonPlan.png';
import SyllabusImage from '@/public/assets/AppControl/Syllabus.png';
import AssignmentsImage from '@/public/assets/AppControl/Assignments.png';
import EDiaryImage from '@/public/assets/AppControl/ediary.png';
import PointOfContactImage from '@/public/assets/AppControl/PointOfContact.png';
import FeedbackAndComplainImage from '@/public/assets/AppControl/FeedbackAndComplaints.png';
import AcademicSurveyImage from '@/public/assets/AppControl/AcademicSurvey.png';
import MessageImage from '@/public/assets/AppControl/Messages.png';
import {GlobalStateContext} from '@/context/GlobalStateContext';





// Main function
const page = () => {

    // Opened pages
    const {openedPages, setOpenedPages, setCurrentPage} = useContext(GlobalStateContext);


    // Boxes
    const boxes = [
        {name:'Notice', image:NoticeImage},
        {name:'Class Notice', image:ClassNoticeImage},
        {name:'Lesson Plan', image:LessonPlanImage},
        {name:'Syllabus', image:SyllabusImage},
        {name:'Assignments', image:AssignmentsImage},
        {name:'E-diary', image:EDiaryImage},
        {name:'Point of Contact', image:PointOfContactImage},
        {name:'Feedback and Complain', image:FeedbackAndComplainImage},
        {name:'Academic Survey', image:AcademicSurveyImage},
        {name:'Message', image:MessageImage},
    ];

    return (
        <div className='h-full flex items-center justify-center pt-10 bg-[#fff]'>
                
            {/* Boxes */}
            <div className='w-[90%] flex flex-row flex-wrap items-start justify-center gap-6'>
                {boxes.map((b:any) => (
                    <div
                        onClick={() => {
                            setCurrentPage(b.name);
                            if(openedPages.includes(b.name)){
                                return;
                            } else {
                                const uniquePagesNames = openedPages.filter((item:any, index:any) => openedPages.indexOf(item) === index);
                                setOpenedPages([...uniquePagesNames, b.name]);
                            };
                        }}
                        className='w-[150px] h-[150px] flex flex-col items-center justify-center gap-2 rounded-[8px] border-[0.5px] border-[#ccc] transition cursor-pointer hover:scale-105'
                    >
                        <Image
                            alt={b.name}
                            src={b.image}
                            width={75}
                            height={75}
                        />
                        <p className='text-center'>{b.name}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};





// Export
export default page;