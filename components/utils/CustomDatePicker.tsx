// Imports
import moment from 'moment';
import 'moment/locale/en-gb'; 
import './CustomDatePickerStyles.css';
// import DatePicker from 'react-datepicker2';





// Main function
const MyDatePicker = ({selectedDate, setSelectedDate}) => {

  // Setting moment local to english
  moment.locale('en-gb');

  return (
    // <DatePicker
    //   value={selectedDate}
    //   onChange={(date) => setSelectedDate(date)}
    //   timePicker={false}
    //   // @ts-ignore
    //   dateFormat="MMMM YYYY"
    // />
    <div>Date</div>
  );
};





export default MyDatePicker;
