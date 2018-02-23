Date.daysBetween = function( date1, date2 ) {
    /* returns # of days between two given Date objects
    fractional days are rounded
    */
    var day_one=1000*60*60*24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms/day_one);
}
Date.getJDay = function(date){
    // returns julian day (days since epoch 1970-01-01)
    a = Math.floor((14 - date.getMonth()) / 12)
    y = date.getFullYear() + 4800 - a
    m = date.getMonth() + 12 * a - 3
    return JDN = date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045
}
Date.getJDate = function(date){
    // returns julian day (days since jan 1)
    return Date.daysBetween(new Date(date.getFullYear(), 0, 0), date);
}
Date.prototype.addDays = function(days) {
    // returns new date object given number of days past this date
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}
Date.prototype.isLeapYear = function(){
    // returns true if this year is a leap year
    return new Date(this.getFullYear(), 1, 29).getDate() === 29;
}

let pad = function(integer, padStr){
    // pads an integer with n leading zeros set by pad
    // example usage:
    // pad(23, "000")
    // >>> "023"
    const str = "" + integer  // cast to string
    return padStr.substring(0, padStr.length - str.length) + str;
}

let weekly_mean_formatter = function(strings, the_target_date, long_last_week = true){
    /* tagged template function for getting filenames that look like
     whatever_YYYYDDD_YYYYDDD_whatever from a single target date.
     The time-range here is always 7days except for the last week of the year,
     which is 8d on non leap years and 9d on leap years.

     Example usage for a file like `AQUA_2018043_2018045_7D_chl.png`:
         weekly_mean_formatter`AQUA_${myDateObj}_7D_chl.png`
    */
    const first_weekly_mean = new Date(the_target_date.getFullYear(), 0, 1);
    // This assumes the first 7d period of each year is yyyy-01-01/yyyy-01-07

    const days_since_first_mean = Date.daysBetween(first_weekly_mean, the_target_date);
    // console.log(days_since_first_mean);
    const days_to_mean_start = days_since_first_mean%7;
    let start_date = new Date(the_target_date);
    start_date.setDate(start_date.getDate()-days_to_mean_start);
    const year_0 = start_date.getFullYear();
    const j_day_0 = pad(Date.getJDate(start_date), "000");
    // console.log(start_date + " | " + year_0 + " | " + j_day_0);

    let end_date = new Date(start_date);
    let week_length = 6;
    if (long_last_week && j_day_0 == 358){  // if last week of year
        if (start_date.isLeapYear()) {
            week_length = 8;
        } else {
            week_length = 7;
        }
    }
    end_date.setDate(end_date.getDate() + week_length);
    const year_f = end_date.getFullYear();
    const j_day_f = pad(Date.getJDate(end_date), "000");
    // console.log(end_date + " | " + year_f + " | " + j_day_f);

    return strings[0] + year_0 + j_day_0 + "_" + year_f + j_day_f + strings[1]
}
