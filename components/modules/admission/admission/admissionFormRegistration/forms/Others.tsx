// Imports
import {ChevronDown} from 'lucide-react';
import {useState, useEffect} from 'react';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Switch} from '@/components/ui/switch';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {fetchStreams} from '@/lib/actions/admission/globalMasters/stream.actions';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {fetchOptionalSubjects} from '@/lib/actions/admission/globalMasters/optionalSubject.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main function
const Other = ({form}:any) => {


    // Streams
    const [streams, setStreams] = useState([{}]);


    // optional Subjects
    const [subjects, setSubjects] = useState([{}]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const streamsRes = await fetchStreams();
            const subjectsRes = await fetchOptionalSubjects();
            setStreams(streamsRes);
            setSubjects(subjectsRes);
        };
        fetcher();
    }, []);


    return (
        <div className='flex flex-col'>
            <div className='flex flex-row gap-0'>
                <div className='flex-1 flex flex-col gap-2 border-r-[0.5px] pr-2 border-[#ccc]'>
                    {/* General Description */}
                    <FormField
                        control={form.control}
                        name='others.general_description'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>General Description</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                    <div className='flex flex-col'>
                        <h4 className='text-xs'>Emergency Contact</h4>
                        <div className='flex flex-col pl-4 pt-2 gap-2'>
                            {/* Person Name */}
                            <FormField
                                control={form.control}
                                name='others.emergency_contact.person_name'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Person Name</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                            {/* Mobile No. */}
                            <FormField
                                control={form.control}
                                name='others.emergency_contact.mobile_no'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Mobile No.</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                            {/* Phone No. */}
                            <FormField
                                control={form.control}
                                name='others.emergency_contact.phone_no'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Phone No.</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                            {/* Address */}
                            <FormField
                                control={form.control}
                                name='others.emergency_contact.address'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Address</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                            {/* Relation */}
                            <FormField
                                control={form.control}
                                name='others.emergency_contact.relation'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Relation</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                    <div className='flex flex-col'>
                        <h4 className='text-xs'>Emergency Contact Two</h4>
                        <div className='flex flex-col pl-4 pt-2 gap-2'>
                            {/* Person Name */}
                            <FormField
                                control={form.control}
                                name='others.emergency_contact_two.person_name'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Person Name</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                            {/* Mobile No. */}
                            <FormField
                                control={form.control}
                                name='others.emergency_contact_two.mobile_no'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Mobile No.</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                            {/* Phone No. */}
                            <FormField
                                control={form.control}
                                name='others.emergency_contact_two.phone_no'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Phone No.</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                            {/* Address */}
                            <FormField
                                control={form.control}
                                name='others.emergency_contact_two.address'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Address</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                            {/* Relation */}
                            <FormField
                                control={form.control}
                                name='others.emergency_contact_two.relation'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Relation</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                            {/* Is EWS */}
                            <FormField
                                control={form.control}
                                name='others.emergency_contact_two.is_alumni'
                                render={({field}) => (
                                    <FormItem className='flex flex-row items-start justify-start sm:items-center sm:gap-2'>
                                            <FormControl>
                                                <div className='flex-1 flex items-center justify-center space-x-2'>
                                                    <Label htmlFor='is_alumni' className='text-[11px]'>
                                                        Is Alumni
                                                    </Label>
                                                    <Switch
                                                        id='is_alumni'
                                                        {...field}
                                                        value={field.value}
                                                        onCheckedChange={field.onChange}
                                                        checked={field.value}
                                                    />
                                                </div>
                                            </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex-1 flex flex-col'>
                    <div className='flex flex-col'>
                        <h4 className='text-xs'>Student Other Details</h4>
                        <div className='flex flex-col pl-4 pt-2 gap-2'>
                            {/* Stream */}
                            <div className='w-full flex flex-col items-center sm:flex-row'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Stream</FormLabel>
                                <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField
                                        control={form.control}
                                        name='others.student_other_details.stream'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {streams.length < 1 ? (
                                                                <p>No streams</p>
                                                                // @ts-ignore
                                                            ) : !streams[0].stream_name ? (
                                                                <LoadingIcon />
                                                            ) : streams.map((item:any) => (
                                                                <SelectItem value={item.stream_name} key={item._id}>{item.stream_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            {/* optional Subject */}
                            <div className='w-full flex flex-col items-center sm:flex-row'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Optional Subject</FormLabel>
                                <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField
                                        control={form.control}
                                        name='others.student_other_details.optional_subject'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {subjects.length < 1 ? (
                                                                <p>No subjects</p>
                                                                // @ts-ignore
                                                            ) : !subjects[0].subject_name ? (
                                                                <LoadingIcon />
                                                            ) : subjects.map((item:any) => (
                                                                <SelectItem value={item.subject_name} key={item._id}>{item.subject_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            {/* Medical History */}
                            <FormField
                                control={form.control}
                                name='others.student_other_details.medical_history'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Medical History</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                            {/* Allergies */}
                            <FormField
                                control={form.control}
                                name='others.student_other_details.allergies'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Allergies</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                            {/* Other Medical Info */}
                            <FormField
                                control={form.control}
                                name='others.student_other_details.other_medical_info'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Other Medical Info</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                            {/* Family Doctor Name */}
                            <FormField
                                control={form.control}
                                name='others.student_other_details.family_doctor_name'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Family Doctor Name</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                            {/* Family Doctor Phone */}
                            <FormField
                                control={form.control}
                                name='others.student_other_details.family_doctor_phone'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Family Doctor Phone</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                            {/* Family Doctor Address */}
                            <FormField
                                control={form.control}
                                name='others.student_other_details.family_doctor_address'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Family Doctor Address</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                            {/* Distance From Home */}
                            <FormField
                                control={form.control}
                                name='others.student_other_details.distance_from_home'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Distance From Home</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                            {/* No. Of Living Year */}
                            <FormField
                                control={form.control}
                                name='others.student_other_details.no_of_living_years'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>No. Of Living Year</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                            {/* Only Child */}
                            <FormField
                                control={form.control}
                                name='others.emergency_contact_two.only_child'
                                render={({field}) => (
                                    <FormItem className='flex flex-row items-start justify-start sm:items-center sm:gap-2'>
                                            <FormControl>
                                                <div className='flex-1 flex items-center justify-center space-x-2'>
                                                    <Label htmlFor='only_child' className='text-[11px]'>
                                                    Only Child
                                                    </Label>
                                                    <Switch
                                                        id='only_child'
                                                        {...field}
                                                        value={field.value}
                                                        onCheckedChange={field.onChange}
                                                        checked={field.value}
                                                    />
                                                </div>
                                            </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <h4 className='text-xs'>Student Staff Relation</h4>
                        <div className='flex flex-col pl-4 pt-2 gap-2'>
                            {/* Staff Ward */}
                            <div className='w-full flex flex-col items-center sm:flex-row'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Staff Ward</FormLabel>
                                <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField
                                        control={form.control}
                                        name='others.student_staff_relation.staff_ward'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value='Staff Ward'>Staff Ward</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            {/* Staff Name */}
                            <div className='w-full flex flex-col items-center sm:flex-row'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Staff Name</FormLabel>
                                <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField
                                        control={form.control}
                                        name='others.student_staff_relation.staff_name'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value='Staff Name'>Staff Name</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <h4 className='text-xs'>Previous School Details</h4>
                <div className='flex flex-col pt-2 gap-4 lg:flex-row lg:gap-2'>
                    {/* School Name */}
                    <FormField
                        control={form.control}
                        name='others.previous_school_details.school_name'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>School Name</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                    {/* City */}
                    <FormField
                        control={form.control}
                        name='others.previous_school_details.city'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>City</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                    {/* Class */}
                    <FormField
                        control={form.control}
                        name='others.previous_school_details.class'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Class</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                    {/* Year */}
                    <FormField
                        control={form.control}
                        name='others.previous_school_details.year'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Year</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
                    {/* Board */}
                    <FormField
                        control={form.control}
                        name='others.previous_school_details.board'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Board</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
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
export default Other;