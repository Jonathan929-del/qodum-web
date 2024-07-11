'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/fees/feeMaster/defineAndAssignConcession/concession/FormCom';
import ViewCom from '@/components/modules/fees/feeMaster/defineAndAssignConcession/concession/ViewCom';
import {fetchConcessions} from '@/lib/actions/fees/feeMaster/defineAndAssignConcession/concession.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // States
    const [concessions, setConcessions] = useState([{}]);


    // Update concession
    const [updateConcession, setUpdateConcession] = useState({
        id:'',
        isDeleteClicked:false,
        name:''
    });

    
    // Use effect
    useEffect(() => {
        const concessionsFetcher = async () => {
            const res = await fetchConcessions();
            setConcessions(res);
        };
        concessionsFetcher();
    }, [isViewOpened, updateConcession]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        concessions={concessions}
                        setUpdateConcession={setUpdateConcession}
                        setIsViewOpened={setIsViewOpened}
                    />
                ) : (
                    <FormCom
                        concessions={concessions}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateConcession={updateConcession}
                        setUpdateConcession={setUpdateConcession}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;