// Imports
import {Button} from '@/components/ui/button';





// Main function
const Buttons = ({form, setSelectedStudent, setHeads}:any) => {

    // Cancel button
    const cancel = () => {
        // Reseting
        setHeads([]);
        form.reset({
            fees_type:'All fee types',
            concession_type:'',
            installment:'',
            copy_to_other_installments:false
        });
        setSelectedStudent({
            id:'',
            image:'',
            name:'',
            address:'',
            father_name:'',
            mother_name:'',
            contact_no:'',
            admission_no:'',
            class:'',
            affiliated_heads:{
                group_name:'',
                heads:[]
            }
        });
    };

    return (
        <div className='flex flex-row items-center justify-center gap-3 p-2 rounded-[5px] bg-[#F7F7F7] border-[#ccc] border-[0.5px]'>
            {/* Save */}
            <Button
                type='submit'
                className='px-3 h-6 text-xs text-white bg-[#73E9AF] rounded-[4px] hover:bg-[#8be0b7]'
            >
                Save
            </Button>
            {/* Cancel */}
            <span
                onClick={cancel}
                className='flex items-center justify-center px-3 h-6 text-xs text-white bg-[#FDCD88] rounded-[4px] transition cursor-pointer hover:opacity-80'
            >
                Cancel
            </span>
        </div>
    );
};





// Export
export default Buttons;