$("#prev-btn").attr('href', "?date="+parsed_query.date.addDays(-7).toISOString());
$("#next-btn").attr('href', "?date="+parsed_query.date.addDays(7).toISOString());
