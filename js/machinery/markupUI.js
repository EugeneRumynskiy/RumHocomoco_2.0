/**
 * Main UI module
 */
/**
 * markupUI             (to be refactored)      base file
 *
 * motifMath            (empty)                 algorithms to calculate some general stuff like "round" function
 * inputParsing         (good)                  extraction of data from input window
 * pSlider              (good)                  changing of p-value with range slider
 *
 * motifSegmentation    (good)
 * motifModule          (good)
 *
 * motifTable           (good)                  displaying of information produced in tables
 *
 * markupModule         (to be done)
 * markup               (to be refactored)      displaying of information produced in html text
 *
     * errorHanding         (to be done )
 */




//Global data to save ajax request
//http://epifactors.autosome.ru/protein_complexes - как сделать поиск
// http://paletton.com/#uid=52Q0p1ki6rV87JXdgxQmgnFqvj3ki6rV87JXdgxQmgnFqvj3kdLmDeBKZcjw8bCe2ce5+
var globalMotifLibrary = {"allMotifsSaved": false, "motifs": []};


$(function() {

    var i, $motif,
        table = motifTable.createTable();
    // TODO: replace this stub with actual Ajax request (see above)
    //creating of motif list

    motifPicker.init();


    var data, motifName = "AIRE_HUMAN.H10MO.C",
        motifNameList = ["AHR_HUMAN.H10MO.B", "ALX1_HUMAN.H10MO.B"],
        promises, allMotifsSaved = false,
        motifNameListCleared = [];

    for(i = 0; i < motifNameList.length; i++) {
        // pattern is - str.split(search).join(replacement)
        motifNameListCleared.push(motifNameList[i].split(".").join("_"));
    }
    console.log(motifNameListCleared);
    console.log(motifNameList);



    // TODO: motif.setupMotifs(motifNameList) must be async with motif downloading


    $('#markupButton').click(function(event){
        motifHandler.handleMotifs();
    });


    $('#clearButton').click(function(event){
        var sequence = $('#sequenceInput').val();
        $('#result').html(sequence);
    });


    $('#clearFormattingButton').click(function(event){

        $('.empty').css("background-color", "white" );
        $('.empty').css("color", "black" );

       var backgroundColors = ["#7D9CE4", "#7D9CE4"],
           fontColors = ["#E6841D", "#E6841D"];


        for(var i = 0; i < motifNameListCleared.length; i++) {
            $('.' + motifNameListCleared[i]).css("background-color", backgroundColors[i]);
            $('.' + motifNameListCleared[i]).css("color", fontColors[i]);
        }

        $('.poly').css("background-color", "black");
        $('.poly').css("color", "white");

    });


    pSlider.create();




});