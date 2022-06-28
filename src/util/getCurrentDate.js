import moment from 'jalali-moment';

export default function getCurrentDate(){
    var days = ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'];
    
    var date = moment().locale('fa').format('D MMMM');
    var daw =  days[moment().locale('fa').jDay()];

    return (daw + "  " + date);
}