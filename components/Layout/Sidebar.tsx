'use client';
// Imports
import ModulesAccordion from '../utils/ModulesAccordion';





// Main function
const Sidebar = ({isSidebarOpened, setIsSidebarOpened}:any) => {
    return (
        <aside
            className={`flex flex-col bg-[#FAFAFA] items-center pt-10 pb-20 transition overflow-scroll custom-sidebar-scrollbar px-4
                        absolute h-[100%] w-full md:left-0 ${isSidebarOpened ? 'left-0' : 'left-[-100%]'} md:relative md:w-auto`}
        >


            {/* Accordion */}
            <ModulesAccordion
                isSidebarOpened={isSidebarOpened}
                setIsSidebarOpened={setIsSidebarOpened}
            />


        </aside>
    );
};





// Export
export default Sidebar;