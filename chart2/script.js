function getValuePollu(polluant){
    var tabVar = {};
    var cpt = 0;
    allData.forEach(function (d) {
        cpt += 1;
        if(!isNaN(d.fields[polluant])){
            if(tabVar.hasOwnProperty(d.fields.dateheure.substr(11,5))) {
                tabVar[d.fields.dateheure.substr(11,5)] = tabVar[d.fields.dateheure.substr(11,5)] + d.fields[polluant];
            } else {  
                tabVar[d.fields.dateheure.substr(11,5)] = d.fields[polluant];
            }
        }
    });
    const tabData = [];
    for(var prop in tabVar) {
        tabData.push({dateheure: prop, y: tabVar[prop] / (allData.length / 24 ) });   
    }
    return Object.values(tabData.sort(compare));
}

function compare(a, b) {
  const dateheureA = a.dateheure;
  const dateheureB = b.dateheure;

  let comparison = 0;
  if (dateheureA > dateheureB) {
    comparison = 1;
  } else if (dateheureA < dateheureB) {
    comparison = -1;
  }
  return comparison;
}


var datasetC2cha4= getValuePollu("c2cha4");
console.log(datasetC2cha4);
var datasetTcha4 = getValuePollu("tcha4");
console.log(datasetTcha4 , "affiché");
var dataset10cha4 = getValuePollu("10cha4");
console.log(dataset10cha4);
var datasetN2cha4 = getValuePollu("n2cha4");
console.log(datasetN2cha4, "affiché");
var datasetNocha4 = getValuePollu("nocha4");
console.log(datasetNocha4, "affiché");




// 2. Use the margin2 convention practice
const margin2 = 50;
const width2 = window.innerWidth - 2  * margin2  - margin2;// Use the window's width
const height2 = window.innerHeight - 2 * margin2 - margin2; // Use the window's height

// The number of datapoints
const n = 24;

// 5. X scale will use the index of our data
var xScale2 = d3.scaleLinear()
    .domain([0, n - 1]) // input
    .range([0, width2]); // output

// 6. Y scale will use the randomly generate number
var yScale2 = d3.scaleLinear()
    .domain([0, 40]) // input
    .range([height2, 0]); // output

// 7. d3's line generator
var line = d3.line()
    .x(function (d, i) {
        return xScale2(i);
    }) // set the x values for the line generator
.y(function (d) {
        return yScale2(d.y);
    }) // set the y values for the line generator
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number




// 1. Add the SVG to the page and employ #2
var svg2 = d3.select("#momentPollu")
    .attr("width", width2 + 2 * margin2)
    .attr("height", height2 + 2 * margin2)
    .append("g")
    .attr("transform", "translate(" + margin2 + "," + margin2 + ")");

// 3. Call the x axis in a group tag
svg2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height2 + ")")
    .call(d3.axisBottom(xScale2)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg2.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale2)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator
svg2.append("path")
    .datum(datasetTcha4) // 10. Binds data to the line
    .attr("class", "lineTcha4") // Assign a class for styling
    .attr("d", line); // 11. Calls the line generator
svg2.append("path")
    .datum(datasetN2cha4) // 10. Binds data to the line
    .attr("class", "lineN2cha4") // Assign a class for styling
    .attr("d", line); // 11. Calls the line generator
svg2.append("path")
    .datum(datasetNocha4) // 10. Binds data to the line
    .attr("class", "lineNocha4") // Assign a class for styling
    .attr("d", line); // 11. Calls the line generator
