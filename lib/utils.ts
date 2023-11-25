// Imports
import {twMerge} from 'tailwind-merge';
import {type ClassValue, clsx} from 'clsx';





// Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};