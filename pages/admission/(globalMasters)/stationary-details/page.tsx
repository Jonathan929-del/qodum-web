'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchGeneralLedgers} from '@/lib/actions/accounts/accounts/generalLedger.actions';
import FormCom from '@/components/modules/admission/globalMasters/stationaryDetails/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/stationaryDetails/ViewCom';
import {fetchStationaryDetails} from '@/lib/actions/admission/globalMasters/stationaryDetails.actions';
import {fetchAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';
import {fetchGlobalSchoolDetails} from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Stationary Details
    const [stationaryDetails, setStationaryDetails] = useState([{}]);


    // Genral ledgers
    const [generalLedgers, setGeneralLedgers] = useState([{}]);


    // Schools
    const [schools, setSchools] = useState([{}]);

    
    // Sessions
    const [sessions, setSessions] = useState([{}]);


    // Update StationaryDetail
    const [updateStationaryDetails, setUpdateStationaryDetails] = useState({
        id:'',
        isDeleteClicked:false,
        stationary_name:'',
        amount: '',
        account_name: '',
        school_name: '',
        session:'',
        is_online:false
    });

    
    // Use effect
    useEffect(() => {
        const stationaryDetailsFetcher = async () => {
            const stationaryRes = await fetchStationaryDetails();
            const generalLedgersRes = await fetchGeneralLedgers();
            const schoolsRes = await fetchGlobalSchoolDetails();
            const sessionsRes = await fetchAcademicYears();
            setStationaryDetails(stationaryRes);
            setGeneralLedgers(generalLedgersRes);
            setSchools(schoolsRes);
            setSessions(sessionsRes);
        };
        stationaryDetailsFetcher();
    }, [isViewOpened, updateStationaryDetails]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        stationaryDetails={stationaryDetails}
                        setUpdateStationaryDetails={setUpdateStationaryDetails}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        generalLedgers={generalLedgers}
                        schools={schools}
                        sessions={sessions}
                        stationaryDetails={stationaryDetails}
                        updateStationaryDetails={updateStationaryDetails}
                        setUpdateStationaryDetails={setUpdateStationaryDetails}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;
