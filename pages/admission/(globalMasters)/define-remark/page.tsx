'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchRemarks} from '@/lib/actions/admission/globalMasters/remark.actions';
import FormCom from '@/components/modules/admission/globalMasters/defineRemark/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/defineRemark/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Remarks
    const [remarks, setRemarks] = useState([{}]);


    // Update remark
    const [updateRemark, setUpdateRemark] = useState({
        id:'',
        isDeleteClicked:false,
        remark:'',
    });

    
    // Use effect
    useEffect(() => {
        const remarksFetcher = async () => {
            const res = await fetchRemarks();
            setRemarks(res);
        };
        remarksFetcher();
    }, [isViewOpened, updateRemark]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        remarks={remarks}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateRemark={setUpdateRemark}
                    />
                ) : (
                    <FormCom
                        remarks={remarks}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateRemark={updateRemark}
                        setUpdateRemark={setUpdateRemark}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;