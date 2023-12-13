// Imports
import {twMerge} from 'tailwind-merge';
import {type ClassValue, clsx} from 'clsx';





// Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};





// Deep equal
export const deepEqual:any = (x:any, y:any) => {
  const ok = Object.keys, tx = typeof x, ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length &&
      ok(x).every(key => deepEqual(x[key], y[key]))
  ) : (x === y);
};