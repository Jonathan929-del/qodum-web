// Imports
import {currentUser} from '@clerk/nextjs';





// Main function
const Home = async () => {

  
  const user = await currentUser();


  return (
    <>
      <div>Hello</div>
    </>
  );
};





// Export
export default Home;