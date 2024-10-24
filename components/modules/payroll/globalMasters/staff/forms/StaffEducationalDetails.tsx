// Imports
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {Check, ChevronDown, Trash, X} from 'lucide-react';
import {FormControl, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {fetchSubjects} from '@/lib/actions/admission/globalMasters/subject.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main function
const StaffEducationalDetails = ({educationalDetails, setEducationalDetails}:any) => {

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
                        <div className='w-full h-8 flex flex-col items-start justify-center'>
                            <p className='basis-auto pr-2 text-xs text-end text-[#726E71] sm:basis-[30%]'>Qualification</p>
                            <div className='relative h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                <Select
                                    value={d.qualification}
                                    onValueChange={(v:any) => {
                                        educationalDetails[educationalDetails.indexOf(d)].qualification = v;
                                        setEducationalDetails([...educationalDetails]);
                                    }}
                                >
                                    <SelectTrigger className='w-full h-8 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='10th'>10th</SelectItem>
                                        <SelectItem value='12th'>12th</SelectItem>
                                        <SelectItem value='Graduation'>Graduation</SelectItem>
                                        <SelectItem value='Post Graduation'>Post Graduation</SelectItem>
                                        <SelectItem value='Professional Degree'>Professional Degree</SelectItem>
                                        <SelectItem value='Dimploma and Certificate'>Dimploma and Certificate</SelectItem>
                                        <SelectItem value='Doctoral'>Doctoral</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>


                        {/* Program/Steam */}
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center '>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Program/Steam</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            value={d.program_or_steam}
                                            onChange={(e:any) => {
                                                educationalDetails[educationalDetails.indexOf(d)].program_or_steam = e.target.value;
                                                setEducationalDetails([...educationalDetails]);
                                            }}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>


                        {/* Board/University */}
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center '>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Board/University</FormLabel>
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


                        {/* Subjects */}
                        <div className='w-full h-8 flex flex-col items-start justify-center'>
                            <p className='basis-auto pr-2 text-xs text-end text-[#726E71] sm:basis-[30%]'>Subjects</p>
                            <div className='relative h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                <Select>
                                    <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder={educationalDetails[educationalDetails.indexOf(d)].subjects?.length < 1 ? 'Select subjects' : educationalDetails[educationalDetails.indexOf(d)].subjects?.length === 1 ? '1 subject selected' : `${educationalDetails[educationalDetails.indexOf(d)].subjects?.length} subjects selected`} className='text-xs'/>
                                        <ChevronDown className='h-4 w-4 opacity-50' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <div className='flex flex-row'>
                                            <div
                                                // @ts-ignore
                                                onClick={() => {
                                                    educationalDetails[educationalDetails.indexOf(d)].subjects = subjects.map((s:any) => s.subject_name);
                                                    setEducationalDetails([...educationalDetails]);
                                                }}
                                                className='group flex flex-row items-center justify-center cursor-pointer'
                                            >
                                                <Check size={12}/>
                                                <p className='text-xs group-hover:underline'>All</p>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    educationalDetails[educationalDetails.indexOf(d)].subjects = [];
                                                    setEducationalDetails([...educationalDetails]);
                                                }}
                                                className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                            >
                                                <X size={12}/>
                                                <p className='text-xs group-hover:underline'>Clear</p>
                                            </div>
                                        </div>
                                        <ul className='mt-2'>
                                            {subjects.map((subject:any) => (
                                                <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                    <Checkbox
                                                        className='rounded-[2px] text-hash-color font-semibold'
                                                        checked={educationalDetails[educationalDetails.indexOf(d)]?.subjects?.map((s:any) => s).includes(subject.subject_name)}
                                                        // @ts-ignore
                                                        onClick={() => {
                                                            educationalDetails[educationalDetails.indexOf(d)].subjects?.includes(subject.subject_name)
                                                                ? educationalDetails[educationalDetails.indexOf(d)].subjects = educationalDetails[educationalDetails.indexOf(d)].subjects.filter((s:any) => s !== subject.subject_name)
                                                                : educationalDetails[educationalDetails.indexOf(d)].subjects = [...educationalDetails[educationalDetails.indexOf(d)].subjects, subject.subject_name]
                                                            setEducationalDetails([...educationalDetails]);
                                                        }}
                                                    />
                                                    <p className='text-xs font-semibold'>{subject.subject_name}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>


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


                        {/* Maximum Marks */}
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center '>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Maximum Marks</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            value={d.maximum_marks}
                                            onChange={(e:any) => {
                                                educationalDetails[educationalDetails.indexOf(d)].maximum_marks = e.target.value;
                                                setEducationalDetails([...educationalDetails]);
                                            }}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>


                        {/* Obtains Marks */}
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center '>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Obtains Marks</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            value={d.obtains_marks}
                                            onChange={(e:any) => {
                                                educationalDetails[educationalDetails.indexOf(d)].obtains_marks = e.target.value;
                                                setEducationalDetails([...educationalDetails]);
                                            }}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>


                        {/* Percentage */}
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center '>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Percentage</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            value={d.percentage}
                                            onChange={(e:any) => {
                                                educationalDetails[educationalDetails.indexOf(d)].percentage = e.target.value;
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
                                    program_or_steam:'',
                                    name_of_board_or_universtity:'',
                                    subjects:[],
                                    year_of_passing:'',
                                    maximum_marks:0,
                                    obtains_marks:0,
                                    percentage:0
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