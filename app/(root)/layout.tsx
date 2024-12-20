// Imports
import '../globals.css';
import type {Metadata} from 'next';
// @ts-ignore
import {ABeeZee} from 'next/font/google';
import Layout from '@/components/Layout/index';
import {AuthProvider} from '@/context/AuthContext';
import {GlobalStateProvider} from '@/context/GlobalStateContext';





// Configs
export const metadata: Metadata = {
  title:'Qodum',
  description:'School management system',
};
const ABZ = ABeeZee({
  subsets: ['latin'],
  weight: ['400']
});





// Main function
export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={`${ABZ.className}`}>
          <AuthProvider>
            <GlobalStateProvider>
              <Layout children={children} />
            </GlobalStateProvider>
          </AuthProvider>
      </body>
    </html>
  );
};