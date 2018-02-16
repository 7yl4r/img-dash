const n_weeks           = 4;
const target_element_id = "weekly-history-view";
const path_format_str   = 
const img_element_template = "<img src=''

const target_element = document.getElementById(target_element_id);

# get dates for images last n_weeks
const now = new Date();
const this_week = new Date(now.getFullYear(), now.getMonth(), now.getDate()-now.getDay());  # TODO: Sunday?
let weeks = [];
weeks.push(this_week);

for(let week = 1; week < n_weeks; i++){
    weeks.push(new Date(this_week.getFullYear(), this_week.getMonth(), this_week.getDay - 7*week));
}

weeks.foreach(week_date, week_n){  # for each week
    # get filename
    let img_path = `/srv/imars-objects/fgbnms_png_chlor_a_weekly/${week_date.getDay()}.png`;  # TODO: file fmt str
    # append <img> elements with src
    target_element.append(`
        <div class="three wide column">
            -${week_n} week(s)
            <img src=${img_path} class="centered">`
        </div>
    `)
}

