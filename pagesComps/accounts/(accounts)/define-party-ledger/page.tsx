'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/accounts/accounts/partyLedger/FormCom';
import ViewCom from '@/components/modules/accounts/accounts/partyLedger/ViewCom';
import {fetchPartyLedgers} from '@/lib/actions/accounts/accounts/partyLedger.actions';
import {fetchAccountGroups} from '@/lib/actions/accounts/accounts/accountGroup.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Party Ledgers
    const [partyLedgers, setPartyLedgers] = useState([{}]);


    // Account Groups
    const [accountGroups, setAccountGroups] = useState([{}]);


    // Update Party Ledger
    const [updatePartyLedger, setUpdatePartyLedger] = useState({
        id:'',
        isDeleteClicked:false,
        account_name:'',
        account_no:'',
        cin_no:'',
        group:'',
        account_type:'',
        account_address:'',
        account_city:'',
        pin_code:null,
        email:'',
        mobile:null,
        pan:'',
        gstin:'',
        opening_balance:null,
        opening_balance_type:'Debit',
        assign_date:new Date()
    });

    
    // Use effect
    useEffect(() => {
        const partyLedgersFetcher = async () => {
            const partyLedgerRes = await fetchPartyLedgers();
            const accountGroupRes = await fetchAccountGroups();
            setPartyLedgers(partyLedgerRes);
            setAccountGroups(accountGroupRes.filter(group => group.category === 'Party'));
        };
        partyLedgersFetcher();
    }, [isViewOpened, updatePartyLedger]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        partyLedgers={partyLedgers}
                        setIsViewOpened={setIsViewOpened}
                        setUpdatePartyLedger={setUpdatePartyLedger}
                    />
                ) : (
                    <FormCom
                        partyLedgers={partyLedgers}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updatePartyLedger={updatePartyLedger}
                        setUpdatePartyLedger={setUpdatePartyLedger}
                        accountGroups={accountGroups}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;