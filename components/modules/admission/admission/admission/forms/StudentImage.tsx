// Imports
import Image from 'next/image';





// Main function
const StudentImage = ({setFile, updateStudent, imageSrc, setImageSrc, valuesFromRegister}:any) => {


    // Handle on change
    const handleOnChange = (e:any) => {
        setFile(e.target.files[0])
        const reader = new FileReader();
        reader.onload = function(onLoadEvent) {
            // @ts-ignore
            setImageSrc(onLoadEvent.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };


    return (
        <div className='w-full mt-10 flex items-center justify-center'>
            <div className='w-[125px] h-[125px] mb-2 flex items-center justify-center bg-[#ccc] cursor-pointer rounded-[5px] transition hover:opacity-90'>
                <label
                    // @ts-ignore
                    for='image'
                    className='flex items-center justify-center h-full w-full cursor-pointer text-xs font-semibold'
                >
                    {imageSrc !== '' ? (
                        <Image
                            alt='image'
                            // @ts-ignore
                            src={imageSrc}
                            width={100}
                            height={100}
                            className='w-full h-full rounded-[5px]'
                        />
                    ) : updateStudent.student.image ? (
                        <Image
                            alt='image'
                            src={updateStudent.student.image}
                            width={100}
                            height={100}
                            className='w-full h-full rounded-[5px]'
                        />
                    ) : valuesFromRegister.student.image ? (
                        <Image
                            alt='image'
                            src={valuesFromRegister.student.image}
                            width={100}
                            height={100}
                            className='w-full h-full rounded-[5px]'
                        />
                    ) : (
                        <p>Select Image</p>
                    )}
                </label>
                <input
                    type='file'
                    accept='image/*'
                    name='image'
                    id='image'
                    className='hidden'
                    onChange={(e:any) => {handleOnChange(e)}}
                />
            </div>
        </div>
    );
};





// Export
export default StudentImage;