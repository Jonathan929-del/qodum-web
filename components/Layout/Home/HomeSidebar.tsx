// Imports
import Image from 'next/image';
// import {SignOutButton, useUser} from '@clerk/nextjs';
import {Button} from '@/components/ui/button';





// Main function
const HomeSidebar = () => {


    // Fetching user
    // const {user} = useUser();


    return (
        <div className='h-full flex flex-col justify-between py-20 mx-4'>
            {
                // user && (
                //     <>
                //         <div className='flex flex-col items-center'>
                //             <Image
                //                 width={125}
                //                 height={125}
                //                 alt="User's Image"
                //                 // @ts-ignore
                //                 src={user?.imageUrl}
                //                 className='rounded-full'
                //             />
                //             <p className='font-semibold mt-2 text-sm'>{`${user?.firstName} ${user?.lastName}`}</p>
                //             <p className='text-sm text-[#5392C6]'>Administrator</p>
                //             <p className='text-xs text-hash-color'>{user?.emailAddresses[0].emailAddress}</p>
                //         </div>
                //         <Button className='text-white group opacity-100 bg-gradient-to-r from-[#3e67b1] to-[#4da7db] w-[100%] mt-4 rounded-[8px] transition-opacity hover:opacity-90'>
                //             <SignOutButton />
                //         </Button>
                //     </>
                // )
            }
        </div>
    );
};





// Export
export default HomeSidebar;