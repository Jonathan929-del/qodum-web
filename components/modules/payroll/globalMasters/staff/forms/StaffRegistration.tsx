'use client';
// Imports
import Image from 'next/image';
import {useEffect, useState} from 'react';
import ProfilePicture from './ProfilePicture';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {ChevronDown, Search, } from 'lucide-react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import MyDatePicker from '@/components/utils/CustomDatePicker';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {fetchStaffTypes} from '@/lib/actions/payroll/globalMasters/staffType.actions';
import {fetchStudentByRegNo} from '@/lib/actions/admission/admission/student.actions';
import {fetchReligions} from '@/lib/actions/admission/globalMasters/religion.actions';
import {fetchDepartments} from '@/lib/actions/payroll/globalMasters/department.actions';
import {fetchBloodGroups} from '@/lib/actions/admission/globalMasters/bloodGroup.actions';
import {fetchDesignations} from '@/lib/actions/payroll/globalMasters/designation.actions';
import {fetchWings} from '@/lib/actions/fees/globalMasters/defineClassDetails/wing.actions';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main function
const StaffRegistration = ({form, setIsViewOpened, setUpdateStaff, setFile, updateStaff, imageSrc, setImageSrc, setIsLoading, staff, dateOfBirth, setDateOfBirth, dateOfAnniversary, setDateOfAnniversary, dateOfJoining, setDateOfJoining, dateOfRetire, setDateOfRetire}:any) => {

    // Is loading searched students
    const [isLoadingSearchedStudents, setIsLoadingSearchedStudents] = useState(false);


    // Wings
    const [wings, setWings] = useState([{}]);


    // Blood groups
    const [bloodGroups, setBloodGroups] = useState([{}]);


    // Staff types
    const [staffTypes, setStaffTypes] = useState([{}]);


    // Designations
    const [designations, setDesignations] = useState([{}]);


    // Departments
    const [departments, setDepartments] = useState([{}]);


    // Religions
    const [religions, setReligions] = useState([{}]);


    // Search
    const [search, setSearch] = useState('');


    // Search staff
    const [searchStaff, setSearchStaff] = useState<any>([]);


    // Handle Search Click
    const searchClick = async () => {
        setIsLoading(true);
        if(staff?.map((s:any) => s?.student?.reg_no)?.includes(search)){
            const student = await fetchStudentByRegNo({reg_no:search});
            setUpdateStaff({
                id:'',
                isDeleteClicked:false,
            });
        }else{
            setIsViewOpened(true);
        }
        setSearch('');
        setIsLoading(false);
    };


    // Student search click
    const studentSearchClick = (student:any) => {
        setIsLoading(true);
        setUpdateStaff({
            id:student?.student?._id,
            isDeleteClicked:false,
        });
        setSearch('');
        setIsLoading(false);
    };


    // Searched Students
    const searchedStudents = (
        <div
            className={`z-10 flex-col absolute w-[120%] h-auto mt-2 max-h-[300px] top-[100%] left-0 bg-[#fff] rounded-[5px] border-[0.5px] border-[#E4E4E4] overflow-y-scroll custom-sidebar-scrollbar ${
            // @ts-ignore
            search !== '' ? 'flex' : 'hidden'}`}
        >

            {isLoadingSearchedStudents ? (
                <LoadingIcon />
            ) : searchStaff.length < 1 ? (
                <p className=' text-xs pl-2 text-hash-color'>No students found</p>
            ) : searchStaff.map(((s:any) => (
                <div
                    onClick={() => studentSearchClick(s)}
                    className='flex flex-row gap-4 cursor-pointer transition hover:bg-[#E4E4E4]'
                >
                    <div>
                        <div className='ml-4 mt-2 rounded-[4px] border-[0.5px] border-[#E4E4E4] h-[75px] w-[75px]'>
                            {s?.student?.image && (
                                <Image
                                    src={s?.student?.image}
                                    alt='Student image'
                                    height={75}
                                    width={75}
                                    className='rounded-[4px] h-full'
                                />
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col py-2 text-[10px] text-hash-color gap-[2px]'>
                        <p className='font-semibold'>Student's Name - {s?.student?.name}</p>
                        <p className='mt-1'>Father's Name - {s?.parents?.father?.father_name}</p>
                        <p>Admission No. - {s?.student?.adm_no}</p>
                        <p>Class - {s?.student?.class}</p>
                    </div>
                </div>
            )))}


        </div>
    );


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            const wingsRes = await fetchWings();
            const bloodGroupsRes = await fetchBloodGroups();
            const staffTypesRes = await fetchStaffTypes();
            const designationsRes = await fetchDesignations();
            const departmentsRes = await fetchDepartments();
            const religionsRes = await fetchReligions();
            setWings(wingsRes);
            setBloodGroups(bloodGroupsRes);
            setStaffTypes(staffTypesRes);
            setDesignations(designationsRes);
            setDepartments(departmentsRes);
            setReligions(religionsRes);
        };
        fetcher();
    }, []);
    useEffect(() => {
        if(search !== ''){
            setIsLoadingSearchedStudents(true);
            const searchFetcher = async () => {
                // ts-ignore
                // const res = await fetchStudentsByAllData({name:search, father_name:search, adm_no:search, mobile:search, class_name:selectedClass, section_name:selectedSection});
                // setSearchStaff(res);
                // setIsLoadingSearchedStudents(false);
            };
            searchFetcher();
        }else{
            setSearchStaff([]);
        }
    }, [search]);
    useEffect(() => {
        if(dateOfBirth){
            // @ts-ignore
            form.setValue('staff_registration.date_of_birth', dateOfBirth._d);
        };
    }, [dateOfBirth]);
    useEffect(() => {
        if(dateOfAnniversary){
            // @ts-ignore
            form.setValue('staff_registration.date_of_anniversary', dateOfAnniversary._d);
        };
    }, [dateOfAnniversary]);
    useEffect(() => {
        if(dateOfJoining){
            // @ts-ignore
            form.setValue('staff_registration.date_of_joining', dateOfJoining._d);
        };
    }, [dateOfJoining]);
    useEffect(() => {
        if(dateOfRetire){
            // @ts-ignore
            form.setValue('staff_registration.date_of_retire', dateOfRetire._d);
        };
    }, [dateOfRetire]);

    return (
        <div className='flex flex-col items-center gap-4'>

            {/* Search */}
            <div className='flex justify-center w-[95%] p-2 border-[0.5px] border-[#ccc] bg-[#F7F7F7] gap-2 rounded-[5px] text-xs text-hash-color'>
                <div className='relative flex h-full flex-row justify-center min-w-[200px] max-w-[600px] w-[100%] bg-white rounded-[5px] border-[0.5px] border-[#E4E4E4]'>
                    <Input
                        value={search}
                        onChange={(e:any) => setSearch(e?.target?.value)}
                        className='h-full border-[0] text-xs placeholder:text-xs'
                        placeholder='Search name'
                    />
                    <div
                        // onClick={admissionSearchClick}
                        className='group flex flex-row items-center justify-center gap-[2px] px-2 border-[0.5px] border-[#2EABE5] rounded-r-[5px] transition cursor-pointer hover:opacity-80 hover:bg-[#2EABE5]'
                    >
                        <Search size={15} className='text-[#2EABE5] transition group-hover:text-white'/>
                        <p className='transition text-[#2EABE5] group-hover:text-white'>Search</p>
                    </div>
                    {searchedStudents}
                </div>
            </div>

            <div className='flex flex-row w-[95%] gap-10'>

                {/* Left side */}
                <div className='flex-1 flex flex-col gap-2'>

                    {/* Pref. No. */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.pref_no'
                        render={({ field }) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Pref. No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='number'
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-[35%] top-[90%] text-[11px]'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* First name */}
                    <div className='relative flex flex-row items-center gap-1'>
                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>First Name</FormLabel>
                        <FormField
                            control={form?.control}
                            name='staff_registration.first_name_title'
                            render={({ field }) => (
                                <FormItem className='flex-1 h-full flex flex-col items-start justify-center lg:flex-row lg:items-center lg:basis-[15%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field?.value}
                                            onValueChange={field?.onChange}
                                        >
                                            <SelectTrigger className='w-full h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='Mr.'>Mr.</SelectItem>
                                                <SelectItem value='Ms.'>Ms.</SelectItem>
                                                <SelectItem value='Mrs.'>Mrs.</SelectItem>
                                                <SelectItem value='Miss'>Miss</SelectItem>
                                                <SelectItem value='Fr.'>Fr.</SelectItem>
                                                <SelectItem value='Sr.'>Sr.</SelectItem>
                                                <SelectItem value='Dr.'>Dr.</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='absolute left-[35%] top-[90%] text-[11px]'/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form?.control}
                            name='staff_registration.first_name'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 lg:mt-0 lg:lg:basis-[50%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute left-[35%] top-[70%] text-[11px]' />
                                </FormItem>
                            )}
                        />
                    </div>


                    {/* Middle Name */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.middle_name'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Middle Name</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Last Name */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.last_name'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Last Name</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Gender */}
                    <FormField
                        control={form.control}
                        name='staff_registration.gender'
                        render={() => (
                            <FormItem>
                                <div className='w-full flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Gender</FormLabel>
                                    <div className='h-full w-full flex flex-col gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                        <RadioGroup
                                            value={form.getValues().staff_registration.gender}
                                            className='h-full flex flex-row'
                                        >
                                            <div className='flex items-center space-x-[2px]'>
                                                <RadioGroupItem value='Male' id='Male' onClick={() => form.setValue('staff_registration.gender', 'Male')}/>
                                                <Label htmlFor='Male' className='text-[11px] text-hash-color'>Male</Label>
                                            </div>
                                            <div className='flex items-center space-x-[2px]'>
                                                <RadioGroupItem value='Female' id='Female' onClick={() => form.setValue('staff_registration.gender', 'Female')}/>
                                                <Label htmlFor='Female' className='text-[11px] text-hash-color'>Female</Label>
                                            </div>
                                        </RadioGroup>
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Email */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.email'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Email</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Alternate Email */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.alternate_email'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Alternate Email</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Phone */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.phone'
                        render={({ field }) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Phone</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='number'
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-[35%] top-[90%] text-[11px]'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Mobile */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.mobile'
                        render={({ field }) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Mobile</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='number'
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-[35%] top-[90%] text-[11px]'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Alternate Mobile */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.alternate_mobile'
                        render={({ field }) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Alternate Mobile</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='number'
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-[35%] top-[90%] text-[11px]'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Emergency Mobile */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.emergency_mobile'
                        render={({ field }) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Emergency Mobile</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='number'
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-[35%] top-[90%] text-[11px]'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Wing and is active*/}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Wing</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[45%]'>
                            <FormField
                                control={form?.control}
                                name='staff_registration.wing'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field?.value}
                                                onValueChange={field?.onChange}
                                            >
                                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {wings?.length < 1 ? (
                                                        <p>No wings</p>
                                                        // @ts-ignore
                                                    ) : !wings[0]?.wing ? (
                                                        <LoadingIcon />
                                                    ) : wings?.map((item:any) => (
                                                        <SelectItem value={item?.wing} key={item?._id}>{item?.wing}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex flex-row items-center justify-center gap-1 basis-[20%]'>
                            <p className='text-[11px] text-[#726E71]'>Active</p>
                            <Checkbox
                                className='rounded-[2px] border-[#ccc] text-[#ccc]'
                                value={form.getValues().staff_registration.is_active}
                                onClick={() => form.getValues().staff_registration.is_active ? form.setValue('staff_registration.is_active', false) : form.setValue('staff_registration.is_active', true)}
                            />

                        </div>
                    </div>


                    {/* Maritial Status */}
                    <FormField
                        control={form.control}
                        name='staff_registration.maritial_status'
                        render={() => (
                            <FormItem>
                                <div className='w-full flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Maritial Status</FormLabel>
                                    <div className='h-full w-full flex flex-col gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                        <RadioGroup
                                            value={form.getValues().staff_registration.maritial_status}
                                            className='h-full flex flex-row'
                                        >
                                            <div className='flex items-center space-x-[2px]'>
                                                <RadioGroupItem value='Married' id='Married' onClick={() => form.setValue('staff_registration.maritial_status', 'Married')}/>
                                                <Label htmlFor='Married' className='text-[11px] text-hash-color'>Married</Label>
                                            </div>
                                            <div className='flex items-center space-x-[2px]'>
                                                <RadioGroupItem value='Unmarried' id='Unmarried' onClick={() => form.setValue('staff_registration.maritial_status', 'Unmarried')}/>
                                                <Label htmlFor='Unmarried' className='text-[11px] text-hash-color'>Unmarried</Label>
                                            </div>
                                            <div className='flex items-center space-x-[2px]'>
                                                <RadioGroupItem value='Others' id='Others' onClick={() => form.setValue('staff_registration.maritial_status', 'Others')}/>
                                                <Label htmlFor='Others' className='text-[11px] text-hash-color'>Others</Label>
                                            </div>
                                        </RadioGroup>
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Qualification */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.qualification'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Qualification</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />

                </div>

                {/* Right side */}
                <div className='flex-1 flex flex-col gap-2'>

                    <div className='flex flex-row'>

                        {/* Profile picture */}
                        <ProfilePicture
                            setFile={setFile}
                            imageSrc={imageSrc}
                            setImageSrc={setImageSrc}
                            updateStaff={updateStaff}
                        />

                        <div className='basis-[75%] flex flex-col gap-2'>
                            {/* Date of Birth */}
                            <div className='w-full h-7 flex flex-row items-center justify-center'>
                                <FormLabel className='pr-[4px] text-end text-[11px] text-[#726E71] basis-[35%]'>Date of Birth</FormLabel>
                                <FormField
                                    control={form?.control}
                                    name='staff_registration.date_of_birth'
                                    render={() => (
                                        <FormItem className='basis-[65%]'>
                                            <MyDatePicker
                                                selectedDate={dateOfBirth}
                                                setSelectedDate={setDateOfBirth}
                                            />
                                        </FormItem>
                                    )}
                                />
                            </div>


                            {/* Date of Anniversary */}
                            <div className='w-full h-7 flex flex-row items-center justify-center'>
                                <FormLabel className='pr-[4px] text-end text-[11px] text-[#726E71] basis-[35%]'>Date of Anniversary</FormLabel>
                                <FormField
                                    control={form?.control}
                                    name='staff_registration.date_of_anniversary'
                                    render={() => (
                                        <FormItem className='basis-[65%]'>
                                            <MyDatePicker
                                                selectedDate={dateOfAnniversary}
                                                setSelectedDate={setDateOfAnniversary}
                                            />
                                        </FormItem>
                                    )}
                                />
                            </div>


                            {/* Date of Joining */}
                            <div className='w-full h-7 flex flex-row items-center justify-center'>
                                <FormLabel className='pr-[4px] text-end text-[11px] text-[#726E71] basis-[35%]'>Date of Joining</FormLabel>
                                <FormField
                                    control={form?.control}
                                    name='staff_registration.date_of_joining'
                                    render={() => (
                                        <FormItem className='basis-[65%]'>
                                            <MyDatePicker
                                                selectedDate={dateOfJoining}
                                                setSelectedDate={setDateOfJoining}
                                            />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>


                    {/* Date of Retire */}
                    <div className='w-full h-7 flex flex-row items-center justify-center'>
                        <FormLabel className='pr-[4px] text-end text-[11px] text-[#726E71] basis-[35%]'>Date of Retire</FormLabel>
                        <FormField
                            control={form?.control}
                            name='staff_registration.date_of_retire'
                            render={() => (
                                <FormItem className='basis-[45%]'>
                                    <MyDatePicker
                                        selectedDate={dateOfRetire}
                                        setSelectedDate={setDateOfRetire}
                                    />
                                </FormItem>
                            )}
                        />
                        <div className='flex flex-row items-center justify-center gap-1 basis-[20%]'>
                            <p className='text-[11px] text-[#726E71]'>Extend</p>
                            <Checkbox
                                className='rounded-[2px] border-[#ccc] text-[#ccc]'
                                value={form.getValues().staff_registration.date_of_retire_is_extend}
                                onClick={() => form.getValues().staff_registration.date_of_retire_is_extend ? form.setValue('staff_registration.date_of_retire_is_extend', false) : form.setValue('staff_registration.date_of_retire_is_extend', true)}
                            />
                        </div>
                    </div>


                    {/* Address */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.address'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Address</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Current Address */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.current_address'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Current Address</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Father/Spouse Name */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.father_or_spouse_name'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Father/Spouse Name</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Father/Spouse Mobile */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.father_or_spouse_mobile'
                        render={({ field }) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Father/Spouse Mobile</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='number'
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-[35%] top-[90%] text-[11px]'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Father/Spouse Relation */}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Father/Spouse Relation</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='staff_registration.father_or_spouse_relation'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field?.value}
                                                onValueChange={field?.onChange}
                                            >
                                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='Father'>Father</SelectItem>
                                                    <SelectItem value='Spouse'>Spouse</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Blood Group */}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Blood Group</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='staff_registration.blood_group'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field?.value}
                                                onValueChange={field?.onChange}
                                            >
                                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {bloodGroups?.length < 1 ? (
                                                        <p>No blood groups</p>
                                                        // @ts-ignore
                                                    ) : !bloodGroups[0]?.blood_group ? (
                                                        <LoadingIcon />
                                                    ) : bloodGroups?.map((item:any) => (
                                                        <SelectItem value={item?.blood_group} key={item?._id}>{item?.blood_group}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Staff Type */}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Staff Type</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='staff_registration.staff_type'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field?.value}
                                                onValueChange={field?.onChange}
                                            >
                                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {staffTypes?.length < 1 ? (
                                                        <p>No staff types</p>
                                                        // @ts-ignore
                                                    ) : !staffTypes[0]?.staff_type ? (
                                                        <LoadingIcon />
                                                    ) : staffTypes?.map((item:any) => (
                                                        <SelectItem value={item?.staff_type} key={item?._id}>{item?.staff_type}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Designation */}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Designation</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='staff_registration.designation'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field?.value}
                                                onValueChange={field?.onChange}
                                            >
                                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {designations?.length < 1 ? (
                                                        <p>No designations</p>
                                                        // @ts-ignore
                                                    ) : !designations[0]?.designation ? (
                                                        <LoadingIcon />
                                                    ) : designations?.map((item:any) => (
                                                        <SelectItem value={item?.designation} key={item?._id}>{item?.designation}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Department */}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Department</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='staff_registration.department'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field?.value}
                                                onValueChange={field?.onChange}
                                            >
                                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {departments?.length < 1 ? (
                                                        <p>No departments</p>
                                                        // @ts-ignore
                                                    ) : !departments[0]?.department ? (
                                                        <LoadingIcon />
                                                    ) : departments?.map((item:any) => (
                                                        <SelectItem value={item?.department} key={item?._id}>{item?.department}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Religion */}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Religion</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='staff_registration.religion'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field?.value}
                                                onValueChange={field?.onChange}
                                            >
                                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {religions?.length < 1 ? (
                                                        <p>No religions</p>
                                                        // @ts-ignore
                                                    ) : !religions[0]?.religion_name ? (
                                                        <LoadingIcon />
                                                    ) : religions?.map((item:any) => (
                                                        <SelectItem value={item?.religion_name} key={item?._id}>{item?.religion_name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Aadhar Card No. */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.aadhar_card_no'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Aadhar Card No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />

                </div>

            </div>

        </div>
    );
};





// Export
export default StaffRegistration;