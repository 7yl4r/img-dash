/*
loads time series plots for target date.

requires:
    query-parse.js
    utils.js
*/
$(document).ready(function () {
    $('.timeseries-png').each(function(){
        const img_path = this.dataset.path;
        this.insertAdjacentHTML("beforeend",
            `
            <a href=${img_path}>
                <img src=${img_path} alt="[no data]">
            </a>
        `)

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
