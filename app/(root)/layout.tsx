// Improts
import '../globals.css';
import React from 'react';
import type {Metadata} from 'next';
import {ClerkProvider} from '@clerk/nextjs';





// Metadata
export const metadata: Metadata = {
  title:'Qodum',
  description:'School management system',
};





// Main function
export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="en">
      <body>
          <ClerkProvider>
            {children}
          </ClerkProvider>
      </body>
    </html>
  );
};
