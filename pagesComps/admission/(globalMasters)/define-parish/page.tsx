'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchParishes} from '@/lib/actions/admission/globalMasters/parish.actions';
import FormCom from '@/components/modules/admission/globalMasters/defineParish/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/defineParish/ViewCom';
import { fetchReligions } from '@/lib/actions/admission/globalMasters/religion.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Parishes
    const [parishes, setParishes] = useState([{}]);

    // Religions
    const [religions, setReligions] = useState([]);

    // Selected Religions
    const [selectedReligions, setSelectedReligions] = useState([]);

    // Update Parishes
    const [updateParish, setUpdateParish] = useState({
        id:'',
        isDeleteClicked:false,
        parish: '',
        religion: []
    });

    
    // Use effect
    useEffect(() => {
        const parishesFetcher = async () => {
            const res = await fetchParishes();
            setParishes(res);
        };
        parishesFetcher();
    }, [isViewOpened, updateParish]);

    // Use Effect For Religions
    useEffect(() => {
        const religionsFetcher = async () => {
            const res = (await fetchReligions()).reduce((acc: any, cur: any) => {
                acc.push(cur.religion_name)
                return acc; 
            },[]);
            setReligions(res);
        };
        religionsFetcher();
    }, [isViewOpened, updateParish]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        parishes={parishes}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateParish={setUpdateParish}
                        selectedReligions={selectedReligions}
                        setSelectedReligions={setSelectedReligions}
                    />
                ) : (
                    <FormCom
                        parishes={parishes}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        religions={religions}
                        selectedReligions={selectedReligions}
                        setSelectedReligions={setSelectedReligions}
                        updateParish={updateParish}
                        setUpdateParish={setUpdateParish}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;