const n_weeks           = 4;
const target_element_id = "weekly-history-view";

const target_element = document.getElementById(target_element_id);

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

let pad = function(integer, padStr){
    // pads an integer with n leading zeros set by pad
    // example usage:
    // pad(23, "000")
    // >>> "023"
    const str = "" + integer  // cast to string
    return padStr.substring(0, padStr.length - str.length) + str;
}

// target_date from url else use current date
// get dates for images last n_weeks
const query = window.location.search.substring(1).split("=");
// assume query[0] == date
const target_date = query[1] ? new Date(query[1]) : new Date();
// This date should be first images from aqua + 7d.
// I think this is *before* that, but that is okay as long as the 7d cycle
// aligns.
const first_weekly_mean = new Date(target_date.getFullYear(), 0, 1);

let weeks = [];

for(let week = 0; week < n_weeks; week++){
    let n_week = new Date(target_date.getFullYear(), target_date.getMonth(), target_date.getDate());
    n_week.setDate(n_week.getDate() - 7*week);
    weeks.push(n_week);
}
weeks = weeks.reverse();
// console.log(weeks);

weeks.forEach(function(week_date, week_n){  // for each week
    // === get filename
    const days_since_first_mean = Date.daysBetween(first_weekly_mean, week_date);
    // console.log(days_since_first_mean);
    const days_to_mean_start = days_since_first_mean%7;
    let start_date = new Date(week_date);
    start_date.setDate(start_date.getDate()-days_to_mean_start);
    // week_date is now the starting datetime
    const year_0 = start_date.getFullYear();
    const j_day_0 = pad(Date.getJDate(start_date), "000");
    // console.log(start_date + " | " + year_0 + " | " + j_day_0);

    let end_date = new Date(start_date);
    end_date.setDate(end_date.getDate()+6);
    // week_date is now end datetime
    const year_f = end_date.getFullYear();
    const j_day_f = pad(Date.getJDate(end_date), "000");
    // console.log(end_date + " | " + year_f + " | " + j_day_f);

    const filename = `AQUA_${year_0}${j_day_0}_${year_f}${j_day_f}_7D_gcoos_chlor_a.png`
    let img_path = `http://imars-webserver-01.marine.usf.edu/fgbnms_png_chlor_a_7d/${filename}`;
    // append <img> elements with src
    const weeks_ago = n_weeks - week_n - 1;
    target_element.insertAdjacentHTML(
        'beforeend',
        (`
            <div class="three wide column">
                -${weeks_ago} week(s) <br>
                ${start_date.toDateString()} / ${end_date.toDateString()} <br>
                <img src=${img_path} class="centered">
            </div>
        `)
    );
});
