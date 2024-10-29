// Imports
import {Button} from '@/components/ui/button';
import {ChevronsUpDown, X} from 'lucide-react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Command, CommandEmpty, CommandInput, CommandItem, CommandList} from '@/components/ui/command';





// Main Function
const ViewCom = ({setIsViewOpened, schoolsDetails, setUpdateSchoolDetails}:any) => {


    // Select handler
    const selectHandler = (schoolD:any) => {
        setUpdateSchoolDetails({
            id:schoolD._id,
            school_main:schoolD.school_main,
            school_subheads:schoolD.school_subheads,
            logo:schoolD.logo,
            school_name:schoolD.school_name,
            school_address:schoolD.school_address,
            school_address_2:schoolD.school_address_2,
            school_short_name:schoolD.school_short_name,
            contact_no:schoolD.contact_no,
            mobile:schoolD.mobile,
            email:schoolD.email,
            support_email_id:schoolD.support_email_id,
            website:schoolD.website,
            prefix:schoolD.prefix,
            iso_details:schoolD.iso_details,
            school_no:schoolD.school_no,
            affiliation_to:schoolD.affiliation_to,
            affiliation_no:schoolD.affiliation_no,
            udise_code:schoolD.udise_code,
            pen:schoolD.pen,
            associates:schoolD.associates,
            renew_up_to:schoolD.renew_up_to,
            school_status:schoolD.school_status,
            working_days:schoolD.working_days,
            recess:schoolD.recess,
            total_period:schoolD.total_period,
            academic_year:'',
            financial_year:'',
            facebook_link:schoolD.facebook_link,
            linkedin_link:schoolD.linkedin_link,
            twitter_link:schoolD.twitter_link,
            instagram_link:schoolD.instagram_link,
            isDeleteClicked:false
        });
        setIsViewOpened(false);
    };


    return (
        <Command
            className='w-[90%] max-h-[90%] flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8] lg:w-[70%]'
        >

            {/* Header */}
            <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Narration List</h2>
                <X color='#3a3a3a' size={18} cursor={'pointer'} onClick={() => setIsViewOpened(false)}/>
            </div>
            <div className='w-[95%] h-[90%] flex flex-col items-center border-[1px] border-[#ccc] bg-[#F1F1F1] rounded-[8px]'>


                {/* Search input */}
                <div className='w-full flex flex-row justify-end pr-4 py-2 border-b-2 border-[#ccc]'>
                    <CommandInput
                        placeholder='Search list'
                        className='h-full text-xs text-hash-color w-[250px] bg-white'
                    />
                </div>


                {/* Narration master */}
                <div className='w-full flex flex-col h-[90%] overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[650px] flex flex-row text-[10px] border-b-2 border-[#ccc] text-hash-color cursor-pointer sm:text-xs sm:min-w-[800px] md:text-md'>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-2 border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-2 border-[#ccc]'>
                            Select
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 border-r-2 border-[#ccc]'>
                            School Name
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-2 border-[#ccc]'>
                            Is Admin
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 border-r-2 border-[#ccc]'>
                            Email Id
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2'>
                            Website
                            <ChevronsUpDown size={12}/>
                        </li>
                    </ul>
                    {/* Values */}
                    <CommandList>
                        {
                            !schoolsDetails[0]?.school_name ? (
                                <p className='w-full flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-2 border-[#ccc]'>
                                    No schools assigned yet
                                </p>
                            ) : schoolsDetails.map((schoolD:any) => (
                                <CommandItem
                                    value={`${schoolsDetails.indexOf(schoolD) + 1} select ${schoolD.school_name} ${schoolD?.support_email_id} ${schoolD?.website}`}
                                    className='w-full min-w-[650px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-2 border-[#ccc] sm:text-xs sm:min-w-[800px] md:text-md'
                                >
                                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-2 border-[#ccc]'>{schoolsDetails.indexOf(schoolD) + 1}</li>
                                    <li className='basis-[15%] flex flex-row items-center justify-center px-2 border-r-2 border-[#ccc]'>
                                        <Button
                                            className='px-[8px] h-6 text-[10px] text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-xs sm:px-4'
                                            onClick={() => selectHandler(schoolD)}
                                        >
                                            Select
                                        </Button>
                                    </li>
                                    <li className='basis-[20%] flex flex-row items-center px-2 border-r-2 border-[#ccc]'>{schoolD.school_name}</li>
                                    <li className='basis-[15%] flex flex-row items-center px-2 border-r-2 border-[#ccc]'>false</li>
                                    <li className='basis-[20%] flex flex-row items-center px-2 border-r-2 border-[#ccc]'>{schoolD?.support_email_id || '-'}</li>
                                    <li className='basis-[20%] flex flex-row items-center px-2'>{schoolD?.website || '-'}</li>
                                </CommandItem>
                            ))
                        }
                    </CommandList>
                    <CommandEmpty>No results found</CommandEmpty>
                </div>


            </div>
        </Command>
    );
};





// Export
export default ViewCom;