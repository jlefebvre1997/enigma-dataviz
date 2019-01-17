// load the charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(dataTreatment);

//function to render unduplicated data for aggregation

// the function used to remove  undefined values
function removeUndefinedvalues(someData){
    console.log("let's remove all the records containing undefined values");
    someData = someData.filter(x => !(x.includes(undefined)));
    //Note: thanks to Jeremy i didnt do a loop of a loop
    //parsing the dates
    return someData
}

function dataTreatment(){
    //the raw data
    //console.log("We load the raw data");
   // console.log(manif_data.fields);
    // mapping the data
    let dataset = manif_data.map(({fields}) =>[
                                               fields.periode_date_debut_1,
                                               fields.periode_date_fin_1,
                                               fields.titre,
                                               fields.description_presentation,
                                               fields.territoires
                                               ]);
    console.log("After Mapping the data , we remark Undefined Values in the dates and several others informations");
    console.log(dataset);
    let cleanData = removeUndefinedvalues(dataset);
    console.log("The clean Data");
    console.log(cleanData);
    //agregate the clean data
    var count2015= 0;
    var count2016=0;
    var count2017 = 0;
    var count2018 = 0;
    var count2019 = 0;
    var countOther = 0;
    cleanData.forEach(function(item,index){
                     // console.log(index,item[2]);
                      var year= item[0].split('-')
                      switch(year[0]){
                      case '2017': count2017++;break;
                      case '2018': count2018++;break;
                      case '2019': count2019++;break;
                      case '2016':count2016++;break;
                      case '2015':count2015++;break;
                      default: countOther++; break;
                      }
                      
                      });
    console.log(count2017);
    // think about changing the date format
    var data = new google.visualization.DataTable();
    data.addColumn('string','Date de debut');
    data.addColumn('string','Date de fin');
    data.addColumn('string','Titre de la Manifestation');
    data.addColumn('string','description');
    data.addColumn('string','territoire');
    data.addRows(cleanData);
    
    var dataex= new google.visualization.arrayToDataTable([
                                                          ['Années','Nombre de manifestations'],
                                                          ['Avant 2015',countOther],
                                                           ['2015',count2015],
                                                           ['2016',count2016],
                                                           ['2017',count2017],
                                                           ['2018',count2018],
                                                           ['2019',count2019]
                                                          ]);
    
    var options = {
    title: 'Manifs par Ans',
    curveType: 'function',
    legend: { position: 'bottom' }
    };
    
    // dessin
    var chart = new google.visualization.LineChart(document.getElementById('manif_chart'));
    chart.draw(dataex, options);
}

