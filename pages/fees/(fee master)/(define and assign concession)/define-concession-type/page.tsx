'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/fees/feeMaster/defineAndAssignConcession/concessionType/FormCom';
import ViewCom from '@/components/modules/fees/feeMaster/defineAndAssignConcession/concessionType/ViewCom';
import {fetchConcessionsTypes} from '@/lib/actions/fees/feeMaster/defineAndAssignConcession/concessionType.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // States
    const [concessionsTypes, setConcessionsTypes] = useState([{}]);


    // Update concession type
    const [updateConcessionType, setUpdateConcessionType] = useState({
        id:'',
        isDeleteClicked:false,
        print:''
    });

    
    // Use effect
    useEffect(() => {
        const concessionsTypesFetcher = async () => {
            const res = await fetchConcessionsTypes();
            setConcessionsTypes(res);
        };
        concessionsTypesFetcher();
    }, [isViewOpened, updateConcessionType]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        concessionsTypes={concessionsTypes}
                        setUpdateConcessionType={setUpdateConcessionType}
                        setIsViewOpened={setIsViewOpened}
                    />
                ) : (
                    <FormCom
                        concessionsTypes={concessionsTypes}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateConcessionType={updateConcessionType}
                        setUpdateConcessionType={setUpdateConcessionType}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;