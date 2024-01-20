'use client';
// Imports
import * as z from 'zod';
import {Form} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { EnquiryNoSettingValidation } from '@/lib/validations/admission/masterSettings/enquiryNoSetting.validation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { StudentClassPromotionValidation } from '@/lib/validations/admission/masterSettings/studentClassPromotion.validation';
import FormCom from '@/components/modules/admission/masterSettings/studentClassPromotion/FormCom';
import StudentsList from '@/components/modules/admission/masterSettings/studentClassPromotion/StudentList';



// Main function
const page = () => {

    const [isVisible, setIsVisible] = useState(true)

    // Toast
    const { toast } = useToast();


    // Form
    const form = useForm({
        resolver: zodResolver(StudentClassPromotionValidation),
        defaultValues: {
            class: '',
            section: false,
            current_session: '',
            next_session: ''
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof StudentClassPromotionValidation>) => {
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