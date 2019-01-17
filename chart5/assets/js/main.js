// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
    let API = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=objets-trouves-gares%40datasncf&rows=3000&sort=date&facet=date&facet=gc_obo_type_c&facet=gc_obo_gare_origine_r_name";
    let manif = fetch(API);

    manif.then(function(response){
        return response.json();
    })
    .then(function (myJson) {
        // Create the data table.
        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Commune');
        data.addColumn('number', 'Nombre d\'objet perdu');
        let dataJson = myJson.records;
        console.log(dataJson);
        let dataField = dataJson.map(({
            fields: {
                gc_obo_type_c
            }
        }) => gc_obo_type_c);

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
        
        data.addRows(res2);
        // Set chart options
        const options = {
            'title':'Nombre d\'objet perdu par catégorie d\'objet sur 3000 requête',
            'width':1100,
            'height':700
        };

        // Instantiate and draw our chart, passing in some options.
        const chart = new google.visualization.PieChart(document.getElementById('chart_item_lost'));
        chart.draw(data, options);
    })
}