'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface CrudButtonsProps {
  mode: 'create' | 'edit';
  permissions: { add: boolean; modify: boolean; delete: boolean; print: boolean; read_only: boolean };
  viewHref: string;
  onSave: () => void;
  onDelete: () => void;
  onCancel: () => void;
  printSlot?: React.ReactNode;
}

const CrudButtons = ({ mode, permissions, viewHref, onSave, onDelete, onCancel, printSlot }: CrudButtonsProps) => (
  <div className='flex flex-row items-center justify-center pb-4 mt-10 gap-2 ml-0'>
    {mode === 'create' ? (
      permissions.add && (
        <Button type='submit' className='px-[8px] h-8 cursor-pointer text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'>
          Save
        </Button>
      )
    ) : (
      <>
        {permissions.modify && (
          <AlertDialog>
            <AlertDialogTrigger className='px-[8px] cursor-pointer h-8 text-xs text-white bg-gradient-to-r from-[#790AE0] to-[#8f3cdd] rounded-full transition border-[1px] border-white hover:border-[#790AE0] hover:from-[#8f3cdd40] hover:to-[#8f3cdd40] hover:text-[#790AE0] sm:text-[16px] sm:px-4'>
              Modify
            </AlertDialogTrigger>
            <AlertDialogContent className='max-w-sm'>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-sm font-semibold text-[#403D3F]'>
                  Are you sure you want to modify this record?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter className='flex-row justify-center gap-2 sm:justify-center'>
                <AlertDialogCancel className='px-4 h-8 text-xs cursor-pointer text-[#726E71] rounded-full bg-transparent hover:bg-[#F0F0F0] transition'>
                  No
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onSave}
                  className='px-4 h-8 text-xs font-medium cursor-pointer text-white rounded-full bg-[#790AE0] hover:bg-[#6408b8] transition'
                >
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        {permissions.delete && (
          <AlertDialog>
            <AlertDialogTrigger className='px-[8px] cursor-pointer h-8 text-xs text-white bg-gradient-to-r from-[#ba2b2b] to-[#b95e5e] rounded-full transition border-[1px] border-white hover:border-[#ba2b2b] hover:from-[#ba2b2b42] hover:to-[#ba2b2b42] hover:text-[#ba2b2b] sm:text-[16px] sm:px-4'>
              Delete
            </AlertDialogTrigger>
            <AlertDialogContent className='max-w-sm'>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-sm font-semibold text-[#403D3F]'>
                  Are you sure you want to delete this record?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter className='flex-row justify-center gap-2 sm:justify-center'>
                <AlertDialogCancel className='px-4 h-8 text-xs cursor-pointer text-[#726E71] rounded-full bg-transparent hover:bg-[#F0F0F0] transition'>
                  No
                </AlertDialogCancel>
                {/* Direct call — no longer piggybacks on form validation */}
                <AlertDialogAction
                  onClick={onDelete}
                  className='px-4 h-8 text-xs cursor-pointer font-medium text-white rounded-full bg-[#ba2b2b] hover:bg-[#9c2323] transition'
                >
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </>
    )}

    {permissions.read_only && (
      <Link href={viewHref} className='flex items-center px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#51B272] to-[#94E7B1] rounded-full transition border-[1px] border-white cursor-pointer hover:border-[#51B272] hover:from-[#5cbb7d21] hover:to-[#5cbb7d21] hover:text-[#51B272] sm:text-[16px] sm:px-4'>
        View
      </Link>
    )}

    {permissions.read_only && permissions.print && printSlot}

    <span
      className='flex items-center px-[8px] h-8 text-xs text-black bg-gradient-to-r from-[#C7C8CA] to-[#EAEDF0] rounded-full transition border-[1px] border-white cursor-pointer hover:border-[#a3a3a3] hover:from-[#c8c9cb26] hover:to-[#c8c9cb26] hover:text-hash-color sm:text-[16px] sm:px-4'
      onClick={onCancel}
    >
      Cancel
    </span>
  </div>
);

export default CrudButtons;