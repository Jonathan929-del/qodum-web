'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchJobs} from '@/lib/actions/payroll/globalMasters/job.actions';
import FormCom from '@/components/modules/payroll/globalMasters/currentJobOpening/FormCom';
import ViewCom from '@/components/modules/payroll/globalMasters/currentJobOpening/ViewCom';





// Main function
const page = () => {

    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Jobs
    const [jobs, setJobs] = useState([{}]);


    // Update job
    const [updateJob, setUpdateJob] = useState({
        id:'',
        isDeleteClicked:false,

        post:'',
        salary:'',
        experience:'',
        description:'',
        key_skill:'',
        last_date_of_submission:new Date()
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchJobs();
            setJobs(res);
        };
        fetcher();
    }, [isViewOpened, updateJob]);

    return (
        <div className='h-full flex flex-col items-center justify-start pt-10. bg-white overflow-y-scroll custom-sidebar-scrollbar'>
            {
                isViewOpened ? (
                    <ViewCom
                        jobs={jobs}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateJob={setUpdateJob}
                    />
                ) : (
                    <FormCom
                        jobs={jobs}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateJob={updateJob}
                        setUpdateJob={setUpdateJob}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;