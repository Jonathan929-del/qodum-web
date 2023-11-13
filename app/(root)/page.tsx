// Imports
import Footer from '@/components/Footer';
import Topbar from '@/components/Topbar';
import Sidebar from '@/components/Sidebar';
import Modules from '@/components/Modules';
import Greetings from '@/components/Greetings';





// Main function
const Home = async () => {
  return (
    <main className='w-full flex flex-row bg-[#F1F1F4] h-screen'>
      <Sidebar />
      <div className='flex-1 overflow-scroll custom-scrollbar'>
        <div className='flex-1 px-10 overflow-scroll custom-scrollbar pb-12'>
          <Topbar />
          <Greetings />
          <Modules />
        </div>
        <Footer />
      </div>
    </main>
  );
};





// Export
export default Home;