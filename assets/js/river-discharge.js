/*
loads river discharge plots for target date.

requires:
    query-parse.js
    utils.js
*/
$(document).ready(function () {
    $('.river-discharge-png').each(function(){
        // TODO: get "Trinity" from http data attribute "this.data-river"
        const filename = weekly_mean_formatter`TrinityRv_${parsed_query.date}_Discharge.jpg${false}`;
        let img_path = `http://imars-webserver-01.marine.usf.edu/modis_aqua_fgbnms/png_disch_7d/${filename}`;
        this.src=img_path;
    });
});
