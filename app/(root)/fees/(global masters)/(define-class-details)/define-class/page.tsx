'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchWings} from '@/lib/actions/fees/globalMasters/defineClassDetails/wing.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchSchoolsNames} from '@/lib/actions/accounts/masterSettings/changeAcademic.actions';
import FormCom from '@/components/modules/fees/globalMasters/defineClassDetails/defineClass/FormCom';
import ViewCom from '@/components/modules/fees/globalMasters/defineClassDetails/defineClass/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // States
    const [classes, setClasses] = useState([{}]);
    const [wings, setWings] = useState([{}]);
    const [schools, setSchools] = useState([{}]);


    // Update class
    const [updateClass, setUpdateClass] = useState({
        id:'',
        isDeleteClicked:false,
        class_name:'',
        wing_name:'',
        school:'',
        order:0,
    });

    
    // Use effect
    useEffect(() => {
        const classesFetcher = async () => {
            const classesRes = await fetchClasses();
            const wingsRes = await fetchWings();
            const schoolsRes = await fetchSchoolsNames();
            setClasses(classesRes);
            setWings(wingsRes);
            setSchools(schoolsRes);
        };
        classesFetcher();
    }, [isViewOpened, updateClass]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    // <ViewCom
                    //     wings={wings}
                    //     setIsViewOpened={setIsViewOpened}
                    //     setUpdateWing={setUpdateWing}
                    // />
                    ''
                ) : (
                    <FormCom
                        wings={wings}
                        classes={classes}
                        schools={schools}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateClass={updateClass}
                        setUpdateClass={setUpdateClass}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;