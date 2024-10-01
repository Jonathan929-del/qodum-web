// Imports
import moment from 'moment';
import Image from 'next/image';
import {useContext} from 'react';
import Clock from 'react-live-clock';
import {redirect} from 'next/navigation';
import {LogOut, Menu} from 'lucide-react';
import {AuthContext} from '@/context/AuthContext';





// Main function
const HomeTopbar = ({isSidebarOpened, setIsSidebarOpened}:any) => {

    // User
    const {user, logout} = useContext(AuthContext);


    // Today's Date
    const date = new Date();
    const today = moment(date).format('ddd, DD MMM Y');

    return (
        <nav className='flex flex-row justify-between items-center bg-white rounded-[8px] mt-4 mx-4 py-2 px-6'>
            <div className='flex flex-col items-center'>
                <p className='text-[#5392C6] text-sm mb-2'>{today}</p>
                <Clock format={'HH:mm:ss'} ticking={true} className='text-4xl'/>
            </div>
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
            <div
                className='flex justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform md:hidden'
                onClick={() => setIsSidebarOpened(!isSidebarOpened)}
            >
                <Menu
                    size={18}
                    className='text-hash-color'
                />
            </div>
        </nav>
    );
};





// Export
export default HomeTopbar;