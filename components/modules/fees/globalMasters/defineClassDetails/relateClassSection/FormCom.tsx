'use client';
// Imports
import * as z from 'zod';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {ChevronDown, ChevronsUpDown} from 'lucide-react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchClass, modifyClassSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {RelateClassValidation} from '@/lib/validations/fees/globalMasters/defineClassDetails/relateClass.validation';





// Main function
const FormCom = ({classes, sections}:any) => {


    // Toast
    const {toast} = useToast();
    
    
    // Form
    const form = useForm({
        resolver:zodResolver(RelateClassValidation),
        defaultValues:{
            class_name:'',
            sections:['']
        }
    });

    
    // Submit handler
    const onSubmit = async (values:z.infer<typeof RelateClassValidation>) => {
        try {
            // Updating
            await modifyClassSections({
                class_name:values.class_name,
                sections:values.sections
            });
            toast({title:'Related Successfully'});

            // Reseting form
            form.reset({
                class_name:'',
                sections:[]
            });
        } catch (err:any) {
            console.log(err.message);
        }
    };


    // Use Effect
    useEffect(() => {
        const selectedSectoinsFetcher = async () => {
            try {
                const c = await fetchClass({class_name:form.getValues().class_name});
                form.setValue('sections', c.sections);
            } catch (err:any) {
                console.log(err);
            }
        };
        selectedSectoinsFetcher();
    }, [form.watch('class_name')]);

    useEffect(() => {
        // form.setValue('sections', form.getValues().sections);
        // console.log(form.getValues().sections);
        console.log('use effect');
    }, [form.watch('sections')]);


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col py-4 items-center px-2 sm:px-4'
                >



                    {/* Class Name */}
                    <FormField
                        control={form.control}
                        name='class_name'
                        render={({field}) => (
                            <FormItem className='w-full'>
                            <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-center text-xs text-[#726E71] sm:basis-[20%]'>Class</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[80%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                <SelectValue placeholder='Select Class'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {classes.length < 1 ? (
                                                    <p>No classes to relate</p>
                                                ) : !classes[0].class_name ? (
                                                    <LoadingIcon />
                                                ) : classes.map((item:any) => (
                                                    <SelectItem value={item.class_name} key={item._id}>{item.class_name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-xs'/>
                                </div>
                            </div>
                        </FormItem>
                        )}
                    />

                    <div className='w-full flex flex-col mt-4 border-[0.5px] border-[#ccc]'>
                        <ul className='w-full flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                            <li className='basis-[40%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[0.5px] border-[#ccc]'>
                                Select
                                <ChevronsUpDown size={12}/>
                            </li>
                            <li className='basis-[60%] flex flex-row items-center justify-between px-2'>
                                Section Name
                                <ChevronsUpDown size={12}/>
                            </li>
                        </ul>
                        <div className='w-full flex flex-col text-[10px] text-hash-color cursor-pointer bg-[#E2E4FF] sm:text-xs md:text-md'>
                            {sections.length < 1 ? (
                                <p>No sections</p>
                            ) : !sections[0].section_name ? (
                                <LoadingIcon />
                            ) : sections.map((section:any) => (
                                <ul className='w-full flex flex-row border-b-[0.5px] border-[#ccc]'>
                                    <li className='basis-[40%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                        <Checkbox
                                            checked={form.getValues().sections.includes(section.section_name)}
                                            onCheckedChange={() => form.getValues().sections.includes(section.section_name) ? form.setValue('sections', form.getValues().sections.filter((box:any) => box !== section.section_name)) : form.setValue('sections', [...form.getValues().sections, section.section_name])}
                                            className='rounded-[2px] my-[2px] bg-white'
                                        />
                                    </li>
                                    <li className='basis-[60%] flex flex-row items-center justify-center px-2'>{section.section_name}</li>
                                </ul>
                            ))}
                        </div>
                    </div>


                    {/* Save button */}
                    <Button
                        type='submit'
                        className='px-[8px] h-8 mt-4 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                    >
                        Save
                    </Button>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;