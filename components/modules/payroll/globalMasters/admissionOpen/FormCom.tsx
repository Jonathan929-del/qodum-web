// Imports
import {AuthContext} from '@/context/AuthContext';
import {useToast} from '@/components/ui/use-toast';
import {useContext, useEffect, useState} from 'react';





// Main function
function FormCom() {

    // User
    const {user} = useContext(AuthContext);


    // Permissions
    const [permissions, setPermissions] = useState({
        add:false,
        modify:false,
        delete:false,
        print:false,
        read_only:false
    });


    // Toast
    const {toast} = useToast();


    // Change admission state
    const changeAdmissionState = async () => {
        const currentState = localStorage.getItem('isStaffAdmissionStateOpened') ? localStorage.getItem('isStaffAdmissionStateOpened') === 'true' ? true : false : false;
        if(currentState){
            // @ts-ignore
            localStorage.setItem('isStaffAdmissionStateOpened', false);
            toast({title:'Admission Closed!'});
        }else{
            // @ts-ignore
            localStorage.setItem('isStaffAdmissionStateOpened', true);
            toast({title:'Admission Opened!'});
        };
    };


    // Use effect
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Payroll')?.permissions?.find((pp:any) => pp.sub_menu === 'Admission Open');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className='w-[90%] max-h-[90%] max-w-[1000px] flex flex-col items-center sm:w-[80%]'>
            {permissions.modify && (
                <span
                    className='flex items-center justify-center min-w-[150px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                    onClick={changeAdmissionState}
                >
                    {localStorage.getItem('isStaffAdmissionStateOpened') ? localStorage.getItem('isStaffAdmissionStateOpened') === 'true' ? 'Close' : 'Open' : 'Open'} Staff Admission
                </span>
            )}
        </div>
    )
}





// Export
export default FormCom;