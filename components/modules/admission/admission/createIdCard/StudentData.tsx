// Imports
import moment from 'moment';
import React from 'react';





// Main function
const StudentData = ({selectedStudent}:any) => {
    return (
        <div className='w-full flex flex-col p-2 bg-[#F7F7F7] gap-2 text-xs text-hash-color rounded-[4px] border-[0.5px] border-[#ccc] lg:flex-row'>
            <div className='flex-1 flex flex-col gap-2'>
                {/* Student Name */}
                <div className='flex flex-row items-center text-xs text-hash-color'>
                    <p >Student Name : </p>
                    <p className='font-semibold ml-2'>{selectedStudent.name}</p>
                </div>

                {/* Admission No. */}
                <div className='flex flex-row items-center text-xs text-hash-color'>
                    <p>Admission No. : </p>
                    <p className='font-semibold ml-2'>{selectedStudent.adm_no}</p>
                </div>

                {/* Father Name */}
                <div className='flex flex-row items-center text-xs text-hash-color'>
                    <p>Father Name : </p>
                    <p className='font-semibold ml-2'>{selectedStudent.father_name}</p>
                </div>

                {/* Date of Birth */}
                <div className='flex flex-row items-center text-xs text-hash-color'>
                    <p>Date of Birth : </p>
                    <p className='font-semibold ml-2'>{selectedStudent.dob !== '' ? moment(selectedStudent.dob).format('D-MMM-yy') : ''}</p>
                </div>
            </div>

            <div className='flex-1 flex flex-col gap-2'>
                {/* Class */}
                <div className='flex flex-row items-center text-xs text-hash-color'>
                    <p >Class : </p>
                    <p className='font-semibold ml-2'>{selectedStudent.class_name}</p>
                </div>

                {/* Mother Name */}
                <div className='flex flex-row items-center text-xs text-hash-color'>
                    <p>Mother Name : </p>
                    <p className='font-semibold ml-2'>{selectedStudent.mother_name}</p>
                </div>

                {/* Contact Person Name */}
                <div className='flex flex-row items-center text-xs text-hash-color'>
                    <p>Contact Person Name : </p>
                    <p className='font-semibold ml-2'>{selectedStudent.contact_person_name}</p>
                </div>

                {/* Contact Person Mobile */}
                <div className='flex flex-row items-center text-xs text-hash-color'>
                    <p>Contact Person Mobile : </p>
                    <p className='font-semibold ml-2'>{selectedStudent.contact_person_mobile}</p>
                </div>
            </div>
        </div>
    );
};





// Export
export default StudentData;