// Imports
import moment from 'moment';
import jwt from 'jsonwebtoken';
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








// Moment default year
export const setMomentDefaultYear = (sessionYear:any) => {
  // Update locale for months if necessary (this line can be adjusted as needed)
  moment.updateLocale('en', {
    // @ts-ignore
    months: moment().months()
  });

  // Get the current month and date
  const currentMonth = moment().month();  // 0-based index for months (Jan = 0, Dec = 11)
  const currentDate = moment().date();    // 1-based index for the date (1 = 1st of the month)

  // Create a new moment with the custom year and current month/date
  const customTimestamp = moment()
    .year(sessionYear)   // Set the custom year
    .month(currentMonth) // Keep the current month
    .date(currentDate)   // Keep the current day of the month
    .valueOf();          // Get the timestamp

  // Override moment's 'now' function to use the custom timestamp
  moment.now = function () {
    return customTimestamp;
  };
};





// Sign jwt token
export const signToken = (user:any) => {
  return jwt.sign({
      _id:user._id,
      session:user.session,
      name:user.name,
      user_name:user.user_name,
      password:user.password,
      is_reset_password:user.is_reset_password,
      designation:user.designation,
      email:user.email,
      employee:user.employee,
      mobile:user.mobile,
      profile_picture:user.profile_picture,
      schools:user.schools,
      is_active:user.is_active,
      enable_otp:user.enable_otp,
      permissions:user.permissions
  },
  process.env.JWT_SECRET,
  {
      expiresIn:'30d'
  });
};