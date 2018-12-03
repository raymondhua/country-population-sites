function drawGraph(worldOBJ, selectedOBJ) {

    var data = [];

    data.push(passData("1960", selectedOBJ.name, worldOBJ.in1960, selectedOBJ.in1960));
    data.push(passData("1970", selectedOBJ.name, worldOBJ.in1970, selectedOBJ.in1970));
    data.push(passData("1980", selectedOBJ.name, worldOBJ.in1980, selectedOBJ.in1980));
    data.push(passData("1990", selectedOBJ.name, worldOBJ.in1990, selectedOBJ.in1990));
    data.push(passData("2000", selectedOBJ.name, worldOBJ.in2000, selectedOBJ.in2000));
    data.push(passData("2010", selectedOBJ.name, worldOBJ.in2010, selectedOBJ.in2010));
    data.push(passData("2016", selectedOBJ.name, worldOBJ.in2016, selectedOBJ.in2016));

    var margin = {
        top: 100,
        right: 20,
        bottom: 35,
        left: 80
    };

    var width = 1000 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
    g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // set x scale
    var x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.05)
        .align(0.1);

    // set y scale
    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    // set the colors
    var z = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6"]);

    var columns = ["Rest of World", selectedOBJ.name];

    for (var n = 0; n < data.length; n++) {
        for (i = 0, t = 0; i < columns.length; ++i) t += data[n][columns[i]] = +data[n][columns[i]];
        data[n].total = t;
    }

    var keys = columns.slice(0);

    data.sort(function(a, b) {
        return a.year - b.year;
    });
    x.domain(data.map(function(d) {
        return d.year;
    }));
    y.domain([0, d3.max(data, function(d) {
        return d.total;
    })]).nice();
    z.domain(keys);

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        console.log(d);
        return "<strong>" + keys[1] + "</strong> <br><span style='color:#98abc5'>" + d[1] + "</span>";
      });
    svg.call(tip);

    g.append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys)(data))
        .enter().append("g")
        .attr("fill", function(d) {
            return z(d.key);
        })
        .selectAll("rect")
        .data(function(d) {
            return d;
        })
        .enter().append("rect")
        .attr("x", function(d) {
            return x(d.data.year);
        })
        .attr("y", function(d) {
            return y(d[1]);
        })
        .attr("height", function(d) {
            return y(d[0]) - y(d[1]);
        })
        .attr("width", x.bandwidth())
        .on("mouseout", tip.hide)
        .on("mouseover", tip.show);

    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(20))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start");

    var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", function(d, i) {
            return "translate(0," + i * 15 + ")";
        });

    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) {
            return d;
        });
}

function passData(yearOf, nameOfCountry, populationOfWorldYear, populationOfSelectedYear){
    var obj = {};
    obj["year"] = yearOf;
    obj["Rest of World"] = populationOfWorldYear - populationOfSelectedYear;
    obj[nameOfCountry] = populationOfSelectedYear;
    return obj;
}