const margin = 50;
const width = window.innerWidth - (2 * margin);
const height = 500;
const font = 'Roboto'
const textColor = '#B4E7CE'
const barColor = '#474A2C'

var dataset = toDataSet(pollution)

const svg = d3.select('#pollution_places')

const chart = svg.append('g').attr('transform', `translate(${margin},${margin})`);

const xScale = d3
  .scaleBand()
  .domain(dataset.map((s) => s.nm_sttn))
  .range([0, width])
  .padding(0.2)

const yScale = d3
  .scaleLinear()
  .domain([0, 40])
  .range([height, 0])

chart.append('g').call(d3.axisLeft(yScale));
chart.append('g').attr('transform',`translate(0, ${height})`).call(d3.axisBottom(xScale));

const bargroup = chart.selectAll()
  .data(dataset)
  .enter()
  .append('g')

bargroup
  .append('rect')
  .attr('x', (s) => xScale(s.nm_sttn))
  .attr('y', (s) => yScale(s.avg))
  .attr('height', (s) => height - yScale(s.avg))
  .attr('width', xScale.bandwidth())
  .style('fill', barColor)

bargroup.
  on('mouseover', function(actual, i) {
    chart
      .append('text')
      .attr('x', xScale(actual.nm_sttn) + (xScale.bandwidth() / 2))
      .attr('y', yScale(actual.avg) + 25)
      .attr('text-anchor', 'middle')
      .attr('class', 'removeOnMouseLeave')
      .text('Moyenne : ' + actual.avg + ' ug.m-3')
      .style('fill', textColor)
      .attr('font-family', font)

    chart
      .append('text')
      .attr('x', xScale(actual.nm_sttn) + (xScale.bandwidth() / 2))
      .attr('y', yScale(actual.avg) + 50)
      .attr('text-anchor', 'middle')
      .attr('class', 'removeOnMouseLeave')
      .text('Minimum : ' + actual.min + ' ug.m-3')
      .style('fill', textColor)
      .attr('font-family', font)

    chart
      .append('text')
      .attr('x', xScale(actual.nm_sttn) + (xScale.bandwidth() / 2))
      .attr('y', yScale(actual.avg) + 75)
      .attr('text-anchor', 'middle')
      .attr('class', 'removeOnMouseLeave')
      .text('Maximum : ' + actual.max + ' ug.m-3')
      .style('fill', textColor)
      .attr('font-family', font)
  })

bargroup
  .on('mouseleave', function(actual, i) {
    chart
      .selectAll('.removeOnMouseLeave')
      .remove()
  })

function toDataSet(datas) {
  var res = {}

  pollution.forEach(function(elt) {
    elt = elt.fields

    if(!(elt.nm_sttn in res)) {
      res[elt.nm_sttn] = {
        'nm_sttn': elt.nm_sttn,
        'min': Number.MAX_SAFE_INTEGER,
        'max': Number.MIN_SAFE_INTEGER,
        'values': []
      }
    }

    let place = res[elt.nm_sttn]
    let val = elt.valeur

    if (val < place.min) {
      place.min = val
    }

    if (val > place.max) {
      place.max = val
    }

    if(val !== undefined) {
      place.values.push(val)      
    }
  })

  let final = []

  for(var i in res) {
    res[i]['avg'] = (res[i].values.reduce((acc, curr) => acc + curr) / res[i].values.length).toFixed(2)
    final.push(res[i])
  }

  return final;
}
