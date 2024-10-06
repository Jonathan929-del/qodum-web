// Improts
import '../globals.css';
import {DM_Sans} from 'next/font/google';
import {Toaster} from '@/components/ui/toaster';
import {AuthProvider} from '@/context/AuthContext';





// Configs
export const metadata = {
  title:'Qodum',
  description:'School management system | Auth',
};
const dmSans = DM_Sans({
  subsets: ['latin'],  // Choose your font's subsets
  weight: ['400', '500', '700'],  // Specify weights
});





// Main function
export default async function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={`${dmSans.className}`}>
        <AuthProvider>
          <div className='w-full flex items-center justify-center min-h-screen'>
            {children}
            <Toaster />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
};
