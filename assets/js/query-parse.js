
// target_date from url else use current date
// get dates for images last n_weeks
const query_array = window.location.search.substring(1).split("=");
// assume query[0] == date
parsed_query = {};
// parsed_query[query_array[0]] = ...
parsed_query.date = query_array[1] ? new Date(query_array[1]) : new Date();
