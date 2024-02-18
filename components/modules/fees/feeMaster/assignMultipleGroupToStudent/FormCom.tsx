'use client';
// Imports
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import StudentsList from './StudentList';
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {Check, ChevronDown, X} from 'lucide-react';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {assignMultipleGroupsToStudents, fetchGroupsByTypes} from '@/lib/actions/fees/feeMaster/feeMaster/group.actions';
import {fetchStudentsByClasses} from '@/lib/actions/admission/admission/admittedStudent.actions';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {AssignMultipleGroupToStudentValidation} from '@/lib/validations/fees/feeMaster/assignMultipleGroupToStudent.validation';





// Main function
const FormCom = ({classes, installments, students, setStudents}:any) => {


    // Toast
    const {toast} = useToast();


    // Is students loading
    const [isStudentsLoading, setIsStudentsLoading] = useState(false);


    // Fee Groups
    const [feeGroups, setFeeGroups] = useState([{}]);


    // Selected classes
    const [selectedClasses, setSelectedClasses] = useState<any>([]);


    // Selected students
    const [selectedStudents, setSelectedStudents] = useState([{}]);


    // Form
    const form = useForm({
        resolver: zodResolver(AssignMultipleGroupToStudentValidation),
        defaultValues:{
            group_type:'Classes',
            fees_group:'',
            fees_installment:'All installments',
            class:['']
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof AssignMultipleGroupToStudentValidation>) => {
        try {


            // Assigning
            await assignMultipleGroupsToStudents({
                group_name:values.fees_group,
                installment:values.fees_installment,
                students:selectedStudents
            });


            // Toast
            toast({title:'Assigned Successfully!'});


            // Reseting
            form.reset({
                group_type:'Classes',
                fees_group:'',
                fees_installment:'All installments',
                class:['']
            });
            setStudents([]);
            setSelectedStudents([{}]);
            setSelectedClasses([]);

        } catch (err:any) {
            console.log(err);
        }
    };


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            const groupsRes = await fetchGroupsByTypes({is_special:form.getValues().group_type === 'Special'});
            setFeeGroups(groupsRes);
        };
        fetcher();
    }, [form.watch('group_type')]);
    useEffect(() => {
        setIsStudentsLoading(true);
        const fetcher = async () => {
            const res = await fetchStudentsByClasses({classes:selectedClasses.map((c:any) => c.class_name)});
            setStudents(res);
            setSelectedStudents(res);
            setIsStudentsLoading(false);
        };
        fetcher();
    }, [selectedClasses]);


    return (
        <div className='w-[95%] max-w-[1100px] flex flex-col items-center rounded-[8px] sm:w-[95%]'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col gap-6 pt-0 items-center px-2 sm:px-4 sm:gap-2 lg:pt-4'
                >

                    <div className='w-full flex flex-col justify-between gap-2 lg:flex-row lg:items-end'>

                        {/* Group Type */}
                        <div className='flex-1'>
                            <FormLabel className='text-xs text-[#726E71]'>Group Type</FormLabel>
                            <FormField
                                control={form.control}
                                name='group_type'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Group Type' className='text-xs' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='Classes'>Classes</SelectItem>
                                                    <SelectItem value='Special'>Special</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>


                        {/* Fees Group */}
                        <div className='flex-1'>
                            <FormLabel className='text-xs text-[#726E71]'>Fees Group</FormLabel>
                            <FormField
                                control={form.control}
                                name='fees_group'
                                render={({ field }) => (
                                    <FormItem className='relative'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Select Group' className='text-xs' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {feeGroups.length < 1 ? (
                                                        <p className='text-xs text-hash-color'>No groups yet</p>
                                                    ) : // @ts-ignore
                                                    !feeGroups[0]?.name ? (
                                                        <LoadingIcon />
                                                    ) : feeGroups.map((g:any) => (
                                                        <SelectItem value={g.name} key={g._id}>{g.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute top-[75%] left-0 text-red-500 text-xs'/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Fees Installment */}
                        <div className='flex-1'>
                            <FormLabel className='text-xs text-[#726E71]'>Fees Installment</FormLabel>
                            <FormField
                                control={form.control}
                                name='fees_installment'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Select Installment' className='text-xs' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='All installments'>All Installments</SelectItem>
                                                    {installments.length < 1 ? (
                                                        <p className='text-xs text-hash-color'>No installments yet</p>
                                                    ) : // @ts-ignore
                                                    !installments[0]?.name ? (
                                                        <LoadingIcon />
                                                    ) : installments.map((i:any) => (
                                                        <SelectItem value={i.name} key={i._id}>{i.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Class */}
                        <div className='flex-1'>
                            <FormLabel className='text-xs text-[#726E71]'>Class</FormLabel>

                            <Select>
                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedClasses?.length < 1 ? 'Select class(es)' : selectedClasses?.length === 1 ? '1 class selected' : `${selectedClasses?.length} classes selected`} className='text-xs' />
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedClasses(classes)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12} />
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedClasses([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12} />
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className=''>
                                        {classes.length < 1 ? (
                                            <p className='text-xs text-hash-color'>No classes yet</p>
                                        ) : // @ts-ignore
                                        !classes[0]?.class_name ? (
                                            <LoadingIcon />
                                        ) : classes.map((c:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color'
                                                    checked={selectedClasses?.map((m: any) => m.class_name).includes(c.class_name)}
                                                    // @ts-ignore
                                                    onClick={() => selectedClasses.map((c:any) => c.class_name)?.includes(c.class_name) ? setSelectedClasses(selectedClasses?.filter((m: any) => m !== c)) : setSelectedClasses([...selectedClasses, c])}
                                                />
                                                <p className='pl-[2px] text-xs'>{c.class_name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>

                        </div>


                        <div className='flex-1 flex flex-row gap-2'>
                            {form.formState.dirtyFields.group_type && (
                                <Button
                                    type='submit'
                                    className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                                >
                                    Show Details
                                </Button>
                            )}

                            <Button
                                type='submit'
                                className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                            >
                                Save
                            </Button>
                        </div>

                    </div>

                    <StudentsList selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents} from={form} students={students} isStudentsLoading={isStudentsLoading}/>
                </form>
            </Form>


        </div>
    );
};





// Export
export default FormCom;