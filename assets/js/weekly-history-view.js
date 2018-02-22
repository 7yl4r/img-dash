/*
sets up weekly history view.

requires:
    query-parse.js
    utils.js
*/

const target_date = parsed_query.date;

const n_weeks           = 4;
const target_element_id = "weekly-history-view";

const target_element = document.getElementById(target_element_id);

let weeks = [];
for(let week = 0; week < n_weeks; week++){
    let n_week = new Date(target_date.getFullYear(), target_date.getMonth(), target_date.getDate());
    n_week.setDate(n_week.getDate() - 7*week);
    weeks.push(n_week);
}
weeks = weeks.reverse();
// console.log(weeks);

weeks.forEach(function(week_date, week_n){  // for each week
    const filename = weekly_mean_formatter`FGB_A1km_chlor_a_${week_date}_7D_MEAN.jpg`
    let img_path = `http://imars-webserver-01.marine.usf.edu/modis_aqua_fgbnms/png_chl_7d/${filename}`;
    // append <img> elements with src
    const weeks_ago = n_weeks - week_n - 1;
    target_element.insertAdjacentHTML(
        'beforeend',
        (`
            <div class="four wide column">
                -${weeks_ago} week(s) <br>
                <img src=${img_path} class="centered">
            </div>
        `)
    );
});
