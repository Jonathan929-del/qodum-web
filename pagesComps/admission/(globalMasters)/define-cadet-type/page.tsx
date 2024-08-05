'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchCadetTypes} from '@/lib/actions/admission/globalMasters/cadetType.actions';
import FormCom from '@/components/modules/admission/globalMasters/defineCadetType/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/defineCadetType/ViewCom';





// Main function
const index = () => {

    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Cadet types
    const [cadetTypes, setCadetTypes] = useState([{}]);


    // Update cadet type
    const [updateCadetType, setUpdateCadetType] = useState({
        id:'',
        isDeleteClicked:false,
        name:''
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchCadetTypes();
            setCadetTypes(res);
        };
        fetcher();
    }, [isViewOpened, setUpdateCadetType]);

    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        cadetTypes={cadetTypes}
                        setUpdateCadetType={setUpdateCadetType}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        cadetTypes={cadetTypes}
                        updateCadetType={updateCadetType}
                        setUpdateCadetType={setUpdateCadetType}
                    />
                )
            }
        </div>
    );
};





// Export
export default index;