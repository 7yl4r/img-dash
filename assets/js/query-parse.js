
// target_date from url else use current date
// get dates for images last n_weeks
const query_array = window.location.search.substring(1).split("=");
// assume query[0] == date
parsed_query = {};
// parsed_query[query_array[0]] = ...
parsed_query.date = query_array[1] ? new Date(query_array[1]) : new Date();

if(parsed_query.date.getMonth() == 11 && parsed_query.date.getDate() > 25){
    // the last remaining days of the year don't fall neatly into a 7d
    // interval, so we roll back to the previous week.
    parsed_query.date = parsed_query.date.addDays(-6);
}
