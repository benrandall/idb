(function() {
    var w = 1280,
        h = 800;

    var projection = d3.geo.azimuthal()
    .mode("equidistant")
    .origin([-98, 38])
    .scale(1400)
    .translate([640, 360]);

    var path = d3.geo.path()
        .projection(projection);
    var svg = d3.select("#dataViz").append("svg:svg")
        .attr("width", w)
        .attr("height", h)
        .call(d3.behavior.zoom()
        .on("zoom", zoomed));
    var states = svg.append("svg:g")
        .attr("id", "states");
    var circles = svg.append("svg:g")
        .attr("id", "circles");
    var cells = svg.append("svg:g")
        .attr("id", "cells");
    var tip = d3.tip().attr('class', 'd3-tip').html(function(d) {return d.name;});

    function zoomed() {
      svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      circles.selectAll("circle")
          .attr("cx", function(d) { return projection([+d.latitude, +d.longitude])[0]; })
          .attr("cy", function(d) { return projection([+d.latitude, +d.longitude])[1]; })
          .attr("r", function(d) {return (d3.event.scale < 9 ? 10 - d3.event.scale : 1);});

    }

    d3.json("http://api.runescrape.lol/static/json/us-states.json", function(collection) {
      states.selectAll("path")
          .data(collection.features)
        .enter().append("svg:path")
          .attr("d", path);
    });

    d3.json("http://api.runescrape.lol/static/json/parks.json", function(parks) {
      var positions = [];
      parks.forEach(function(park) {
        var location = [+park.latitude, +park.longitude];
        positions.push(projection(location));
      });
      var g = cells.selectAll("g")
        .data(parks)
        .enter().append("svg:g")
        .attr('data-name', function(d) {return d.name;})
        .attr('data-id', function(d) {return d.id});

      g.append("svg:path")
          .attr("class", "cell")
          // .attr("d", function(d, i) { return "M" + polygons[i].join("L") + "Z"; })
          .on("mouseover", function(d, i) { d3.select("#footer span").text(d.name); });
      circles.call(tip);
      circles.selectAll("circle")
          .data(parks)
        .enter().append("svg:circle")
          .attr("cx", function(d) { return projection([+d.latitude, +d.longitude])[0]; })
          .attr("cy", function(d) { return projection([+d.latitude, +d.longitude])[1]; })
          .attr("r", function(d) {return 10; })
          .on('mouseover', function(d) {
            tip.attr("style", "left:" + (d3.event.clientX ) + 'px; top: ' + d3.event.clientY + 'px; opacity: 1; pointer-events: all; box-sizing: borer-box; position: absolute;')
            d3.select('.d3-tip').text(d.name);
          })
          .on('mouseout', tip.hide)
          .on('click', function(d) {
            console.log('http://parkd.us/parks/detail?id=' + d.id);
            window.open('http://parkd.us/parks/detail?id=' + d.id);
            d3.event.stopPropagation();
          });
    });
});