/*
loads chl time series plots for target date.

requires:
    query-parse.js
    utils.js
*/
$(document).ready(function () {
    $('.chl-ts-png').each(function(){
        const filename =
            weekly_mean_formatter(
                [this.dataset.prepath, this.dataset.postpath],
                parsed_query.date,
                false
            );
        let img_path = `http://imars-webserver-01.marine.usf.edu/modis_aqua_fgbnms/${filename}`;
        this.insertAdjacentHTML("beforeend",
            `
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
