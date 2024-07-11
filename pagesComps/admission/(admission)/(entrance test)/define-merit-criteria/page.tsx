'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/admission/admission/entranceTest/meritCriteria/FormCom';
import ViewCom from '@/components/modules/admission/admission/entranceTest/meritCriteria/ViewCom';
import {fetchMeritCriterias} from '@/lib/actions/admission/admission/entranceTest/meritCriteria.actions';
import {fetchAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Sessions
    const [sessions, setSessions] = useState([{}]);


    // Merit criteria
    const [meritCriterias, setMeritCriterias] = useState([{}]);


    // Update merit criteria
    const [updateMeritCriteria, setUpdateMeritCriteria] = useState({
        id:'',
        isDeleteClicked:false,
        session:'',
        name:'',
        maximum_point:0
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const meritCriteriasRes = await fetchMeritCriterias();
            const sessionsRes = await fetchAcademicYears();
            setMeritCriterias(meritCriteriasRes);
            setSessions(sessionsRes);
        };
        fetcher();
    }, [isViewOpened, updateMeritCriteria]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        meritCriterias={meritCriterias}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateMeritCriteria={setUpdateMeritCriteria}
                    />
                ) : (
                    <FormCom
                        sessions={sessions}
                        meritCriterias={meritCriterias}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateMeritCriteria={updateMeritCriteria}
                        setUpdateMeritCriteria={setUpdateMeritCriteria}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;