// Imports
import {useContext} from 'react';
import {AuthContext} from '@/context/AuthContext';
import { LogOut } from 'lucide-react';





// Main function
const HomeSidebar = () => {

    // Fetching user
    const {user, logout} = useContext(AuthContext);

    return (
        <div className='h-full flex flex-col justify-between py-20 mx-4'>
            <div className='hidden flex-col items-center gap-2 md:flex'>
                {user?.profile_picture ? (
                    <img
                        src={user?.profile_picture}
                        alt='User profile picture'
                        className='h-[50px] w-[50px] size-fit rounded-full'
                    />
                ) : (
                    <div className='flex items-center justify-center h-[50px] w-[50px] text-[11px] text-hash-color rounded-full border-[0.5px] border-[#ccc]'>
                        No photo
                    </div>
                )}
                <span
                    onClick={logout}
                    className='hidden justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform lg:flex'
                >
                    <LogOut className='text-hash-color' size={20}/>
                </span>
            </div>
        </div>
    );
};





// Export
export default HomeSidebar;