// Imports
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {ChevronDown, Trash} from 'lucide-react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {FormControl, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {fetchSubjects} from '@/lib/actions/admission/globalMasters/subject.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main function
const StaffEducationalDetails = ({form, educationalDetails, setEducationalDetails}:any) => {

    // Subjects
    const [subjects, setSubjects] = useState([]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const subjectsRes = await fetchSubjects();
            setSubjects(subjectsRes);
        };
        fetcher();
    }, []);

    return (
        <div className='flex flex-col gap-4 px-4 pt-10'>
            <h2>Details of Qualification:</h2>
            <div className='flex flex-col justify-center w-full h-full gap-4 pt-6 overflow-scroll custom-sidebar-scrollbar'>

                {educationalDetails.map((d:any) => (
                    <div className='min-w-[1500px] h-10 flex flex-row gap-2'>

                        {/* Qualification */}
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Qualification</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            value={d.qualification}
                                            onChange={(e:any) => {
                                                educationalDetails[educationalDetails.indexOf(d)].qualification = e.target.value;
                                                setEducationalDetails([...educationalDetails]);
                                            }}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>


                        {/* Name of School/College */}
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center '>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Name of School/College</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            value={d.name_of_school_or_college}
                                            onChange={(e:any) => {
                                                educationalDetails[educationalDetails.indexOf(d)].name_of_school_or_college = e.target.value;
                                                setEducationalDetails([...educationalDetails]);
                                            }}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>


                        {/* Name of Board/University */}
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center '>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Name of Board/University</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            value={d.name_of_board_or_universtity}
                                            onChange={(e:any) => {
                                                educationalDetails[educationalDetails.indexOf(d)].name_of_board_or_universtity = e.target.value;
                                                setEducationalDetails([...educationalDetails]);
                                            }}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>


                        {/* RC */}
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center '>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>RC</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            value={d.rc}
                                            onChange={(e:any) => {
                                                educationalDetails[educationalDetails.indexOf(d)].rc = e.target.value;
                                                setEducationalDetails([...educationalDetails]);
                                            }}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>


                        {/* Subjects */}
                        <div className='w-full h-12 mt-[-10px] flex flex-col'>
                            <FormLabel className='w-full text-[11px] text-[#726E71]'>Subjects</FormLabel>
                            <div className='w-full h-full'>
                                <Select
                                    value={d.subjects}
                                    onValueChange={(e:any) => {
                                        educationalDetails[educationalDetails.indexOf(d)].subjects = e;
                                        setEducationalDetails([...educationalDetails]);
                                    }}
                                >
                                    <SelectTrigger className='w-full h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects?.length < 1 ? (
                                            <p>No subjects</p>
                                            // @ts-ignore
                                        ) : !subjects[0]?.subject_name ? (
                                            <LoadingIcon />
                                        ) : subjects?.map((item:any) => (
                                            <SelectItem value={item?.subject_name} key={item?._id}>{item?.subject_name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>


                        {/* Percentage of Marks */}
                        <FormItem className='relative w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center '>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Percentage of Marks</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            value={d.percentage_of_marks}
                                            onChange={(e:any) => {
                                                educationalDetails[educationalDetails.indexOf(d)].percentage_of_marks = e.target.value;
                                                setEducationalDetails([...educationalDetails]);
                                            }}
                                            type='number'
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute left-[35%] top-[90%] text-[11px]'/>
                                </div>
                            </div>
                        </FormItem>


                        {/* Year of Passing */}
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center '>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Year of Passing</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            value={d.year_of_passing}
                                            onChange={(e:any) => {
                                                educationalDetails[educationalDetails.indexOf(d)].year_of_passing = e.target.value;
                                                setEducationalDetails([...educationalDetails]);
                                            }}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>

                        {/* Remove button */}
                        <span
                            onClick={() => {
                                setEducationalDetails(educationalDetails.filter((s:any) => s !== d))
                            }}
                            className='flex items-center justify-center px-2 py-2 text-white bg-gradient-to-r from-[#ba2b2b] to-[#b95e5e] rounded-full transition border-[1px] border-white cursor-pointer
                                    hover:border-[#ba2b2b] hover:from-[#ba2b2b42] hover:to-[#ba2b2b42] hover:text-[#ba2b2b]'
                        >
                            <Trash size={15} />
                        </span>

                    </div>
                ))}

                <div className='flex justify-center'>
                    <span
                        onClick={() => {
                            setEducationalDetails([
                                ...educationalDetails,
                                {
                                    qualification:'',
                                    name_of_school_or_college:'',
                                    name_of_board_or_universtity:'',
                                    rc:'',
                                    subjects:'',
                                    percentage_of_marks:0,
                                    year_of_passing:''
                                }
                            ])
                        }}
                        className='text-lg px-3 py-1 text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] rounded-full transition border-[1px] border-white cursor-pointer
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                    >
                        +
                    </span>
                </div>

            </div>
        </div>
    );
};





// Export
export default StaffEducationalDetails;