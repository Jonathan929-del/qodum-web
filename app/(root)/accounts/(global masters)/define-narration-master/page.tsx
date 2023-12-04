'use client';
// Imports
import {useState} from 'react';
import FormCom from '@/components/modules/accounts/globalMasters/defineNarrationMaster/FormCom';
import ViewCom from '@/components/modules/accounts/globalMasters/defineNarrationMaster/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;