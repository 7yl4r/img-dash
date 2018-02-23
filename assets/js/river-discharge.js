/*
loads river discharge plots for target date.

requires:
    query-parse.js
    utils.js
*/
$(document).ready(function () {
    $('.river-discharge-png').each(function(){
        const filename = this.dataset.river +
            weekly_mean_formatter`_${parsed_query.date}_Discharge.jpg${false}`;
        let img_path = `http://imars-webserver-01.marine.usf.edu/modis_aqua_fgbnms/png_disch_7d/${filename}`;
        this.src=img_path;
    });
});
