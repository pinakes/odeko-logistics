function nyc() {
    
    //http://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson
    d3.json("js/nyc.json", function(error, nyc) {
        if (error) throw error;

        var mappa = d3.geoPath()
            .projection(d3.geoConicConformal()
            .parallels([33, 45])
            .rotate([96, -39])
            .fitSize([width, height], nyc));

        console.log(mappa)

        svg.selectAll("path")
            .data(nyc.features)
            .enter().append("path")
            .attr("d", mappa)
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

        svg.selectAll(".mark")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "pizzaPin")
            .attr('r', 12)
            .attr("cx", function(d) { console.log([d.long, d.lat]); })
    });
}