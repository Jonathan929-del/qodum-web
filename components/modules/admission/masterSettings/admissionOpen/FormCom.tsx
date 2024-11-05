// Imports
import {AuthContext} from '@/context/AuthContext';
import {useToast} from '@/components/ui/use-toast';
import {useContext, useEffect, useState} from 'react';
import { createAdmissionStates, fetchAdmissionStates, toggleStudentsAdmissionState } from '@/lib/actions/payroll/globalMasters/admissionStates.actions';
import LoadingIcon from '@/components/utils/LoadingIcon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createGuidelines, fetchGuidline, modifyGuidelines } from '@/lib/actions/admission/masterSettings/admissionGuidelines.actions';





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


    // Guide lines
    const [guideLines, setGuideLines] = useState('');


    // Years Guidelines
    const [yearsGuidelines, setYearsGuidelines] = useState({});


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Is guideline loading
    const [isGuidlineLoading, setIsGuidelineLoading] = useState(false);


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


    // Guidline save handler
    const guidelineSaveHandler = async () => {
        try {

            // Set is guideline loading to true
            setIsGuidelineLoading(true);


            // Modify guide lines
            await modifyGuidelines({guidelines:guideLines});


            // Toast
            toast({title:'Guidelines saved successfully'});


            // Set is guideline loading to false
            setIsGuidelineLoading(false);

        }catch(err){
            console.log(err);
        };
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
            }else{
                setAdmissionStates(statesRes);
            };

            const guidelinesRes = await fetchGuidline();
            if(guidelinesRes.status === 'failure'){
                await createGuidelines({guidelines:guideLines});
            }else{
                setGuideLines(guidelinesRes.guidelines);
            };
            setIsLoading(false);
        };
        fetcher();
    }, []);

    return (
        <div className='w-[90%] max-h-[90%] max-w-[1000px] flex flex-col items-center gap-10 sm:w-[80%]'>
            {permissions.modify && (
                <>

                    {/* Button */}
                    <span
                        className='flex items-center justify-center min-w-[200px] py-2 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                        onClick={changeAdmissionState}
                    >
                        {isLoading ? (
                            <LoadingIcon />
                        ) : `${admissionStates.is_students_admission_opened ? 'Close' : 'Open'} Students Admission`
                    }
                    </span>


                    {/* Enter Admission Guide Lines */}
                    {admissionStates.is_students_admission_opened && (
                        <div className='w-full flex flex-col items-start gap-4'>
                            <div className='w-full flex flex-col items-start justify-center'>
                                <p className='basis-auto pr-[4px] text-start text-[11px] text-[#726E71] sm:basis-[35%]'>Enter Admission Guide Lines</p>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                    <Textarea
                                        rows={4}
                                        value={guideLines}
                                        onChange={(e:any) => setGuideLines(e.target.value)}
                                        className='flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </div>
                            </div>

                            {isGuidlineLoading ? (
                                <LoadingIcon />
                            ) : (
                                <span
                                    className='flex items-center justify-center min-w-[150px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                                    onClick={guidelineSaveHandler}
                                >
                                    Save
                                </span>
                            )}
                        </div>
                    )}

                </>
            )}

        </div>
    )
}





// Export
export default FormCom;