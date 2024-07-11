'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchStreams} from '@/lib/actions/admission/globalMasters/stream.actions';
import FormCom from '@/components/modules/admission/globalMasters/defineStream/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/defineStream/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Streams
    const [streams, setStreams] = useState([{}]);


    // Update stream
    const [updateStream, setUpdateStream] = useState({
        id:'',
        isDeleteClicked:false,
        stream_name:'',
    });

    
    // Use effect
    useEffect(() => {
        const streamsFetcher = async () => {
            const res = await fetchStreams();
            setStreams(res);
        };
        streamsFetcher();
    }, [isViewOpened, updateStream]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        streams={streams}
                        setUpdateStream={setUpdateStream}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        streams={streams}
                        updateStream={updateStream}
                        setUpdateStream={setUpdateStream}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;