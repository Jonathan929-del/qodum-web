'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchHouses} from '@/lib/actions/admission/globalMasters/house.actions';
import FormCom from '@/components/modules/admission/globalMasters/defineHouse/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/defineHouse/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Houses
    const [houses, setHouses] = useState([{}]);


    // Update House
    const [updateHouse, setUpdateHouse] = useState({
        id:'',
        isDeleteClicked:false,
        house_name:'',
    });

    
    // Use effect
    useEffect(() => {
        const housesFetcher = async () => {
            const res = await fetchHouses();
            setHouses(res);
        };
        housesFetcher();
    }, [isViewOpened, updateHouse]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        houses={houses}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateHouse={setUpdateHouse}
                    />
                ) : (
                    <FormCom
                        houses={houses}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateHouse={updateHouse}
                        setUpdateHouse={setUpdateHouse}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;