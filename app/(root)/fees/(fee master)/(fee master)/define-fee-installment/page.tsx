'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/fees/feeMaster/feeMaster/installment/FormCom';
import ViewCom from '@/components/modules/fees/feeMaster/feeMaster/installment/ViewCom';
import {fetchInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/Installment.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // States
    const [installments, setInstallments] = useState([{}]);


    // Update installment
    const [updateInstallment, setUpdateInstallment] = useState({
        id:'',
        isDeleteClicked:false,
        name:'',
        print_name:'',
        due_on_date:{
            day:'',
            month:'',
            year:''
        },
        due_date:{
            day:'',
            month:'',
            year:''
        },
        months:[]
    });


    // Use effect
    useEffect(() => {
        const installmentsFetcher = async () => {
            const res = await fetchInstallments();
            setInstallments(res);
        };
        installmentsFetcher();
    }, [isViewOpened, updateInstallment]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    // <ViewCom
                    //     classes={classes}
                    //     setIsViewOpened={setIsViewOpened}
                    //     setUpdateClass={setUpdateClass}
                    // />
                    ''
                ) : (
                    <FormCom
                        installments={installments}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateInstallment={updateInstallment}
                        setUpdateInstallment={setUpdateInstallment}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;