// Imports
import StaffList from './StaffList';
import {Button} from '@/components/ui/button';
import {AuthContext} from '@/context/AuthContext';
import {useToast} from '@/components/ui/use-toast';
import {useContext, useEffect, useState} from 'react';
import {applyStudentForAdmission, fetchClassStudents} from '@/lib/actions/admission/admission/student.actions';
import {applyStaffForAdmission, fetchStaffApplicationsNotUpForAdmission} from '@/lib/actions/payroll/globalMasters/staffApplication.actions';





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


    // Staff applications
    const [staffApplications, setStaffApplications] = useState<any>([]);


    // Selected staff applications
    const [selectedStaffApplications, setSelectedStaffApplications] = useState([]);


    // Submit handler
    const onSubmit = async () => {
        try {

            // No staff applications validation
            if(selectedStaffApplications.length === 0){
                toast({title:'Please select staff applications', variant:'alert'});
                return;
            };

            // Applying for admission
            await applyStaffForAdmission({pref_nos:selectedStaffApplications});

            // Reseting
            setStaffApplications([{}]);
            setSelectedStaffApplications([]);
            toast({title:'Updated Successfully!'});

        } catch (err: any) {
            console.log(err);
        }
    };


    // Get staff applications
    const getStaffApplications = async () => {
        const staffApplicationsRes = await fetchStaffApplicationsNotUpForAdmission();
        if(staffApplicationsRes.length > 0){
            setStaffApplications(staffApplicationsRes);
            // @ts-ignore
            setSelectedStaffApplications(staffApplicationsRes.map((s:any) => s?.staff_registration?.pref_no));
        }else{
            toast({title:'No staff applications found', variant:'alert'});
        }
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {

        };
        fetcher();
    }, []);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Payroll')?.permissions?.find((pp:any) => pp.sub_menu === 'Shortlisted Candidate');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className='w-[90%] max-h-[90%] max-w-[1000px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%] overflow-y-scroll custom-sidebar-scrollbar'>
            <form
                className='w-full flex flex-col items-center px-2 pt-6 sm:px-4'
            >
                <div className='w-full flex flex-row items-center justify-center gap-2'>
                    {/* Get Staff Applications */}
                    {permissions.read_only && (
                        <span
                            className='flex items-center justify-center min-w-[150px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                            onClick={getStaffApplications}
                        >
                            Get Staff Applications
                        </span>
                    )}
                    {/* Buttons */}
                    {permissions.modify && (
                        <span
                            onClick={onSubmit}
                            className='flex items-center justify-center min-w-[100px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                        >
                            Update
                        </span>
                    )}
                </div>


                {/* Staff List */}
                <StaffList
                    staffApplications={staffApplications}
                    selectedStaffApplications={selectedStaffApplications}
                    setSelectedStaffApplications={setSelectedStaffApplications}
                />

            </form>
        </div>
    )
}





// Export
export default FormCom;