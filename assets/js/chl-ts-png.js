/*
loads chl time series plots for target date.

requires:
    query-parse.js
    utils.js
*/
$(document).ready(function () {
    $('.chl-ts-png').each(function(){
        const filename = this.dataset.region +
            weekly_mean_formatter`_${parsed_query.date}_CHL.jpg${false}`;
        let img_path = `http://imars-webserver-01.marine.usf.edu/modis_aqua_fgbnms/png_chl_ts_7d/${filename}`;
        this.src=img_path;
    });
});
