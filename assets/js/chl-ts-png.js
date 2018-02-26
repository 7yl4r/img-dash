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
        this.insertAdjacentHTML("beforeend",
            `
            ${this.dataset.region}
            <a href=${img_path}>
                <img src=${img_path} alt="[no data]">
            </a>
        `)

        this.src=img_path;

        const element = $(this);  // jquery element object
        element.popup({
            html : `<img src=${img_path} width="${$(document).width()/2}">`,
            exclusive : true,
            variation : "flowing",
            lastResort : "top left",
            // // none of this seems to have any affect:
            // movePopup : false,
            // position : "top left",
            // setFluidWidth : false,
        });
    })
});
