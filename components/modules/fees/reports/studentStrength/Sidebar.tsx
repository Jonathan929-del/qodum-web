// Improts
import {useState, useEffect} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {ChevronRight, ChevronLeft, ChevronDown, Check, X,} from 'lucide-react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import { fetchGlobalSchoolDetails } from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';
import { fetchClasses } from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import { fetchCategories } from '@/lib/actions/admission/globalMasters/category.actions';
import { fetchStreams } from '@/lib/actions/admission/globalMasters/stream.actions';
import { fetchReligions } from '@/lib/actions/admission/globalMasters/religion.actions';
import { fetchOptionalSubjects } from '@/lib/actions/admission/globalMasters/optionalSubject.actions';





// Main function
const Sidebar = ({isOpened, setIsOpened, setIsShowClicked, setIsLoading, setPdfData}) => {


    // Schools
    const [schools, setSchools] = useState([{}]);
    const [selectedSchool, setSelectedSchool] = useState('');


    // Classes
    const [classes, setClasses] = useState([{}]);
    const [selectedClasses, setSelectedClasses] = useState([{}]);


    // Genders
    const genders = ['Male', 'Female'];
    const [selectedGenders, setSelectedGenders] = useState(['Male', 'Female']);


    // Religions
    const [religions, setReligions] = useState([{}]);
    const [selectedReligions, setSelectedReligions] = useState([{}]);


    // Categories
    const [categories, setCategories] = useState([{}]);
    const [selectedCategories, setSelectedCategories] = useState([{}]);


    // Seniority
    const seniority = ['New', 'Old'];
    const [selectedSeniorities, setSelectedSeniorities] = useState(['New', 'Old']);


    // Activities
    const activities = ['Yes', 'No'];
    const [selectedActivities, setSelectedActivities] = useState(['Yes', 'No']);


    // Statuses
    const statuses = ['N/A', 'LEFT', 'REPEATER', 'RUSTICATE', 'STUDYING', 'TC', 'WITHDRAWN'];
    const [selectedStatuses, setSelectedStatuses] = useState(['N/A', 'LEFT', 'REPEATER', 'RUSTICATE', 'STUDYING', 'TC', 'WITHDRAWN']);


    // Is Ews
    const isEws = ['Yes', 'No'];
    const [selectedIsEws, setSelectedIsEws] = useState(['Yes', 'No']);


    // Transports
    const transports = ['No', 'School', 'Self', 'Public'];
    const [selectedTransports, setSelectedTransports] = useState(['No', 'School', 'Self', 'Public']);


    // Is SIbling
    const isSibling = ['Yes', 'No'];
    const [selectedIsSibling, setSelectedIsSibling] = useState(['Yes', 'No']);


    // Streams
    const [streams, setStreams] = useState([{}]);
    const [selectedStreams, setSelectedStreams] = useState([{}]);


    // Optional subjects
    const [optionalSubjects, setOptionalSubjects] = useState([{}]);
    const [selectedOptionalSubjects, setSelectedOptionalSubjects] = useState([{}]);


    // Professions
    const prfessions = ['N/A'];
    const [selectedProfessions, setSelectedProfessions] = useState(['N/A']);


    // Designations
    const designations = ['N/A'];
    const [selectedDesignations, setSelectedDesignations] = useState(['N/A']);


    // Onsubmit
    const onSubmit = async () => {

        setIsShowClicked(true);
        setIsLoading(true);
        // Filter defaulter list
        // const res = await FeeDefaulterListFilter({

        // });
        // setPdfData({
        //     students:res
        // });
        setIsLoading(false);
    };


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            const schoolsRes = await fetchGlobalSchoolDetails();
            const classesRes = await fetchClasses();
            const religionsRes = await fetchReligions();
            const categoriesRes = await fetchCategories();
            const streamsRes = await fetchStreams();
            const optionalSubjectsRes = await fetchOptionalSubjects();
            setSchools(schoolsRes);
            setClasses(classesRes);
            setSelectedClasses(classesRes);
            setReligions(religionsRes);
            setSelectedReligions(religionsRes);
            setCategories(categoriesRes);
            setSelectedCategories(categoriesRes);
            setStreams(streamsRes);
            setSelectedStreams(streamsRes);
            setOptionalSubjects(optionalSubjectsRes);
            setSelectedOptionalSubjects(optionalSubjectsRes)
        };
        fetcher();
    }, []);


    return (
        <div className={`absolute top-0 left-0 h-full w-[250px] bg-[#fff] border-r-[0.5px] border-r-[#ccc] transition-transform transform ${isOpened ? 'translate-x-0' : '-translate-x-full'}`}>

            {/* Toggling button */}
            <span
                onClick={() => setIsOpened(!isOpened)}
                className='absolute top-4 right-[-40px] p-2 rounded-[2px] bg-gray-500 text-white cursor-pointer'
            >
                {isOpened ? (
                    <ChevronLeft />
                ) : (
                    <ChevronRight />
                )}
            </span>

            {/* Content */}
            <div className='h-full flex flex-col py-4 pl-2 pr-4 gap-1 overflow-y-scroll custom-sidebar-scrollbar'>


                {/* Fee type */}
                <div className='w-full h-6 flex flex-row items-center justify-center gap-2'>
                    <p className='basis-[30%] h-full flex justify-end items-center text-[#726E71] text-xs'>Fee Type</p>
                    <div className='basis-[70%] flex flex-col items-start gap-4 sm:basis-[70%]'>
                        <Select
                            onValueChange={(v:any) => setSelectedSchool(v)}
                        >
                            <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                <SelectValue placeholder='Select Wing'/>
                                <ChevronDown className='h-4 w-4 opacity-50'/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='All fee types'>All fee types</SelectItem>
                                {schools.length < 1 ? (
                                    <p className='text-xs text-hash-color'>No schools</p>
                                ) : // @ts-ignore
                                !schools[0].school_name ? (
                                    <LoadingIcon />
                                ) : schools.map((f:any) => (
                                    <SelectItem value={f.school_name} key={f._id}>{f.school_name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                {/* Class */}
                <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                    <p className='basis-[30%] text-xs text-end text-[#726E71]'>Class</p>
                    <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                        <Select>
                            <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                <SelectValue placeholder={selectedClasses?.length === 0 ? 'Select Class(es)' : selectedClasses?.length === 1 ? '1 class selected' : `${selectedClasses?.length} classes selected`} className='text-xs'/>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </SelectTrigger>
                            <SelectContent>
                                <div className='flex flex-row'>
                                    <div
                                        // @ts-ignore
                                        onClick={() => setSelectedClasses(classes)}
                                        className='group flex flex-row items-center justify-center cursor-pointer'
                                    >
                                        <Check size={12}/>
                                        <p className='text-xs group-hover:underline'>All</p>
                                    </div>
                                    <div
                                        onClick={() => setSelectedClasses([])}
                                        className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                    >
                                        <X size={12}/>
                                        <p className='text-xs group-hover:underline'>Clear</p>
                                    </div>
                                </div>
                                <ul className='mt-2'>
                                    {classes.length < 1 ? (
                                        <p className='text-xs text-hash-color'>No classes</p>
                                    ) : // @ts-ignore
                                    !classes[0].class_name ? (
                                        <LoadingIcon />
                                    ) : classes.map((i:any) => (
                                        <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                            <Checkbox
                                                className='rounded-[2px] text-hash-color font-semibold'
                                                checked={selectedClasses?.map((item:any) => item.class_name).includes(i.class_name)}
                                                // @ts-ignore
                                                onClick={() => selectedClasses?.includes(i) ? setSelectedClasses(selectedClasses?.filter((item:any) => item !== i)) : setSelectedClasses([...selectedClasses, i])}
                                            />
                                            <p className='text-xs font-semibold'>{i.class_name}</p>
                                        </li>
                                    ))}
                                </ul>
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                {/* Gender */}
                <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                    <p className='basis-[30%] text-xs text-end text-[#726E71]'>Gender</p>
                    <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                        <Select>
                            <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                <SelectValue placeholder={selectedGenders?.length === 0 ? 'Select Gender(s)' : selectedGenders?.length === 1 ? '1 gender selected' : `${selectedGenders?.length} genders selected`} className='text-xs'/>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </SelectTrigger>
                            <SelectContent>
                                <div className='flex flex-row'>
                                    <div
                                        // @ts-ignore
                                        onClick={() => setSelectedGenders(genders)}
                                        className='group flex flex-row items-center justify-center cursor-pointer'
                                    >
                                        <Check size={12}/>
                                        <p className='text-xs group-hover:underline'>All</p>
                                    </div>
                                    <div
                                        onClick={() => setSelectedGenders([])}
                                        className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                    >
                                        <X size={12}/>
                                        <p className='text-xs group-hover:underline'>Clear</p>
                                    </div>
                                </div>
                                <ul className='mt-2'>
                                    {genders.map((i:any) => (
                                        <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                            <Checkbox
                                                className='rounded-[2px] text-hash-color font-semibold'
                                                checked={selectedGenders.includes(i)}
                                                // @ts-ignore
                                                onClick={() => selectedGenders?.includes(i) ? setSelectedGenders(selectedGenders?.filter((item:any) => item !== i)) : setSelectedGenders([...selectedGenders, i])}
                                            />
                                            <p className='text-xs font-semibold'>{i}</p>
                                        </li>
                                    ))}
                                </ul>
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                {/* Religion */}
                <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                    <p className='basis-[30%] text-xs text-end text-[#726E71]'>Religion</p>
                    <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                        <Select>
                            <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                <SelectValue placeholder={selectedReligions?.length === 0 ? 'Select Religion(s)' : selectedReligions?.length === 1 ? '1 religion selected' : `${selectedReligions?.length} religions selected`} className='text-xs'/>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </SelectTrigger>
                            <SelectContent>
                                <div className='flex flex-row'>
                                    <div
                                        // @ts-ignore
                                        onClick={() => setSelectedReligions(religions)}
                                        className='group flex flex-row items-center justify-center cursor-pointer'
                                    >
                                        <Check size={12}/>
                                        <p className='text-xs group-hover:underline'>All</p>
                                    </div>
                                    <div
                                        onClick={() => setSelectedReligions([])}
                                        className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                    >
                                        <X size={12}/>
                                        <p className='text-xs group-hover:underline'>Clear</p>
                                    </div>
                                </div>
                                <ul className='mt-2'>
                                    {religions.length < 1 ? (
                                        <p className='text-xs text-hash-color'>No religions</p>
                                    ) : // @ts-ignore
                                    !religions[0].religion_name ? (
                                        <LoadingIcon />
                                    ) : religions.map((i:any) => (
                                        <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                            <Checkbox
                                                className='rounded-[2px] text-hash-color font-semibold'
                                                checked={selectedReligions?.map((item:any) => item.religion_name).includes(i.religion_name)}
                                                // @ts-ignore
                                                onClick={() => selectedReligions?.includes(i) ? setSelectedReligions(selectedReligions?.filter((item:any) => item !== i)) : setSelectedReligions([...selectedReligions, i])}
                                            />
                                            <p className='text-xs font-semibold'>{i.religion_name}</p>
                                        </li>
                                    ))}
                                </ul>
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                {/* Category */}
                <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                    <p className='basis-[30%] text-xs text-end text-[#726E71]'>Category</p>
                    <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                        <Select>
                            <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                <SelectValue placeholder={selectedCategories?.length === 0 ? 'Select Category' : selectedCategories?.length === 1 ? '1 category selected' : `${selectedCategories?.length} categories selected`} className='text-xs'/>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </SelectTrigger>
                            <SelectContent>
                                <div className='flex flex-row'>
                                    <div
                                        // @ts-ignore
                                        onClick={() => setSelectedCategories(categories)}
                                        className='group flex flex-row items-center justify-center cursor-pointer'
                                    >
                                        <Check size={12}/>
                                        <p className='text-xs group-hover:underline'>All</p>
                                    </div>
                                    <div
                                        onClick={() => setSelectedCategories([])}
                                        className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                    >
                                        <X size={12}/>
                                        <p className='text-xs group-hover:underline'>Clear</p>
                                    </div>
                                </div>
                                <ul className='mt-2'>
                                    {categories.length < 1 ? (
                                        <p className='text-xs text-hash-color'>No categories</p>
                                    ) : // @ts-ignore
                                    !categories[0].category_name ? (
                                        <LoadingIcon />
                                    ) : categories.map((i:any) => (
                                        <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                            <Checkbox
                                                className='rounded-[2px] text-hash-color font-semibold'
                                                checked={selectedCategories?.map((item:any) => item.category_name).includes(i.category_name)}
                                                // @ts-ignore
                                                onClick={() => selectedCategories?.includes(i) ? setSelectedCategories(selectedCategories?.filter((item:any) => item !== i)) : setSelectedCategories([...selectedCategories, i])}
                                            />
                                            <p className='text-xs font-semibold'>{i.category_name}</p>
                                        </li>
                                    ))}
                                </ul>
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                {/* Is New */}
                <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                    <p className='basis-[30%] text-xs text-end text-[#726E71]'>Is New</p>
                    <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                        <Select>
                            <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                <SelectValue placeholder={selectedSeniorities?.length === 0 ? 'Select' : selectedSeniorities?.length === 1 ? '1 field selected' : `${selectedSeniorities?.length} fields selected`} className='text-xs'/>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </SelectTrigger>
                            <SelectContent>
                                <div className='flex flex-row'>
                                    <div
                                        // @ts-ignore
                                        onClick={() => setSelectedSeniorities(seniority)}
                                        className='group flex flex-row items-center justify-center cursor-pointer'
                                    >
                                        <Check size={12}/>
                                        <p className='text-xs group-hover:underline'>All</p>
                                    </div>
                                    <div
                                        onClick={() => setSelectedSeniorities([])}
                                        className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                    >
                                        <X size={12}/>
                                        <p className='text-xs group-hover:underline'>Clear</p>
                                    </div>
                                </div>
                                <ul className='mt-2'>
                                    {seniority.map((i:any) => (
                                        <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                            <Checkbox
                                                className='rounded-[2px] text-hash-color font-semibold'
                                                checked={selectedSeniorities.includes(i)}
                                                // @ts-ignore
                                                onClick={() => selectedSeniorities?.includes(i) ? setSelectedSeniorities(selectedSeniorities?.filter((item:any) => item !== i)) : setSelectedSeniorities([...selectedSeniorities, i])}
                                            />
                                            <p className='text-xs font-semibold'>{i}</p>
                                        </li>
                                    ))}
                                </ul>
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                {/* Is Active */}
                <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                    <p className='basis-[30%] text-xs text-end text-[#726E71]'>Is Active</p>
                    <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                        <Select>
                            <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                <SelectValue placeholder={selectedActivities?.length === 0 ? 'Select' : selectedActivities?.length === 1 ? '1 field selected' : `${selectedActivities?.length} fields selected`} className='text-xs'/>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </SelectTrigger>
                            <SelectContent>
                                <div className='flex flex-row'>
                                    <div
                                        // @ts-ignore
                                        onClick={() => setSelectedActivities(activities)}
                                        className='group flex flex-row items-center justify-center cursor-pointer'
                                    >
                                        <Check size={12}/>
                                        <p className='text-xs group-hover:underline'>All</p>
                                    </div>
                                    <div
                                        onClick={() => setSelectedActivities([])}
                                        className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                    >
                                        <X size={12}/>
                                        <p className='text-xs group-hover:underline'>Clear</p>
                                    </div>
                                </div>
                                <ul className='mt-2'>
                                    {activities.map((i:any) => (
                                        <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                            <Checkbox
                                                className='rounded-[2px] text-hash-color font-semibold'
                                                checked={selectedActivities.includes(i)}
                                                // @ts-ignore
                                                onClick={() => selectedActivities?.includes(i) ? setSelectedActivities(selectedActivities?.filter((item:any) => item !== i)) : setSelectedActivities([...selectedActivities, i])}
                                            />
                                            <p className='text-xs font-semibold'>{i}</p>
                                        </li>
                                    ))}
                                </ul>
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                {/* Status */}
                <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                    <p className='basis-[30%] text-xs text-end text-[#726E71]'>Status</p>
                    <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                        <Select>
                            <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                <SelectValue placeholder={selectedStatuses?.length === 0 ? 'Select' : selectedStatuses?.length === 1 ? '1 status selected' : `${selectedStatuses?.length} statuses selected`} className='text-xs'/>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </SelectTrigger>
                            <SelectContent>
                                <div className='flex flex-row'>
                                    <div
                                        // @ts-ignore
                                        onClick={() => setSelectedStatuses(statuses)}
                                        className='group flex flex-row items-center justify-center cursor-pointer'
                                    >
                                        <Check size={12}/>
                                        <p className='text-xs group-hover:underline'>All</p>
                                    </div>
                                    <div
                                        onClick={() => setSelectedStatuses([])}
                                        className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                    >
                                        <X size={12}/>
                                        <p className='text-xs group-hover:underline'>Clear</p>
                                    </div>
                                </div>
                                <ul className='mt-2'>
                                    {statuses.map((i:any) => (
                                        <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                            <Checkbox
                                                className='rounded-[2px] text-hash-color font-semibold'
                                                checked={selectedStatuses.includes(i)}
                                                // @ts-ignore
                                                onClick={() => selectedStatuses?.includes(i) ? setSelectedStatuses(selectedStatuses?.filter((item:any) => item !== i)) : setSelectedStatuses([...selectedStatuses, i])}
                                            />
                                            <p className='text-xs font-semibold'>{i}</p>
                                        </li>
                                    ))}
                                </ul>
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                {/* Is EWS */}
                <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                    <p className='basis-[30%] text-xs text-end text-[#726E71]'>Is EWS</p>
                    <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                        <Select>
                            <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                <SelectValue placeholder={selectedIsEws?.length === 0 ? 'Select' : selectedIsEws?.length === 1 ? '1 field selected' : `${selectedIsEws?.length} fields selected`} className='text-xs'/>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </SelectTrigger>
                            <SelectContent>
                                <div className='flex flex-row'>
                                    <div
                                        // @ts-ignore
                                        onClick={() => setSelectedIsEws(activities)}
                                        className='group flex flex-row items-center justify-center cursor-pointer'
                                    >
                                        <Check size={12}/>
                                        <p className='text-xs group-hover:underline'>All</p>
                                    </div>
                                    <div
                                        onClick={() => setSelectedIsEws([])}
                                        className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                    >
                                        <X size={12}/>
                                        <p className='text-xs group-hover:underline'>Clear</p>
                                    </div>
                                </div>
                                <ul className='mt-2'>
                                    {activities.map((i:any) => (
                                        <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                            <Checkbox
                                                className='rounded-[2px] text-hash-color font-semibold'
                                                checked={selectedIsEws.includes(i)}
                                                // @ts-ignore
                                                onClick={() => selectedIsEws?.includes(i) ? setSelectedIsEws(selectedIsEws?.filter((item:any) => item !== i)) : setSelectedIsEws([...selectedIsEws, i])}
                                            />
                                            <p className='text-xs font-semibold'>{i}</p>
                                        </li>
                                    ))}
                                </ul>
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                {/* Buttons */}
                <div className='flex flex-col gap-2 mt-2'>
                    <div className='flex flex-row justify-center items-center gap-2'>
                        <span
                            className='flex items-center justify-center px-4 h-6 text-sm text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                        >
                            Setting
                        </span>
                        <span
                            onClick={onSubmit}
                            className='flex items-center justify-center px-4 h-6 text-sm text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                        >
                            Show
                        </span>
                    </div>
                </div>


            </div>
        </div>
    );
};





// Export
export default Sidebar;