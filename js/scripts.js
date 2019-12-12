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

    d3.selectAll(".location")
        .append("svg:image")
        .attr("class", function(d) { 
            if(d.delivered == "TRUE"){
                return "pic"
            } else {
                return "noPic"
            }
        })
        .attr({
            "xlink:href": function(d) { return d.confirmationPic; },
            x: 0,
            y: 0,
            width: 20,
            height: 20
        });

    var svg = d3.select("#map"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

    
    //nyc();


    
    

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