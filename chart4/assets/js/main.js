// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
    let API = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=cdt62_manifestations%40tourisme62&rows=3174&facet=lang&facet=type&facet=adherent&facet=langues&facet=territoires&facet=themes&facet=moyenspaiement&facet=prestations&facet=classement_categories&facet=classement_labels&facet=classement_guides&facet=classement_chaines&facet=classement_tourisme_et_handicap&facet=code_postal_etab&facet=commune_etab&facet=created";
    let manif = fetch(API);

    manif.then(function(response){
        return response.json();
    })
    .then(function (myJson) {
        // Create the data table.
        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Commune');
        data.addColumn('number', 'Nombre de manifestation');
        let dataJson = myJson.records;
        console.log(dataJson);
        let dataField = dataJson.map(({
            fields: {
                commune_etab
            }
        }) => commune_etab);

        let res = [];

        dataField = dataField.filter((x) => x !== undefined);

        dataField.forEach(function(x) {
            if(!(x in res)) {
                res[x] = 1
            } else {
                res[x]++
            }
        });

        var res2 = [];

        let keys = Object.keys(res);
        for (var x in keys) {
            res2.push([keys[x], res[keys[x]]])
        }

        res2 = res2.filter(x => x[1] > 30);
        
        data.addRows(res2);
        // Set chart options
        const options = {
            'title':'Nombre de commune qui ont fait plus de 30 manifestation',
            'width':1100,
            'height':700
        };

        // Instantiate and draw our chart, passing in some options.
        const chart = new google.visualization.ColumnChart(document.getElementById('chart_manifestation'));
        chart.draw(data, options);
    })
}