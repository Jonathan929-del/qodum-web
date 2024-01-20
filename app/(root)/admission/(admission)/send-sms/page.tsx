'use client';
// Imports
import * as z from 'zod';
import {Form} from '@/components/ui/form';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import FormCom from '@/components/modules/admission/admission/sendSMS/FormCom';
import StudentsList from '@/components/modules/admission/admission/sendSMS/StudentList';
import {SendSmsValidation} from '@/lib/validations/admission/admission/sendSms.validation';



// Main function
const page = () => {
    const [isVisible, setIsVisible] = useState(true)

    // Toast
    const { toast } = useToast();


    // Form
    const form = useForm({
        resolver: zodResolver(SendSmsValidation),
        defaultValues: {
            session:'',
            class_name: '',
            special_group: '',
            route: '',
            stop: '',
            vehicle: ''
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof SendSmsValidation>) => {
        try {


            toast({ title: 'Group Assigned Successfully!' });

        } catch (err: any) {
            console.log(err);
        }
    };





    return (
        <div className="flex mx-auto py-4 w-full h-full bg-white">
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative mx-auto w-full  flex flex-col pt-4 items-center px-2 sm:px-4 sm:gap-2 '
                >

                    <FormCom form={form} />


                    <StudentsList form={form} />

                </form>
            </Form>
        </div>
    )
}





// Export
export default page;