var uiBuilder = (function () {
    var _fileName = "uiBuilder",
        _eventHandler = undefined;


    var setUIEventHandlerTo = function (eventHandler) {
        _eventHandler = eventHandler;
    };


    var handleEvent = function () {
        _eventHandler();
    };


    var buildUI = function () {
        setUIEventHandlerTo(motifHandler.handleMotifs);

        motifLibrary.create(handleEvent);

        colorPicker.init(handleEvent);

        motifPicker.create();
        buildExternalMotifPickerComponent();

        var table = motifTable.create();
        buildExternalTableComponent(table);

        pSlider.create();
        buildExternalSliderComponent();

        resultContainer.create();
        buildExternalResultContainerComponent();

        fileUploader.create();
        $('#sequence-input').on('input', function () {
            handleEvent();
        });
    };


    var buildExternalMotifPickerComponent = function () {
        $('#motif-list').on('click', '.motif-title', function(event){
            var $motifTitle = $(event.target), motifName = $motifTitle.text(),
                $motifContainer = $motifTitle.parent();

            $motifContainer.addClass('chosen-motif');
            colorPicker.addTo($motifContainer);

            motifPicker.addChosenMotifToSet(motifName);
            motifLibrary.addUnit(motifName);

            $motifContainer.appendTo('#motif-list-selected');
            motifSearch.applySearch();
        });

        $('#motif-list-selected').on('click', '.motif-title', function(event){
            var $motifTitle = $(event.target), motifName = $motifTitle.text(),
                $motifContainer = $(event.target).parent();
            $motifContainer.removeClass('chosen-motif');
            colorPicker.removeFrom($motifContainer);

            motifPicker.deleteChosenMotifFromSet(motifName);
            $motifContainer.remove();
            motifSearch.applySearch();

            handleEvent();
        });



        var buttonStates = ["hidden", "full-screen", "flattened"], button;
        for(var i = 0; i < buttonStates.length; i++) {
            button = ".to-" + buttonStates[i] + "-button";

            $(button).on('click', function() {
                var $source = $(this),
                    classToSet = $source.attr("state"), $target = $("#" + $source.attr("applyToId")),
                    currentClass = motifPicker.getCurrentInterfaceState();

                $target.removeClass(currentClass);
                if (currentClass == classToSet) {
                    //toggle class
                    motifPicker.setCurrentInterfaceState("default");
                } else {
                    //add new class
                    motifPicker.setCurrentInterfaceState(classToSet);
                    $target.addClass(classToSet);
                }
            });
        }


        //search bar usability
        $('body').click(function(e) {
            if (e.target.id != "search" &&  e.target.className != "motif-title") {
                if (!$(e.target).closest('.suggestions').length) {
                    $(".suggestions").hide();
                }
            }
        });
    };


    var buildExternalTableComponent = function (table) {
        var $motifTableTBody = $('#motif-table').find('tbody'),
            $result = $("#result");

        //highlight sequence
        $motifTableTBody
            .on( 'mouse' + 'enter', 'td', function () {
                var rowData = table.row( this ).data();
                if (rowData  != undefined){
                    var start = rowData["Start Position"], finish = rowData["Finish Position"],
                        segment,
                        firstID = start,
                        lastID;

                    while (start <= finish) {
                        segment = $result.children('[start=' + start + ']');
                        segment.addClass("highlighted");
                        if ((finish - start + 1) == segment.text().length) {
                            break
                        } else {
                            start = segment.next().attr('start')
                        }
                    }
                    lastID = start;

                    $('#' + firstID).addClass("first");
                    $('#' + lastID).addClass("last");
                }
            });

        $motifTableTBody
            .on( 'mouse' + 'leave', 'td', function () {
                var rowData = table.row( this ).data();
                if (rowData  != undefined){
                    var start = rowData["Start Position"], finish = rowData["Finish Position"],
                        segment,
                        firstID = start,
                        lastID;

                    while (start <= finish) {
                        segment = $result.children('[start=' + start + ']');
                        segment.removeClass("highlighted");
                        if ((finish - start + 1) == segment.text().length) {
                            break
                        } else {
                            start = segment.next().attr('start')
                        }
                    }
                    lastID = start;

                    $('#' + firstID).removeClass("first");
                    $('#' + lastID).removeClass("last");
                }
            });
    };


    var buildExternalSliderComponent = function () {
        pSlider.setEventHandlerTo(handleEvent);
    };


    var buildExternalResultContainerComponent = function () {
        resultContainer.setExternalFocusObject(pSlider.isActive);
    };


    return {
        buildUI: buildUI
    };
}());

/**
 * Created by HOME on 12.02.2017.
 */
