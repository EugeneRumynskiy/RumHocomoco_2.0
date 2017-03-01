/**
 * Created by Sing on 16.11.2016.
 */
//ToDo: add updateTable

var motifTable = (function () {
    var _table = {}, _columns = [], _rows = [],
        _sitesList = [], _primarySequence = {};


    var getDataFromID = function(siteID) {
        var site =  _sitesList[siteID];
        return {
            "id": siteID + 1,
            "motifName": site.motifName,
            "strength": site.strength,
            "startPosition": site.scorePosition,
            "finishPosition": site.scorePosition + site.siteLength - 1,
            "sequence": site.motifSequence,
            "strand": site.strand
        };
    };


    var setColumns = function () {
        var columns = [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "id" },
            { "data": "motifName" },
            { "data": "strength" },
            { "data": "startPosition" },
            { "data": "finishPosition" },
            { "data": "sequence" }
        ];
        return columns;
    };


    var setRows = function() {
        var rows = new Array(_sitesList.length);
        for (var siteID = 0; siteID < _sitesList.length; siteID++) {
            rows[siteID] = getDataFromID(siteID);
        }
        return rows;
    };


    var create = function() {
        _table = {
            columnDefs: [
                { targets: [4, 5], width: "5%"}
            ],
            dom: 'Bfrtip',
            buttons: [
                { extend: 'colvis', text: 'Select Columns', columns: ':gt(0)'},
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdfHtml5',
                {
                    text: 'My button',
                    action: function ( e, dt, node, config ) {
                        alert( 'Button activated' );
                    }
                }
            ],
            columns: setColumns()
        };
        var table = $('#example').DataTable(_table);

        buildUIComponent(table);


        new $.fn.dataTable.Buttons( table, {
            name: 'commands',
            buttons: [{
                text: '<i class="fa fa-lg fa-clipboard"></i>',
                extend: 'copy',
                className: 'export-copy_',
                name: "myB"
            }]
        } );

        table.buttons(1, null).container().appendTo( "#dtTest" );

        console.log(table);
        console.log(table.buttons().container());
        return table;
    };

    var buildUIComponent = function (table) {
        $('#example').find('tbody')
            .on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = table.row( tr );

                if ( row.child.isShown() ) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                } else {
                    // Open this row
                    row.child( format(row.data()) ).show();
                    tr.addClass('shown');
                }
            });
    };


    var format = function (d) {
        // `d` is the original data object for the row
        return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
            '<tr>'+
            '<td>Motif sequence:</td>'+
            '<td>' + d.sequence + '</td>'+
            '</tr>'+
            '<tr>' +
            '<td>Motif strand:</td>'+
            '<td>' + d.strand + '</td>'+
            '</tr>' +
            '<tr>' +
            '<td>Sequence ID:</td>' +
            '<td>' + _primarySequence["title"] + '</td>'+
            '</tr>'+
            '</table>';
    };


    var redrawTableWithSites = function(sites, primarySequence, userRequestedMotifs) {
        console.log(userRequestedMotifs);
        var table = $('#example').DataTable();

        _sitesList = sites;
        _rows = setRows();
        _primarySequence = primarySequence;

        table.clear();
        table
            .rows.add(_rows)
            .draw();
    };


    return {
        redrawTableWithSites: redrawTableWithSites,
        create: create
    };

}());