// Imports
import {X} from 'lucide-react';
import Draggable from 'react-draggable';





// Main function
const Details = ({setIsDraggableOpened}:any) => {


    // Details
    const details = [
        'Class Name',
        'Roll No.',
        'Bill No.',
        'Adm. No.',
        'Student Name',
        'Boarding/Day Scholar',
        'Section',
        'Optional Sub. Name',
        'General Description',
        'Contact Mo.',
        'Student Middle Name',
        'Student Last Name',
        'Student DOB',
        'Student DOA',
        'Student DOJ',
        'Religion',
        'Category',
        'House',
        'Address',
        'Contact No.',
        'Blood Group',
        'Nationality',
        'Gender',
        'Student Email',
        'Contact Person',
        'Contact Email',
        'Bar Code',
        'Prev. School Name',
        'Prev. School DOL',
        'Emrg. Cont. Person',
        'Emrg. Cont. Mobile',
        'Emrg. Cont. Phone',
        'Emrg. Cont. Add.',
        'Emrg. Cont. RTL',
        'Familly Doc. Name',
        'Familly Doc. Phone',
        'Familly Doc. Add.',
        'Student Status',
        'Aadhar Card No.',
        'Student Cont. 2',
        'Pin Code',
        'State',
        'City',
        'Birth Place',
        'Board Reg. No.',
        'Caste',
        'EWS',
        'Mother Tongue',
        'Stream Name',
        'New/Old',
        'Class',
        'Guar. Name',
        'Guar. Designation',
        'Guar. Phone',
        'Guar. DOB',
        'Guar. Address',
        'Guar. Office Address',
        'Guar. Email 1',
        'Guar. Email 2',
        'Guar. Mobile',
        'Guar. Profession',
        'Guar. Comp. Name',
        'Guar. Professional',
        'Guar. Business Of',
        'Guar. Others',
        'Guar. Service In',
        'Guar. Off. Phone',
        'Guar. Off. Mobile',
        'Guar. Off. Extension',
        'Guar. Off. Email',
        'Guar. Off. Website',
        'Guar. Income',
        'Guar. Other Info',
        'Father Full Name',
        'Father Name',
        'Father Middle Name',
        'Father Last Name',
        'Father Designation',
        'Father Phone',
        'Father DOB',
        'Father Address',
        'Father Off. Add.',
        'Father Email 1',
        'Father Email 2',
        'Father Mobile',
        'Father Profession',
        'Father Comp. Name',
        'Father Business Of',
        'Father Professional',
        'Father Others',
        'Father Service In',
        'Father Off. Phone',
        'Father Off. Mo.',
        'Father Off. Extension',
        'Father Off. Email',
        'Father Off. Website',
        'Father Income',
        'Mother Full Name',
        'Mother Name',
        'Mother Middle Name',
        'Mother Last Name',
        'Mother DOB',
        'Mother Address',
        'Mother Off. Add.',
        'Mother Email 1',
        'Mother Email 2',
        'Mother Mobile',
        'Mother Profession',
        'Mother Comp. Name',
        'Mother Business Of',
        'Mother Professional',
        'Mother Others',
        'Mother Service In',
        'Mother Off. Phone',
        'Mother Off. Mo.',
        'Mother Off. Extension',
        'Mother Off. Email',
        'Mother Off. Website',
        'Date Of Anniversary',
        'Parent Status',
        'Mother Income'
    ];


    return (
        <Draggable defaultPosition={{x:200, y:100}}>
            <div className='absolute w-[800px] h-[400px] z-10 flex flex-col items-center pb-6 bg-white border-[0.5px] border-[#ccc] overflow-scroll custom-sidebar-scrollbar'>

                {/* Header */}
                <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7]'>
                    <h2>List of Student Details</h2>
                    <X color='#3a3a3a' size={18} cursor={'pointer'} onClick={() => setIsDraggableOpened(false)}/>
                </div>


                {/* List */}
                <div className='w-[90%] h-full mt-4 overflow-x-scroll custom-sidebar-scrollbar bg-[#F2F8FA] rounded-[4px]'>
                    <div className='w-full h-full flex flex-col bg-[#F2F8FA] rounded-[4px]'>
                        {/* Headers */}
                        <ul className='flex flex-row items-center justify-between bg-[#435680] text-white border-[0.5px] border-[#ccc] rounded-t-[4px]'>
                            <li className='basis-[10%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Sr. No.
                            </li>
                            <li className='basis-[50%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Column
                            </li>
                            <li className='basis-[20%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Order
                            </li>
                            <li className='basis-[20%] text-center text-[11px] font-semibold py-2'>
                                Select
                            </li>
                        </ul>
                        {details.map((d:any) => (
                            <ul className={`flex flex-row items-center justify-between border-[0.5px] border-t-[0px] border-[#ccc] ${Math.floor((details.indexOf(d) + 1) / 2) * 2 !== details.indexOf(d) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}>
                                <p>{d}</p>
                            </ul>
                        ))}
                    </div>
                </div>

            </div>
        </Draggable>
    );
};





// Export
export default Details;