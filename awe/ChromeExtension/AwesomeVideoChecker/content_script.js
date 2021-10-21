(function () {
    function start() {
        var apiLinkOpen = '', apiLinkIndex = '';
        chrome.storage.local.get(['api'], function (result) {
            var apiLinkOpen = 'https://' + result.api + '/open.php?code=';
            var apiLinkIndex = 'https://' + result.api + '/index.php?code=';
            var apiLinkHome = 'https://' + result.api + '/';

            function getAwesomeData(ajaxurl) {
                jQuery.support.cors = true;
                return $.get({
                    url: ajaxurl,
                    type: 'GET',
                    beforeSend: function (request) {
                        request.withCredentials = false;
                    }
                });
            };
    
            async function getAwesomeIndicator(link, ele) {
                try {
                    let res = await getAwesomeData(link);
                    ele.append(res.replace('src="', 'src="'+apiLinkHome)).children().width("15px").height("15px").css("float", "left");
                } catch (err) {
                    console.log(err);
                }
            }
            async function getAwesomeOpenIndicator(link, ele) {
                try {
                    let res = await getAwesomeData(link);
                    ele.append(res.replace('src="', 'src="'+apiLinkHome));
                } catch (err) {
                    console.log(err);
                }
            }

            if (location.hostname == 'jmvbt.com') {
                var awesomeCode = jQuery(".infobox a").html()
                if (awesomeCode != "") {
                    getAwesomeOpenIndicator(apiLinkOpen + awesomeCode, jQuery("#info").append($("<div />")));
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
                        getAwesomeIndicator(apiLinkIndex + awesomeCode, $(this));
                    });
                }
            }
            else if (location.hostname == 'www.javbus.com') {
                var awesomeCode = jQuery(".movie .info p:nth-child(1) span:nth-child(2)").html()
                if (awesomeCode != "") {
                            getAwesomeOpenIndicator(apiLinkOpen + awesomeCode, jQuery(".movie .info p:nth-child(1)").append($("<div />")));
                }
                if (jQuery('.item .photo-info date').length > 0) {
                    var count = 0;
                    jQuery('.item .photo-info date').each(function () {
                        count++;
                        if (count % 2 == 1) {
                            var awesomeCode = jQuery(this).html();
                            jQuery(this).html(
                                awesomeCode
                                );
                            getAwesomeIndicator(apiLinkIndex + awesomeCode, $(this));
                        }
                    });
                }
            }
            else if (location.hostname == 'javdb.com') {
                if(jQuery('.movie-panel-info .first-block .copy-to-clipboard').length > 0){
                    var awesomeCode = jQuery(".movie-panel-info .first-block .copy-to-clipboard").attr('data-clipboard-text');
                    getAwesomeOpenIndicator(apiLinkOpen + awesomeCode, jQuery('.movie-panel-info .first-block').append($("<div />")));
                }
                if (jQuery('.videos .grid-item .uid').length > 0) {
                    var count = 0;
                    jQuery('.videos .grid-item .uid').each(function () {
                        var awesomeCode = jQuery(this).html().trim();
                        jQuery(this).html(awesomeCode)
                        getAwesomeIndicator(apiLinkIndex + awesomeCode, $(this));
                    });
                }
            }
        });
    }
    start();
})();
