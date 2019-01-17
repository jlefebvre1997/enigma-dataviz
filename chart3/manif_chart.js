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
   var jan_Mars2015 =0 ; var Avr_Juin2015= 0; var Jui_sEP2015= 0;var Oct_Dec2015= 0;
     var jan_Mars2016 =0 ; var Avr_Juin2016= 0; var Jui_sEP2016= 0;var Oct_Dec2016= 0;
    var jan_Mars2017 =0 ; var Avr_Juin2017= 0; var Jui_sEP2017= 0;var Oct_Dec2017= 0;
     var jan_Mars2018 =0 ; var Avr_Juin2018= 0; var Jui_sEP2018= 0;var Oct_Dec2018= 0;
     var jan_Mars2019 =0 ; var Avr_Juin2019= 0; var Jui_sEP2019= 0;var Oct_Dec2019= 0;
    var countOther = 0;
    
    cleanData.forEach(function(item,index){
                      var year= item[0].split('-');
                      var mois= year[1];
                      console.log(year[0].concat('/',mois));
                      switch(year[0].concat('/',mois)){
                      case '2017/01'||'2017/02'||'2017/03': jan_Mars2017++;break;
                      case '2017/04'||'2017/05'||'2017/06': Avr_Juin2017++;break;
                      case '2017/07'||'2017/08'||'2017/09': Jui_sEP2017++;break;
                      case '2017/10'||'2017/11'||'2017/12': Oct_Dec2017++;break;
                      
                      case '2018/01'||'2018/02'||'2018/03': jan_Mars2018++;break;
                      case '2018/04'||'2018/05'||'2018/06': Avr_Juin2018++;break;
                      case '2018/07'||'2018/08'||'2018/09': Jui_sEP2018++;break;
                      case '2018/10'||'2018/11'||'201!/12': Oct_Dec2018++;break;
                      
                      case '2019/01'||'2019/02'||'2019/03': jan_Mars2019++;break;
                      case '2019/04'||'2019/05'||'2019/06': Avr_Juin2019++;break;
                      case '2019/07'||'2019/08'||'2019/09': Jui_sEP2019++;break;
                      case '2019/10'||'2019/11'||'2019/12': Oct_Dec2019++;break;
                      
                      case '2016/01'||'2016/02'||'2016/03': jan_Mars2016++;break;
                      case '2016/04'||'2016/05'||'2016/06': Avr_Juin2016++;break;
                      case '2016/07'||'2016/08'||'2016/09': Jui_sEP2016++;break;
                      case '2016/10'||'2016/11'||'2016/12': Oct_Dec2016++;break;
                      
                      case '2015/01'||'2015/02'||'2015/03': jan_Mars2015++;break;
                      case '2015/04'||'2015/05'||'2015/06': Avr_Juin2015++;break;
                      case '2015/07'||'2015/08'||'2015/09': Jui_sEP2015++;break;
                      case '2015/10'||'2015/11'||'2015/12': Oct_Dec2015++;break;
                      
                      default: countOther++; break;
                      }
                      });
    
    
    
    console.log(jan_Mars2017);
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
                                                          ['Q1-2015',jan_Mars2015],
                                                           ['Q2-2015',Avr_Juin2015],
                                                           ['Q3-2015',Jui_sEP2015],
                                                           ['Q4-2015',Oct_Dec2015],
                                                           
                                                           ['Q1-2016',jan_Mars2016],
                                                           ['Q2-2016',Avr_Juin2016],
                                                           ['Q3-2016',Jui_sEP2016],
                                                           ['Q4-2016',Oct_Dec2016],
                                                           
                                                           ['Q1-2017',jan_Mars2017],
                                                           ['Q2-2017',Avr_Juin2017],
                                                           ['Q3-2017',Jui_sEP2017],
                                                           ['Q4-2017',Oct_Dec2017],
                                                           
                                                           ['Q1-2018',jan_Mars2018],
                                                           ['Q2-2018',Avr_Juin2018],
                                                           ['Q3-2018',Jui_sEP2018],
                                                           ['Q4-2018',Oct_Dec2018],
                                                           
                                                           ['Q1-2019',jan_Mars2019],
                                                           ['Q2-2019',Avr_Juin2019],
                                                           ['Q3-2019',Jui_sEP2019],
                                                           ['Q4-2019',Oct_Dec2019],
                                                           
                                                          ]);
    
    var options = {
    title: 'Manifestations par Quarters',
    
    legend: { position: 'bottom' }
    };
    
    // dessin
    var chart = new google.visualization.LineChart(document.getElementById('manif_chart'));
    chart.draw(dataex, options);
}

