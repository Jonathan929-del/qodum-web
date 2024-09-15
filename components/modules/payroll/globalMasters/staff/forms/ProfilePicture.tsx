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
        <div className='w-full flex items-center justify-center'>
            <div className='w-[75px] h-[75px] mb-2 flex items-center justify-center bg-[#ccc] cursor-pointer rounded-full transition hover:opacity-90'>
                <label
                    // @ts-ignore
                    for='image'
                    className='flex items-center justify-center h-full w-full cursor-pointer text-xs font-semibold'
                >
                    {imageSrc !== '' ? (
                        <img
                            alt="Student's image"
                            src={imageSrc}
                            className='w-full h-full rounded-full'
                        />
                    ) : updateStaff.staff_registration.profile_picture ? (
                        <img
                            alt="Student's image"
                            src={updateStaff.staff_registration.profile_picture}
                            className='w-full h-full rounded-full'
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