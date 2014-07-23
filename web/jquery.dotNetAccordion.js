/*
    This work is licensed under a Creative Commons Attribution 4.0 International License.
    http://creativecommons.org/licenses/by/4.0/
*/
(function ($) {

    $.fn.dotNetAccordion = function (options) {

        options = $.extend({}, $.fn.dotNetAccordion.defaults, options);

        var stateField = $('#' + options.stateFieldID);

        return this.filter('a').each(function () {
            var link = $(this);
            if (!link.size()) return;
            // id ?
            var id = link.attr('href').replace('#', '');
            // find body 
            var body = $(link.attr('href'));
            if (!body.size()) return;

            // read state from hidden field
            var getState = function () {
                try {
                    if (!stateField.size()) return {};

                    return $.parseJSON(stateField.val());
                } catch (e) {
                    return {};
                }
            };

            // update state to hidden field
            var setState = function (xId, xValue) {
                if (!stateField.size()) return;

                var state = getState();
                state[xId] = xValue;

                var arr = [];
                for (var elm in state) {
                    if (state.hasOwnProperty(elm)) arr.push('"' + elm + '":"' + state[elm] + '"');
                }

                stateField.val('{' + arr.join(', ') + '}');
            };

            // Hide other parts that have HideOther class on the link
            var hideOthers = function (orgLink) {
                orgLink.removeClass('ExpandSwitch');

                $('.dotNetAccordionHead .ExpandSwitch.HideOther').each(function () {
                    var xLink = $(this);
                    // if expanded : hide
                    if (xLink.text() == '-') switchItem(xLink, false);
                });

                orgLink.addClass('ExpandSwitch');
            };

            // expand/collapse
            var switchItem = function (xLink, clicked) {
                // find body ?
                var xBody = $(xLink.attr('href'));
                if (!xBody.size()) return;

                // id ?
                var xId = xLink.attr('href').replace('#', '');

                if (xLink.text() == '+') {
                    // if collapsed
                    xLink.text('-');
                    xLink.attr('title', 'collapse');
                    xLink.removeClass('hidden');
                    xBody.show(clicked ? options.showDuration : 0);
                    setState(xId, '1');

                    //Hide Others on click only ?
                    if (clicked && xLink.hasClass('HideOther')) hideOthers(xLink);

                } else {
                    // if expanded
                    xLink.text('+');
                    xLink.attr('title', 'expand');
                    xLink.addClass('hidden');
                    xBody.hide(clicked ? options.hideDuration : 0);
                    setState(xId, '0');
                };
            };

            // init from hidden field
            var initByState = function () {
                var state = getState();
                if (state[id] == undefined || !state[id]) return;

                if (state[id] == '1') link.text('+');
                else link.text('-');

                switchItem(link, false);
            };

            // init 
            initByState();

            // click handler
            link.click(function (e) {
                switchItem(link, true);
                e.preventDefault();
            });
        });
    };

    $.fn.dotNetAccordion.defaults = {
        stateFieldID: ''
        , showDuration: 500
        , hideDuration: 200
    };

})(jQuery);