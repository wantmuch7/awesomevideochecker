(function () {
    function start() {
        var applinkOpen = '', apiLinkIndex = '';
        chrome.storage.local.get(['api'], function (result) {
            var applinkOpen = 'http://' + result.api + '/open.php?code=';
            var apiLinkIndex = 'http://' + result.api + '/index.php?code=';


            if (location.hostname == 'jmvbt.com') {
                var awesomeCode = jQuery(".infobox a").html()
                if (awesomeCode != "") {
                    jQuery("#info")
                        .append(
                            '<div class="infobox">'
                            +
                            '<iframe src="' + applinkOpen + awesomeCode + '" title="awesome video checker" scrolling="no" frameborder="0" border="0" cellspacing="0" style="float:left;overflow:hidden;border:none" width="180" height="50"></iframe>'
                            +
                            '</div>'
                        );
                    if (jQuery(".dht_dl_area .dht_dl_title_content a").length > 0) {
                        let count = 0;
                        jQuery(".dht_dl_area .dht_dl_title_content a").each(function () {
                            let apiLink = 'http://' + result.api + '/open.php?code=';
                            let magnet = jQuery(this).attr("href");
                            jQuery(this).parent().append(
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="'
                                + "javascript:"
                                + "el" + count + " = document.createElement('textarea');"
                                + "el" + count + ".value = '" + magnet + "';"
                                + "document.body.appendChild(el" + count + ");"
                                + "el" + count + ".select();"
                                + "document.execCommand('copy');"
                                + "document.body.removeChild(el" + count + ");"
                                + '">COPY</a>'
                            );
                            count++;
                        });
                    }
                }
                if (jQuery('.Po_topic_Date_Serial font').length > 0) {
                    jQuery('.Po_topic_Date_Serial font').each(function () {
                        var content = $(this).html();
                        var tmp = content.split('/');
                        var awesomeCode = tmp[0].trim();
                        $(this).html(
                            content
                            +
                            '<iframe src="' + apiLinkIndex + awesomeCode + '" title="awesome video checker" scrolling="no" frameborder="0" border="0" cellspacing="0" style="-webkit-transform: scale(0.50);-webkit-transform-origin: 0 0;float:left;overflow:hidden;border:none" width="33" height="39"></iframe>'
                        );
                    });
                }
            }
            else if (location.hostname == 'www.javbus.com') {
                var awesomeCode = jQuery(".movie .info p:nth-child(1) span:nth-child(2)").html()
                if (awesomeCode != "") {
                    jQuery(".movie .info p:nth-child(1)")
                        .append(
                            '<p>'
                            +
                            '<iframe src="' + applinkOpen + awesomeCode + '" title="awesome video checker" scrolling="no" frameborder="0" border="0" cellspacing="0" style="float:left;overflow:hidden;border:none" width="180" height="50"></iframe>'
                            +
                            '</p>'
                        );
                }
                if (jQuery('.item .photo-info date').length > 0) {
                    var count = 0;
                    jQuery('.item .photo-info date').each(function () {
                        count++;
                        if (count % 2 == 1) {
                            var awesomeCode = jQuery(this).html();
                            jQuery(this).html(
                                awesomeCode
                                +
                                '<iframe src="' + apiLinkIndex + awesomeCode + '" title="awesome video checker" scrolling="no" frameborder="0" border="0" cellspacing="0" style="-webkit-transform: scale(0.50);-webkit-transform-origin: 0 0;float:left;overflow:hidden;border:none" width="33" height="39"></iframe>'
                            );
                        }
                    });
                }
            }
            else if (location.hostname == 'javdb.com') {
                if(jQuery('.movie-panel-info .first-block .copy-to-clipboard').length > 0){
                    var awesomeCode = jQuery(".movie-panel-info .first-block .copy-to-clipboard").attr('data-clipboard-text');
                    jQuery('.movie-panel-info .first-block').append(
                        '<p>'
                        +
                        '<iframe src="' + applinkOpen + awesomeCode + '" title="awesome video checker" scrolling="no" frameborder="0" border="0" cellspacing="0" style="float:left;overflow:hidden;border:none" width="180" height="50"></iframe>'
                        +
                        '</p>'
                    );
                }
                if (jQuery('.videos .grid-item .uid').length > 0) {
                    var count = 0;
                    jQuery('.videos .grid-item .uid').each(function () {
                        var awesomeCode = jQuery(this).html().trim();
                        jQuery(this).html(
                            awesomeCode
                            +
                            '<iframe src="' + apiLinkIndex + awesomeCode + '" title="awesome video checker" scrolling="no" frameborder="0" border="0" cellspacing="0" style="-webkit-transform: scale(0.50);-webkit-transform-origin: 0 0;float:left;overflow:hidden;border:none" width="33" height="39"></iframe>'
                        );
                    });
                }
            }
        });
    }
    start();
})();
