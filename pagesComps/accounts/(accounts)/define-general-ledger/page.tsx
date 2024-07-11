'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/accounts/accounts/generalLedger/FormCom';
import ViewCom from '@/components/modules/accounts/accounts/generalLedger/ViewCom';
import {fetchAccountGroups} from '@/lib/actions/accounts/accounts/accountGroup.actions';
import {fetchGeneralLedgers} from '@/lib/actions/accounts/accounts/generalLedger.actions';





// Main function
const page = () => {

    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // General Ledgers
    const [generalLedgers, setGeneralLedgers] = useState([{}]);


    // Account Groups
    const [accountGroups, setAccountGroups] = useState([{}]);


    // Update General Ledger
    const [updateGeneralLedger, setUpdateGeneralLedger] = useState({
        id:'',
        isDeleteClicked:false,
        account_name:'',
        group:'',
        account_type:'',
        opening_balance:'',
        opening_balance_type:'Debit',
        assign_date:new Date(),
        is_cash_book:false,
        is_fixed_asset:false,
        depreciation:''
    });

    
    // Use effect
    useEffect(() => {
        const generalLedgersFetcher = async () => {
            const generalLedgerRes = await fetchGeneralLedgers();
            const accountGroupRes = await fetchAccountGroups();
            setGeneralLedgers(generalLedgerRes);
            setAccountGroups(accountGroupRes.filter(group => group.category === 'General'));
        };
        generalLedgersFetcher();
    }, [isViewOpened, updateGeneralLedger]);

    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        generalLedgers={generalLedgers}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateGeneralLedger={setUpdateGeneralLedger}
                    />
                ) : (
                    <FormCom
                        generalLedgers={generalLedgers}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateGeneralLedger={updateGeneralLedger}
                        setUpdateGeneralLedger={setUpdateGeneralLedger}
                        accountGroups={accountGroups}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;