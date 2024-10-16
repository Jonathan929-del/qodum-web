// Imports





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
                        <img
                            alt="Student's image"
                            src={imageSrc}
                            className='w-full h-full rounded-[5px]'
                        />
                    ) : updateStudent.student.image ? (
                        <img
                            alt="Student's image"
                            src={updateStudent.student.image}
                            className='w-full h-full rounded-[5px]'
                        />
                    ) : valuesFromRegister.student.image ? (
                        <img
                            alt="Student's image"
                            src={valuesFromRegister.student.image}
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