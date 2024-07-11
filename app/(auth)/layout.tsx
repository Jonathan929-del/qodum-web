// Improts
import '../globals.css';
import {Inter} from 'next/font/google';
import {redirect} from 'next/navigation';
import {ClerkProvider, useUser} from '@clerk/nextjs';





// Configs
export const metadata = {
  title:'Qodum',
  description:'School management system | Auth',
};
const inter = Inter({subsets:['latin']});





// Main function
export default async function RootLayout({children}:{children:React.ReactNode}) {


  // User check
  const user = useUser().user;
  if(user) redirect('/');



  return (
    <html lang="en">
      <body className={`${inter.className}`}>
          <ClerkProvider>
            <div className='w-full flex items-center justify-center min-h-screen'>
              {children}
            </div>
          </ClerkProvider>
      </body>
    </html>
  );
};
