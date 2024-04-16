// Imports
import {useState} from 'react';
import {X} from 'lucide-react';
import Draggable from 'react-draggable';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {useToast} from '@/components/ui/use-toast';





// Main function
const Details = ({setIsDraggableOpened, checkedDetails, setCheckedDetails}:any) => {


    // Toast
    const {toast} = useToast();


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
        'Mother Income',
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
        'Guar. Other Info'
    ];


    // Update click
    const updateClick = () => {
        toast({title:'Updated successfully'});
        setIsDraggableOpened(false);
    };


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
                            <li className='basis-[20%] flex flex-row items-center justify-center gap-2 text-center text-[11px] font-semibold py-2'>
                                Select
                                <Checkbox
                                    checked={details?.length === checkedDetails.length}
                                    onClick={() => {
                                        if(details?.length === checkedDetails.length){
                                            setCheckedDetails([]);
                                            localStorage.setItem('selectedDetails', '');
                                        }else{
                                            setCheckedDetails(details);
                                            localStorage.setItem('selectedDetails', `${details.join('-')}`);
                                        }
                                    }}
                                    className='rounded-[2px] text-[#fff]'
                                />
                            </li>
                        </ul>
                        {details.map((d:any) => (
                            <ul className={`flex flex-row items-center justify-between border-[0.5px] border-t-[0px] border-[#ccc] ${Math.floor((details.indexOf(d) + 1) / 2) * 2 !== details.indexOf(d) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}>
                                <li className='basis-[10%] h-full flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc] text-xs'>
                                    {details.indexOf(d) + 1}
                                </li>
                                <li className='basis-[50%] h-full flex-grow flex flex-row items-center px-2 py-[2px] border-r-[.5px] border-[#ccc] text-xs'>
                                    {d}
                                </li>
                                <li className='basis-[20%] flex-grow flex flex-row items-center px-2 py-[4px] border-r-[.5px] border-[#ccc]'>
                                    <Input
                                        className='flex flex-row items-center h-6 text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </li>
                                <li className='basis-[20%] flex-grow flex flex-row items-center justify-center px-2 py-[2px]'>
                                    <Checkbox
                                        checked={checkedDetails?.includes(d)}
                                        onClick={() => {
                                            if(localStorage.getItem('selectedDetails') === undefined ? true : localStorage.getItem('selectedDetails')?.split('-')?.includes(d)){
                                                setCheckedDetails(checkedDetails.filter((detail:any) => detail !== d));
                                                localStorage.setItem('selectedDetails', localStorage.getItem('selectedDetails') === undefined ? '' : localStorage.getItem('selectedDetails')?.split('-')?.filter((word:any) => word !== d)?.join('-'));
                                            }else{
                                                setCheckedDetails([...checkedDetails, d]);
                                                localStorage.setItem('selectedDetails', localStorage.getItem('selectedDetails') === undefined ? d : localStorage.getItem('selectedDetails') + '-' + d);
                                            }
                                        }}
                                        className='rounded-[2px] text-hash-color'
                                    />
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>

                {/* Update button */}
                <span
                    onClick={updateClick}
                    className='flex items-center justify-center px-6 h-8 text-md text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                >
                    Update
                </span>

            </div>
        </Draggable>
    );
};





// Export
export default Details;