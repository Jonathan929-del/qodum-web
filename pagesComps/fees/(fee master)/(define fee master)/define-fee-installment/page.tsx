'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import FormCom from '@/components/modules/fees/feeMaster/defineFeeMaster/installment/FormCom';
import ViewCom from '@/components/modules/fees/feeMaster/defineFeeMaster/installment/ViewCom';
import ChooseTemplate from '@/components/modules/fees/feeMaster/defineFeeMaster/installment/ChooseTemplate';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Is templates opened
    const [isTemplatesOpened, setIsTemplatesOpened] = useState(false);


    // States
    const [installments, setInstallments] = useState([{}]);


    // Update installment
    const [updateInstallment, setUpdateInstallment] = useState({
        id:'',
        isDeleteClicked:false,
        name:'',
        print_name:'',
        preference_no:'',
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


    // Selected months
    const [selectedMonths, setSelectedMonths] = useState([]);


    // Use effect
    useEffect(() => {
        const installmentsFetcher = async () => {
            const res = await fetchInstallments();
            setInstallments(res);
            if(res.length === 0){
                setIsTemplatesOpened(true);
            };
        };
        installmentsFetcher();
    }, [isViewOpened, updateInstallment]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isTemplatesOpened ? (
                    <ChooseTemplate setIsTemplatesOpened={setIsTemplatesOpened}/>
                ) : isViewOpened ? (
                    <ViewCom
                        installments={installments}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateInstallment={setUpdateInstallment}
                        setSelectedMonths={setSelectedMonths}
                        />
                ) : (
                    <FormCom
                        installments={installments}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateInstallment={updateInstallment}
                        setUpdateInstallment={setUpdateInstallment}
                        selectedMonths={selectedMonths}
                        setSelectedMonths={setSelectedMonths}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;