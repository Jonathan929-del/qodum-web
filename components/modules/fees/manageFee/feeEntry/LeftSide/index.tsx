// Imports
import React from 'react';
import Image from 'next/image';





// Main function
const index = ({selectedStudent}:any) => {
    return (
        // <div className='absolute top-[10px] left-0 h-[95%] basis-[40%] w-[40%] min-w-[250px] max-w-[350px] flex flex-col px-2 gap-2 text-xs bg-[#F7F7F7] rounded-[4px] border-[0.5px] border-[#ccc] font-semibold'>
        <div className='absolute top-[10px] left-0 h-[95%] basis-[40%] w-[40%] min-w-[250px] max-w-[350px] flex flex-col px-2 gap-2 text-xs bg-[#435680] text-white rounded-[4px] border-[0.5px] border-[#ccc] font-semibold'>
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
                <p>Name:</p>
                <p className='text-[14px]'>{selectedStudent.name}</p>
                {selectedStudent.is_new && <span className='px-[2px] text-[11px] text-[#4CA7DE] rounded-[4px] border-[0.5px] border-[#4CA7DE]'>New</span>}
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p>Address:</p>
                <p className='text-[14px]'>{selectedStudent.address}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p>Father Name:</p>
                <p className='text-[14px]'>{selectedStudent.father_name}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p>Mother Name:</p>
                <p className='text-[14px]'>{selectedStudent.mother_name}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p>Contact No.:</p>
                <p className='text-[14px]'>{selectedStudent.contact_no}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p>Admission No.:</p>
                <p className='text-[14px]'>{selectedStudent.admission_no}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p>Bill No.:</p>
                <p className='text-[14px]'>{selectedStudent.bill_no}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p>Class:</p>
                <p className='text-[14px]'>{selectedStudent.class} - {selectedStudent.section}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p>Fees Group:</p>
                <p className='text-[14px]'>{selectedStudent?.affiliated_heads.group_name}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p>Route Name:</p>
                <p className='text-[14px]'>{selectedStudent?.route_name || ''}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px] border-b-[0.5px] border-[#ccc]'>
                <p>Stop Name:</p>
                <p className='text-[14px]'>{selectedStudent?.stop_name || ''}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px] pb-[2px]'>
                <p>Vehicle Name:</p>
                <p className='text-[14px]'>{selectedStudent?.vehicle_name || ''}</p>
            </div>

        </div>
    );
};





// Export
export default index;