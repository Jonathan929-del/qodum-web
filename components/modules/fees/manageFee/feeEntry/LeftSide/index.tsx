// Imports
import React from 'react';
import Image from 'next/image';





// Main function
const index = ({selectedStudent}:any) => {
    return (
        <div className='basis-[30%] min-w-[225px] flex flex-col px-2 gap-2 text-[11px] bg-[#F7F7F7]'>
            <div className='flex items-center justify-center mt-8'>
                {selectedStudent.image === '' ? (
                    <div className='w-[125px] h-[125px] border-[0.5px] border-[#ccc] rounded-[5px]'/>
                ) : (
                    <Image
                        src={selectedStudent.image}
                        alt='Student image'
                        height={125}
                        width={125}
                        className='rounded-[5px]'
                    />
                )}
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p className='text-hash-color'>Name:</p>
                <p>{selectedStudent.name}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p className='text-hash-color'>Address:</p>
                <p>{selectedStudent.address}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p className='text-hash-color'>Father Name:</p>
                <p>{selectedStudent.father_name}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p className='text-hash-color'>Mother Name:</p>
                <p>{selectedStudent.mother_name}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p className='text-hash-color'>Contact No.:</p>
                <p>{selectedStudent.contact_no}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p className='text-hash-color'>Admission No.:</p>
                <p>{selectedStudent.admission_no}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p className='text-hash-color'>Bill No.:</p>
                <p>{selectedStudent.bill_no}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p className='text-hash-color'>Class:</p>
                <p>{selectedStudent.class}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p className='text-hash-color'>Fees Group:</p>
                <p>{selectedStudent.affiliated_heads.group_name}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p className='text-hash-color'>Route Name:</p>
                <p></p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px]'>
                <p className='text-hash-color'>Stop Name:</p>
                <p></p>
            </div>
        </div>
    );
};





// Export
export default index;