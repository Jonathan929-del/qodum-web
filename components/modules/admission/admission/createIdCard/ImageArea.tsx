// Imports
import Image from 'next/image';
import {useToast} from '@/components/ui/use-toast';





// Main function
const ImageArea = ({selectedStudent, setSelectedStudent, setIsCardOpened}:any) => {
    

    // Toast
    const {toast} = useToast();


    // Cancel handler
    const cancelHandler = () => {
        setSelectedStudent({
            ...selectedStudent,
            name:'',
            adm_no:'',
            father_name:'',
            dob:'',
            class_name:'',
            mother_name:'',
            mobile:'',
            address:'',
            image:''
        });
    };


    return (
        <div className='w-full flex flex-col p-2 px-4 bg-[#F7F7F7] gap-4 text-xs text-hash-color rounded-[4px] border-[0.5px] border-[#ccc] lg:flex-row lg:justify-between lg:gap-2'>

            {/* Image */}
            <div className='flex-1'>
                {selectedStudent.image === '' ? (
                        <div className='h-[200px] w-[200px] rounded-[4px] border-[0.5px] border-[#ccc]'/>
                    ) : (
                        <Image
                            alt="Student's Image"
                            src={selectedStudent.image}
                            width={200}
                            height={200}
                            className='w-[200px] h-[200px] rounded-[4px]'
                        />
                )}
            </div>


            {/* Buttons */}
            <div className='h-full flex flex-row items-center gap-2'>
                <span
                    onClick={() => {

                        selectedStudent.name === ''
                            ? toast({title:'Please selected student', variant:'alert'})
                            : setIsCardOpened(true);
                    }}
                    className='flex items-center justify-center px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                >
                    Create ID Card
                </span>
                <span
                    className='flex items-center justify-center px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                >
                    Create Form
                </span>
                <span
                    onClick={cancelHandler}
                    className='flex items-center justify-center px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                >
                    Cancel
                </span>
            </div>
        </div>
    );
};





// Export
export default ImageArea;