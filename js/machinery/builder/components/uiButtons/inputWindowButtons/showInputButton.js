var showInputButton = (function () {
    var getSettingsFor = {
            "hidden":   {"title":"Open input ", "icon": "keyboard_arrow_up"},
            "visible":   {"title":"Hide input ", "icon": "keyboard_arrow_down"}
        },
        defaultMode = "visible",

        $button,
        $target,
        $buttonsToEmphasize;


    var setVisibility = function (newMode, $target) {
        if (newMode === "hidden") {
            $target.addClass("hidden");
            $buttonsToEmphasize.addClass("emphasized");
        } else {
            $target.removeClass("hidden");
            $buttonsToEmphasize.removeClass("emphasized");
        }

        console.log($buttonsToEmphasize);
    };

    var switchMode = function () {
        var newMode = ($target.hasClass("hidden")) ? "visible" : "hidden";
        setVisibility(newMode, $target);



        $button
            .empty()
            .html(uiButtons.generateContent(getSettingsFor[newMode]));
    };

    var init = function () {
        $button = $("#manual-seq-input").find(".open-sequence");
        $target = $("#manual-seq-input").find("textarea");
        $buttonsToEmphasize = $button.add($("#manual-seq-input").find(".add-sequence"));

        setVisibility(defaultMode, $target);

        $button
            .empty()
            .html(uiButtons.generateContent(getSettingsFor[defaultMode]))
            .on('click', function(event) {
                event.preventDefault();
                if ($(event.target).html() === "Show sequences ") {
                    window.scrollTo(0, 0);
                }
                switchMode();
            });
    };

    var reset = function () {
        var newMode = ($target.hasClass("hidden")) ? "visible" : "hidden";
        if (newMode === defaultMode) {
            switchMode();
        }
    };

    return {
        init: init,
        reset: reset
    };
} ());
