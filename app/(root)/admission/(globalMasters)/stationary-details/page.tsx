// 'use client';
// // Imports
// import {useEffect, useState} from 'react';
// import {fetchStationaryDetails} from '@/lib/actions/admission/globalMasters/stationaryDetails.actions';
// import FormCom from '@/components/modules/admission/globalMasters/stationaryDetails/FormCom';
// import ViewCom from '@/components/modules/admission/globalMasters/stationaryDetails/ViewCom';





// // Main function
// const page = () => {


//     // Is view component opened
//     const [isViewOpened, setIsViewOpened] = useState(false);


//     // Stationary Details
//     const [stationaryDetails, setStationaryDetails] = useState([{}]);


//     // Update StationaryDetail
//     const [updateStationaryDetail, setUpdateStationaryDetail] = useState({
//         id:'',
//         isDeleteClicked:false,
//         stationary_name:'',
//         amount: '',
//         post_account_name: '',
//         school_name: '',
//         session:''
//     });

    
//     // Use effect
//     useEffect(() => {
//         const stationaryDetailsFetcher = async () => {
//             const res = await fetchStationaryDetails();
//             setStationaryDetails(res);
//         };
//         stationaryDetailsFetcher();
//     }, [isViewOpened, updateStationaryDetail]);


//     return (
//         <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
//             {
//                 isViewOpened ? (
//                     <ViewCom
//                         stationaryDetails={stationaryDetails}
//                         setIsViewOpened={setIsViewOpened}
//                         setUpdateStationaryDetail={setUpdateStationaryDetail}
//                     />
//                 ) : (
//                     <FormCom
//                         stationaryDetails={stationaryDetails}
//                         isViewOpened={isViewOpened}
//                         setIsViewOpened={setIsViewOpened}
//                         updateStationaryDetail={updateStationaryDetail}
//                         setUpdateStationaryDetail={setUpdateStationaryDetail}
//                     />
//                 )
//             }
//         </div>
//     );
// };





// // Export
// export default page;