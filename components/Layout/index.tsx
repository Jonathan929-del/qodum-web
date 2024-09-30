'use client';
// Imports
import Footer from './Footer';
import Sidebar from './Sidebar';
import Topbar from './Pages/Topbar';
import {Toaster} from '../ui/toaster';
import {useEffect, useState} from 'react';
import PagesList from './Pages/PagesList';
import HomeTopbar from './Home/HomeTopbar';
import {usePathname} from 'next/navigation';
import {fetchActiveFinancialYear} from '@/lib/actions/accounts/globalMasters/defineSession/defineFinancialYear.actions';
import {fetchAcademicYears, modifyAcademicYearWithYearName} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';





// Main function
const index = ({children}:any) => {

    // Sidebar Toggler
    const [isSidebarOpened, setIsSidebarOpened] = useState(false);


    // Pathname
    const pathname = usePathname();


    // Academic Years
    const [academicYears, setAcademicYears] = useState([{}]);


    // Active financial year
    const [activeFinancialYear, setActiveFinancialYear] = useState('');


    // Active academic year
    const [activeAcademicYearName, setActiveAcademicYearName] = useState('');


    // Setting active academic year
    const settingActiveAcademicYear = async (year_name:any) => {
        try {
            await modifyAcademicYearWithYearName({year_name});
            setActiveAcademicYearName(year_name);
        } catch (err) {
            console.log(err);
        }
    };


    // Use effect
    useEffect(() => {
        const academicYearsFetcher = async () => {
            const res = await fetchAcademicYears();
            const activeFinancialYearRes = await fetchActiveFinancialYear();
            setAcademicYears(res);
            setActiveAcademicYearName(res.filter((year:any) => year.is_active)[0]?.year_name || '');
            setActiveFinancialYear(activeFinancialYearRes.year_name);
        };
        academicYearsFetcher();
    }, []);

    return (
        <main className='w-full h-screen flex flex-row bg-[#ecedf0] font-Poppins'>
            <Sidebar
                isSidebarOpened={isSidebarOpened}
                setIsSidebarOpened={setIsSidebarOpened}
            />
            <div className='relative flex flex-col flex-1 overflow-hidden'>
                {
                    pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1) === ''
                    ? (
                        <HomeTopbar
                            isSidebarOpened={isSidebarOpened}
                            setIsSidebarOpened={setIsSidebarOpened}
                        />   
                    )
                    : (
                        <>
                            <Topbar
                                isSidebarOpened={isSidebarOpened}
                                setIsSidebarOpened={setIsSidebarOpened}
                                academicYears={academicYears}
                                settingActiveAcademicYear={settingActiveAcademicYear}
                                activeAcademicYearName={activeAcademicYearName}
                            />
                            <PagesList />
                        </>
                    )
                }
                <div className='flex-1 flex flex-col justify-between overflow-scroll custom-scrollbar'>
                    {children}
                    <Toaster />
                </div>
                <Footer
                    activeAcademicYearName={activeAcademicYearName}
                    activeFinancialYear={activeFinancialYear}
                />
            </div>
        </main>
    );
};





// Export
export default index;