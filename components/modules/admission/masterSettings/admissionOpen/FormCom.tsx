// Imports
import {AuthContext} from '@/context/AuthContext';
import {useToast} from '@/components/ui/use-toast';
import {useContext, useEffect, useState} from 'react';
import { createAdmissionStates, fetchAdmissionStates, toggleStudentsAdmissionState } from '@/lib/actions/payroll/globalMasters/admissionStates.actions';
import LoadingIcon from '@/components/utils/LoadingIcon';





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


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Admission states
    const [admissionStates, setAdmissionStates] = useState({is_staff_admission_opened:false, is_students_admission_opened:false});


    // Toast
    const {toast} = useToast();


    // Change admission state
    const changeAdmissionState = async () => {
        setIsLoading(true);
        await toggleStudentsAdmissionState().then(async () => {
            const statesRes = await fetchAdmissionStates();
            setAdmissionStates(statesRes);
        });
        setIsLoading(false);
    };


    // Use effect
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Admission')?.permissions?.find((pp:any) => pp.sub_menu === 'Admission Open');
        setPermissions(grantedPermissions);
    }, [user]);
    useEffect(() => {
        setIsLoading(true);
        const fetcher = async () => {
            const statesRes = await fetchAdmissionStates();
            if(!statesRes){
                await createAdmissionStates().then(async () => {
                    const statesRes = await fetchAdmissionStates(); 
                    setAdmissionStates(statesRes);
                });
                return;
            };
            setAdmissionStates(statesRes);
            setIsLoading(false);
        };
        fetcher();
    }, []);

    return (
        <div className='w-[90%] max-h-[90%] max-w-[1000px] flex flex-col items-center sm:w-[80%]'>
            {permissions.modify && (
                    <span
                    className='flex items-center justify-center min-w-[150px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                    onClick={changeAdmissionState}
                >
                    {isLoading ? (
                        <LoadingIcon />
                    ) : `${admissionStates.is_students_admission_opened ? 'Close' : 'Open'} Students Admission`
                    }
                </span>
            )}
        </div>
    )
}





// Export
export default FormCom;