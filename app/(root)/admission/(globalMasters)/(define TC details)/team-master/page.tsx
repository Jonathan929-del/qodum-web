// 'use client';
// // Imports
// import {useEffect, useState} from 'react';
// import {fetchRemarks} from '@/lib/actions/admission/globalMasters/remark.actions';
// import FormCom from '@/components/modules/admission/globalMasters/defineTcDetails/termMaster/FormCom';
// import ViewCom from '@/components/modules/admission/globalMasters/defineTcDetails/termMaster/ViewCom';





// // Main function
// const page = () => {


//     // Is view component opened
//     const [isViewOpened, setIsViewOpened] = useState(false);


//     // Term Master
//     const [termMasters, setTermMasters] = useState([{}]);


//     // Update Term Master
//     const [updateTermMaster, setUpdateTermMaster] = useState({
//         id:'',
//         isDeleteClicked:false,
//         name:'',
//     });

    
//     // Use effect
//     useEffect(() => {
//         const termMasterFetcher = async () => {
//             const res = await fetchTermMaster();
//             setTermMasters(res);
//         };
//         termMasterFetcher();
//     }, [isViewOpened, updateRemark]);


//     return (
//         <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
//             {
//                 isViewOpened ? (
//                     <ViewCom
//                         termMaster={termMasters}
//                         setIsViewOpened={setIsViewOpened}
//                         setUpdateTermMaster={setUpdateTermMaster}
//                     />
//                 ) : (
//                     <FormCom
//                         termMaster={termMasters}
//                         isViewOpened={isViewOpened}
//                         setIsViewOpened={setIsViewOpened}
//                         updateTermMaster={updateTermMaster}
//                         setUpdateTermMaster={setUpdateTermMaster}
//                     />
//                 )
//             }
//         </div>
//     );
// };





// // Export
// export default page;