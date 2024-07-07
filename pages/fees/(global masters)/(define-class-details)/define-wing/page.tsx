'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchWings} from '@/lib/actions/fees/globalMasters/defineClassDetails/wing.actions';
import FormCom from '@/components/modules/fees/globalMasters/defineClassDetails/defineWing/FormCom';
import ViewCom from '@/components/modules/fees/globalMasters/defineClassDetails/defineWing/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // wings
    const [wings, setWings] = useState([{}]);


    // Update wing
    const [updateWing, setUpdateWing] = useState({
        id:'',
        isDeleteClicked:false,
        wing:'',
    });

    
    // Use effect
    useEffect(() => {
        const wingsFetcher = async () => {
            const res = await fetchWings();
            setWings(res);
        };
        wingsFetcher();
    }, [isViewOpened, updateWing]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        wings={wings}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateWing={setUpdateWing}
                    />
                ) : (
                    <FormCom
                        wings={wings}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateWing={updateWing}
                        setUpdateWing={setUpdateWing}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;