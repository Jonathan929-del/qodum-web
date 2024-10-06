// Imports
import '../globals.css';
import type {Metadata} from 'next';
import {DM_Sans} from 'next/font/google';
import Layout from '@/components/Layout/index';
import {AuthProvider} from '@/context/AuthContext';
import {GlobalStateProvider} from '@/context/GlobalStateContext';





// Configs
export const metadata: Metadata = {
  title:'Qodum',
  description:'School management system',
};
const dmSans = DM_Sans({
  subsets: ['latin'],  // Choose your font's subsets
  weight: ['400', '500', '700'],  // Specify weights
});





// Main function
export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={`${dmSans.className}`}>
          <AuthProvider>
            <GlobalStateProvider>
              <Layout children={children} />
            </GlobalStateProvider>
          </AuthProvider>
      </body>
    </html>
  );
};