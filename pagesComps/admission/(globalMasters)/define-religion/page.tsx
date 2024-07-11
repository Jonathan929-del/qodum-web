'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchReligions} from '@/lib/actions/admission/globalMasters/religion.actions';
import FormCom from '@/components/modules/admission/globalMasters/defineReligion/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/defineReligion/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Religions
    const [religions, setReligions] = useState([{}]);


    // Update religion
    const [updateReligion, setUpdateReligion] = useState({
        id:'',
        isDeleteClicked:false,
        religion_name:''
    });

    
    // Use effect
    useEffect(() => {
        const religionsFetcher = async () => {
            const res = await fetchReligions();
            setReligions(res);
        };
        religionsFetcher();
    }, [isViewOpened, setUpdateReligion]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        religions={religions}
                        setUpdateReligion={setUpdateReligion}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        religions={religions}
                        updateReligion={updateReligion}
                        setUpdateReligion={setUpdateReligion}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;