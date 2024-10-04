// Imports
import Search from './Search';
import PaymentsList from './PaymentsList';
import { AuthContext } from '@/context/AuthContext';
import {useContext, useEffect, useState} from 'react';





// Main function
const index = ({sections, classes, payments, totalNumberGenerator, setReceiptPaymentData, setIsReceiptOpened}:any) => {

    // User
    const {user} = useContext(AuthContext);


    // Permissions
    const [permissions, setPermissions] = useState({
        add:false,
        modify:false,
        delete:false,
        print:false,
        read_only:false
    });


    // Use effect
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Fees')?.permissions?.find((pp:any) => pp.sub_menu === 'Print Fee Receipt & Certificate');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className='w-[70%] min-w-[400px] flex flex-col justify-between px-2'>


            {permissions.read_only && (
                <>

                    {/* Search */}
                    <Search
                        classes={classes}
                        sections={sections}
                    />


                    {/* Payments List */}
                    <PaymentsList
                        payments={payments}
                        totalNumberGenerator={totalNumberGenerator}
                        setReceiptPaymentData={setReceiptPaymentData}
                        setIsReceiptOpened={setIsReceiptOpened}
                    />

                </>
            )}




        </div>
    );
};





// Export
export default index;