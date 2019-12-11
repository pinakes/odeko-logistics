var svg = d3.select("#map"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// http://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson
d3.json("js/nyc.json", function(error, nyc) {
  if (error) throw error;

  var path = d3.geoPath()
      .projection(d3.geoConicConformal()
      .parallels([33, 45])
      .rotate([96, -39])
      .fitSize([width, height], nyc));

  svg.selectAll("path")
      .data(nyc.features)
      .enter().append("path")
      .attr("d", path)
      .on("mouseenter", function(d) {
        console.log(d);
      d3.select(this)
      .style("stroke-width", 1.5)
      .style("stroke-dasharray", 0)

      d3.select("#neighborhoodPopover")
      .transition()
      .style("opacity", 1)
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY) + "px")
      .text(d.properties.borough)

    })
    .on("mouseleave", function(d) { 
      d3.select(this)
      .style("stroke-width", .25)
      .style("stroke-dasharray", 1)

      d3.select("#cneighborhoodPopoverountyText")
      .transition()
      .style("opacity", 0);
    });

    //console.log(nyc);
});




var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1nDrkvMBBNFClS7eGxueU6ujZ6LIHCZF5wJTfS9IcZWM/pubhtml';

function renderSpreadsheetData() {
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: draw,
                     simpleSheet: true } )
}

function draw(data, tabletop) {

    console.log(data);


    var locations = d3.select("#locations")

    locations.selectAll(".location")
        .data(data)
        .enter().append("div")
        .attr("class", "location")
        

        d3.selectAll(".location")
        .append("text")
        .attr("class", function(d) { 
            if(d.delivered == "TRUE"){
                return "done"
            } else {
                return "inProgress"
            }
        })
        .text(function(d) { 
            return d.locationName;
        })


    

}

renderSpreadsheetData();

/*
function sheetLoaded(data) {
    data = data.feed.entry.map(function (entry) {
        return {
            chain:                  entry['gsx$chain']['$t'],
            locationAddress:        entry['gsx$location']['$t'],
            locationPic:            entry['gsx$locationPic']['$t'],
            delivered:              entry['gsx$delivered']['$t'],
            LocationName:           entry['gsx$locationName']['$t']
        }
    })

    loadthething(data);

}
*/