var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1nDrkvMBBNFClS7eGxueU6ujZ6LIHCZF5wJTfS9IcZWM/pubhtml';

function renderSpreadsheetData() {
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: draw,
                     simpleSheet: true } )
}

function draw(data, tabletop) {

    //console.log(data);

    //const today = new Date()
    //const tomorrow = new Date(today)
    //tomorrow.setDate(tomorrow.getDate() + 1)

    //document.getElementById("date").innerHTML = "Today's Delivery (" + today.getMonth() + "/" + today.getDate() + ")";

    var locations = d3.select("#locations")

    locations.selectAll(".location")
        .data(data)
        .enter().append("div")
        .attr("class", "location")
        

    d3.selectAll(".location")
        .append("text")
        .attr("class", function(d) {
            if(d.delivered == "TRUE" && d.driverNote){
                return "doneWithIssues"
            } else if(d.delivered == "FALSE" && d.driverNote){
                return "justIssues"
            } else if(d.delivered == "TRUE"){
                return "done"
            } else if(d.delivered == "FALSE"){
                return "inProgress"
            }
        })
        .text(function(d) { return d.locationName; });

    d3.selectAll(".location")
        .append("p")
        .html(function(d) {return d.driverNote; })
        .attr("class", function(d){
            if(d.driverNote){
                return "showNote";
            } else {
                return "hideNote";
            }
        });

    d3.selectAll(".location")
        .append("a")
        .attr("href", function(d){
            return d.confirmationPic;
        })
        .html("📎")
        .attr("class", function(d){
            if(d.confirmationPic){
                return "showPic";
            } else {
                return "hidePic";
            }
        });


    function deliveryAlerts(data) {
        if(data.delivered == "TRUE" && data.issues == "TRUE"){
            return "doneWithIssues"
        } else if(data.delivered == "FALSE" && data.issues == "TRUE"){
            return "justIssues"
        } else if(data.delivered == "FALSE" && data.issues == "FALSE"){
            return "inProgress"
        }
    }
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