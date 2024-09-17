// Imports





// Main function
const ProfilePicture = ({setFile, updateStaff, imageSrc, setImageSrc}:any) => {


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
        <div className='basis-[25%] flex items-center justify-end'>
            <div className='w-[100px] h-[100px] mb-2 flex items-center justify-center bg-[#ccc] cursor-pointer rounded-[4px] transition hover:opacity-90'>
                <label
                    // @ts-ignore
                    for='image'
                    className='flex items-center justify-center h-full w-full cursor-pointer text-xs font-semibold'
                >
                    {imageSrc !== '' ? (
                        <img
                            alt="Student's image"
                            src={imageSrc}
                            className='w-full h-full rounded-[4px]'
                        />
                    ) : updateStaff.staff_registration.profile_picture ? (
                        <img
                            alt="Student's image"
                            src={updateStaff.staff_registration.profile_picture}
                            className='w-full h-full rounded-[4px]'
                        />
                    ) : (
                        <p className='text-[10px]'>Select Image</p>
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
export default ProfilePicture;