'use client';
// Imports
import * as z from 'zod';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import {useForm} from 'react-hook-form';
import {Form} from '@/components/ui/form';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {ModifyStudentAffiliatedHeads, fetchStudentByAdmNo} from '@/lib/actions/admission/admission/admittedStudent.actions';
import {AssignConcessionValidation} from '@/lib/validations/fees/feeMaster/defineAndAssignConcession/assignConcession.validation';





// Main function
const FormCom = ({classes, sections, setIsViewOpened, students, selectedStudent, setSelectedStudent, setIsLoading, showButtonClick, heads, setHeads, totalNumberGenerator, isLoadingHeads}: any) => {

    // Toast
    const {toast} = useToast();


    // Form
    const form = useForm({
        resolver:zodResolver(AssignConcessionValidation),
        defaultValues:{
            fees_type:'All fee types',
            concession_type:'',
            installment:'',
            copy_to_other_installments:false
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof AssignConcessionValidation>) => {

        // Unchanged heads
        setIsLoading(true);
        const unChangedHeads = selectedStudent.affiliated_heads.heads.filter((studentHead:any) => !heads.map((head:any) => head.head_name).includes(studentHead.head_name)).map((studentHead:any) => {
            return {
                ...studentHead,
                amounts:selectedStudent?.affiliated_heads?.heads?.map((h:any) => h?.amounts?.map((a:any) => {
                    return {
                        // name:a.name,
                        // value:Number(a.value),
                        // conc_amount:conc_amount,
                        // conc_type:a.conc_type
                        ...a
                    };
                }))[selectedStudent.affiliated_heads.heads.indexOf(studentHead)]
            };
        });

    
        // New student
        const newHeads = {
                group_name:selectedStudent.affiliated_heads.group_name,
                heads:
                    selectedStudent.affiliated_heads.heads
                        .filter((studentHead:any) => heads.map((head:any) => head.head_name).includes(studentHead.head_name))
                        .filter((studentHead:any) => studentHead.amounts.map((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount) + Number(a.paid_amount)) !== 0))
                        .map((studentHead:any) => {
                            return {
                                ...studentHead,
                                amounts:
                                    heads
                                        .filter((h:any) => h.head_name === studentHead.head_name)
                                        .map((h:any) =>
                                            h.amounts
                                                .filter((a:any) => form.getValues().installment === a.name)
                                                .map((a:any) => {
                                                    const conc_amount = a.conc_amount
                                                        ?
                                                            h.is_percent
                                                                ? Number(a.value) * (Number(a.conc_amount) / 100)
                                                                : Number(a.conc_amount)
                                                        :
                                                            0;
                                                    return {
                                                        ...a,
                                                        name:a.name,
                                                        value:Number(a.value),
                                                        conc_amount:conc_amount,
                                                        conc_type:values.concession_type
                                                    };
                                                })
                                        )[0].concat(
                                                heads
                                                    .filter((h:any) => h.head_name === studentHead.head_name)
                                                    .map((h:any) =>
                                                        h.amounts
                                                            .filter((a:any) => form.getValues().installment !== a.name)
                                                            .map((a:any) => {
                                                                const conc_amount = a.conc_amount ? Number(a.conc_amount) : 0;
                                                                return {
                                                                    ...a,
                                                                    name:a.name,
                                                                    value:Number(a.value),
                                                                    conc_amount:conc_amount,
                                                                    conc_type:a.conc_type
                                                                };
                                                            })
                                                    )[0]
                                            )
                            };
                        })
                        .concat(unChangedHeads)
                        .filter((h:any) => h?.amounts?.length !== 0)
        };


        // Updating student
        await ModifyStudentAffiliatedHeads({
            id:selectedStudent.id,
            affiliated_heads:newHeads,
        });


        // Toast
        toast({title:'Saved Successfully!'});


        // Reseting
        setHeads([]);


        // Fetching student again
        const student = await fetchStudentByAdmNo({adm_no:selectedStudent.admission_no});
        setSelectedStudent({
            id:student._id,
            image:student.student.image,
            name:student.student.name,
            address:student.student.h_no_and_streets,
            father_name:student.parents.father.father_name,
            mother_name:student.parents.mother.mother_name,
            contact_no:student.student.contact_person_mobile,
            admission_no:student.student.adm_no,
            class:student.student.class,
            affiliated_heads:{
                group_name:student.affiliated_heads.group_name,
                heads:student.affiliated_heads.heads.map((h:any) => {
                    return {
                        ...h,
                        amounts:h.amounts.map((a:any) => {
                            const conc_amount = a.conc_amount ? Number(a.conc_amount) : 0;
                            const last_rec_amount = a.last_rec_amount ? Number(a.last_rec_amount) : 0;
                            return {
                                name:a.name,
                                value:Number(a.value),
                                conc_amount:conc_amount,
                                last_rec_amount:last_rec_amount,
                                payable_amount:Number(a.value) - (last_rec_amount + conc_amount),
                                paid_amount:Number(a.value) - (last_rec_amount + conc_amount)
                            };
                        })
                    };
                })
            }
        });

    
        // Loading end
        setIsLoading(false);
    };

    return (
        <div className='w-[100%] max-w-[1200px] flex flex-col items-center px-4 overflow-y-scroll custom-sidebar-scrollbar lg:min-h-[100%]'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='h-full w-full flex flex-col gap-4 pt-4 overflow-scroll custom-sidebar-scrollbar'
                >
                    <div className='h-full w-full flex flex-row gap-1'>
                        {/* Left Side */}
                        <LeftSide
                            selectedStudent={selectedStudent}
                        />

                        {/* Right Side */}
                        <RightSide
                            form={form}
                            classes={classes}
                            sections={sections}
                            students={students}
                            setSelectedStudent={setSelectedStudent}
                            selectedStudent={selectedStudent}
                            setIsViewOpened={setIsViewOpened}
                            heads={heads}
                            setHeads={setHeads}
                            totalNumberGenerator={totalNumberGenerator}
                            showButtonClick={showButtonClick}
                            isLoadingHeads={isLoadingHeads}
                        />
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;