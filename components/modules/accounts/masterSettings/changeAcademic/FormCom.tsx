'use client';
// Imports
import * as z from 'zod';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {changeAcademic} from '@/lib/actions/accounts/masterSettings/changeAcademic.actions';
import {ChangeAcademicValidation} from '@/lib/validations/accounts/masterSettings/changeAcademic';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main function
const FormCom = ({academicYears, financialYears, schoolsNames, activeAcademicYear, activeFinancialYear}:any) => {


    // Toast
    const {toast} = useToast();


    // Router
    const router = useRouter();


    // Loading icon
    const loadingIcon = (
        <div role="status">
            <svg aria-hidden="true" className=" py-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#3D67B0]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
    );


    // Form
    const form = useForm({
        resolver:zodResolver(ChangeAcademicValidation),
        defaultValues:{
            academic_year:activeAcademicYear,
            financial_year:activeFinancialYear,
            school_name:''
        }
    });


    // Submit handler
    const submitHandler = async (e:any) => {
        e.preventDefault();
        if(deepEqual(form.getValues(), {
                academic_year:'',
                financial_year:'',
                school_name:''
        })){
            toast({title:'No data was changed', variant:'alert'});
        }else{

            await changeAcademic({
                academic_year:form.getValues('academic_year') === '' ? activeAcademicYear : form.getValues('academic_year'),
                financial_year:form.getValues('financial_year') === '' ? activeFinancialYear : form.getValues('financial_year'),
                school_name:form.getValues('school_name')
            });
            toast({title:'Changed Successfully!'});
            window.location.reload();
        }
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Change Academic</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={submitHandler}
                    className='w-full flex flex-col items-center px-2 sm:px-4'
                >

                    {/* Academic Year */}
                    <FormField
                        control={form.control}
                        name='academic_year'
                        render={({field}) => (
                            <FormItem className='w-full flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto text-xs text-[#726E71] sm:basis-[30%]'>Academic Year</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none sm:basis-[70%]'>
                                            <SelectValue placeholder={activeAcademicYear || loadingIcon}/>
                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {academicYears.map((year:any) => (
                                                <SelectItem
                                                    value={year || loadingIcon}
                                                    key={year}
                                                >
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Financial Year */}
                    <FormField
                        control={form.control}
                        name='financial_year'
                        render={({field}) => (
                            <FormItem className='w-full flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:mt-0'>
                                <FormLabel className='basis-auto text-xs text-[#726E71] sm:basis-[30%]'>Financial Year</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none sm:basis-[70%]'>
                                            <SelectValue placeholder={activeFinancialYear || loadingIcon}/>
                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {financialYears.map((year:any) => (
                                                <SelectItem
                                                    value={year || loadingIcon}
                                                    key={year}
                                                >
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* School Name */}
                    <FormField
                        control={form.control}
                        name='school_name'
                        render={({field}) => (
                            <FormItem className='w-full flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:mt-0'>
                                <FormLabel className='basis-auto text-xs text-[#726E71] sm:basis-[30%]'>School</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none sm:basis-[70%]'>
                                            <SelectValue placeholder={schoolsNames[0] || loadingIcon}/>
                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {schoolsNames.map((name:any) => (
                                                <SelectItem
                                                    value={name || loadingIcon}
                                                    key={name}
                                                >
                                                    {name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <Button
                        type='submit'
                        className='px-8 h-8 mb-4 mt-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px]'
                    >
                        Change
                    </Button>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;