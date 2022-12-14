var height =600;
var width = 600;



var svgContainer = d3.select("body").append("svg")
                                    .attr("width", "800")
                                    .attr("height", "600")
                                    .attr("transform","translate(0,0)");

var svg1 = d3.select("body").append("svg").attr("height","600").attr("width","700").attr("transform","translate(0,0)");

var svgContainer_1 = d3.select("body").append("svg")
                                    .attr("width", "500")
                                    .attr("height", "400")
                                      .attr("transform","translate(100,-200)");


var svg3 = d3.select("body").append("svg")
                                    .attr("width", "700")
                                    .attr("height", "600").attr("transform","translate(300,-200)");

var margin = {left:50, right:25, top:50, bottom:0};
var chartGroup1 = svgContainer.append("g")
                    .call(d3.drag().on("drag", dragging))
                    .attr("transform","translate("+margin.left+","+margin.top+")");




function dragging(){
  d3.select(this).attr("transform","translate("+d3.event.x+","+d3.event.y+")");
};
d3.json("streets.json").get(function(error, data){

    for(var p=0;p<data.length;p++){
        var d =[];
        for(var j=0;j<data[p].length;j++){
          d.push({x:data[p][j].x, y: data[p][j].y});
        }
        var lineFunc = d3.line()
                              .x(function(d,i) { return d.x*30; })
                               .y(function(d,i) { return height - d.y*30; })
                                .curve(d3.curveLinear);

        var lineGraph = chartGroup1.append("path")
                                    .attr("d", lineFunc(d))
                                    .attr("stroke", "blue")
                                    .attr("stroke-width", 1.5)
                                    .attr("fill", "none");
        };

});

var deaths = [];
var d_age = {};
var d_gender = {};
var newdata;


  d3.csv("deaths_age_sex.csv")
        .get(function(error, data_csv){
            deaths = data_csv;

            d_age = d3.nest()
                          .key(function(d){return d.age;})
                          .rollup(function(v){
                              return v.length;})
                          .entries(deaths)
                          .map(function(d){
                            return {age:d.key, count: d.value};
                          });

            d_gender = d3.nest()
                          .key(function(d){return d.gender;})
                          .rollup(function(v){
                              return v.length;})
                          .entries(deaths)
                          .map(function(d){
                            return {gender:d.key, count: d.value};
                          });

          var tooltip = d3.select("body").append("div").style("opacity","0").style("position","absolute");
          chartGroup1.selectAll("circle.deaths_age_sex")
                              .data(deaths)
                              .enter().append("circle")
                                      .attr("class", "deaths_age_sex")
                                      .attr("cx",function(d,i){return d.x*30;})
                                      .attr("cy",function(d,i){return height - d.y*30;})
                                      .attr("r","4")
                                      .attr("stroke","black")
                                      .attr("stroke-width",1)
                                      .attr("fill",function(d,i){
                                                if (d.gender==0){
                                                  return "#376b37";
                                                } else{
                                                  return "#c38eb1";
                                                }})
                                        .on("mouseout", function(d){
                                                d3.select(this)
                                                   .transition()
                                                        .attr("r","4");
                                                    tooltip.style("opacity","0");
                                            });
                                        .on("mouseover", function(d,i){
                                                d3.select(this)
                                                    .transition()
                                                      .attr("r","6");
                                                var gender = "female";
                                                var index = d.age;
                                                var age = ["0-10","11-20","21-40","41-60","61-80",">80"];
                                                if(d.gender==0 ){gender = "male";};
                                                tooltip.html(d)
                                                        .style("opacity","1")
                                                        .style("left",d3.select(this).attr("cx")+"px")
                                                        .style("top",d3.select(this).attr("cy")+"px")
                                                        .style("background","lightblue")
                                                        .style("border-radius","8px")
                                                        .style("padding","5px");
                                                  tooltip.html("Age:"+age[index]+" <br> Gender:"+ gender);
                                        })
});

      legend_gender();

        d3.csv("pumps.csv")
              .get(function(error, data){

              chartGroup1.selectAll("circle.pumps")
                .data(data)
                .enter().append("circle")
                        .attr("class","pumps")
                        .attr("cx",function(d,i){return d.x*30;})
                        .attr("cy",function(d,i){return height - d.y*30;})
                        .attr("r","7")
                        .attr("fill","#e85110")
                        .attr("stroke","black");

          });
          chartGroup1.append("text")
                      .attr("transform", "rotate(65)")
                      .attr("y", "-405" )
                      .attr("x", "340")
                      .attr("dy", "1em")
                      .style("text-anchor", "middle")
                      .attr("font-family","monospace")
                      .attr("font-size","10")
                      .attr("font-weight","bold")
                      .text("DEAN STREET");

         chartGroup1.append("text")
                      .attr("transform", "rotate(60)")
                      .attr("y", "-78" )
                      .attr("x", "360")
                      .attr("dy", "1em")
                      .style("text-anchor", "middle")
                      .attr("font-family","monospace")
                      .attr("font-size","10")
                      .attr("font-weight","bold")
                      .text("RECENT STREET");


         chartGroup1.append("text")
                      .attr("transform", "rotate(-42)")
                      .attr("y", "530" )
                      .attr("x", "30")
                      .attr("dy", "1em")
                      .style("text-anchor", "middle")
                      .attr("font-family","monospace")
                      .attr("font-size","10")
                      .attr("font-weight","bold")
                      .text("BREWER STREET");

          chartGroup1.append("text")
                    .attr("transform", "rotate(-10)")
                    .attr("y", "140" )
                    .attr("x", "300")
                    .attr("dy", "1em")
                    .style("text-anchor", "middle")
                    .attr("font-family","monospace")
                    .attr("font-size","10")
                    .attr("font-weight","bold")
                    .text("OXFORD STREET");


            chartGroup1.append("text")
                      .attr("transform", "rotate(-55)")
                      .attr("y", "315" )
                      .attr("x", "-180")
                      .attr("dy", "1em")
                      .style("text-anchor", "middle")
                      .attr("font-family","monospace")
                      .attr("font-size","10")
                      .attr("font-weight","bold")
                      .text("CONDUIT STREET");

            chartGroup1.append("text")
                      .attr("transform", "rotate(-25)")
                      .attr("y", "360" )
                      .attr("x", "240")
                      .attr("dy", "1em")
                      .style("text-anchor", "middle")
                      .attr("font-family","monospace")
                      .attr("font-size","10")
                      .attr("font-weight","bold")
                      .text("BROAD STREET");


            chartGroup1.append("rect")
                      .attr("transform", "rotate(-28)")
                      .attr("x", "245")
                      .attr("y", "395" )
                      .attr("height","32")
                      .attr("width","17")
                      .attr("dy", "1em")
                      .attr("fill","#8f8f8f ");

            chartGroup1.append("text")
                      .attr("transform", "rotate(65)")
                      .attr("x", "398")
                      .attr("y", "-280" )
                      .attr("dy", "1em")
                      .attr("text-anchor", "middle")
                      .attr("font-family","monospace")
                      .attr("font-size","5")
                      .attr("font-weight","bold")
                      .text("BREWERY");

            chartGroup1.append("rect")
                      .attr("transform", "rotate(68)")
                      .attr("x", "295")
                      .attr("y", "-255" )
                      .attr("height","40")
                      .attr("width","30")
                      .attr("dy", "1em")
                      .attr("stroke-width","1")
                      .attr("stroke","black")
                      .attr("fill","#523b7a");

            chartGroup1.append("text")
                      .attr("transform", "rotate(-22)")
                      .attr("x", "235")
                      .attr("y", "305" )
                      .attr("dy", "1em")
                      .attr("text-anchor", "middle")
                      .attr("font-family","monospace")
                      .attr("font-size","6")
                      .attr("font-weight","bold")
                      .text("WORK HOUSE")







  function deaths_by_index(start_index = 0, end_index = deaths.length-1){
    newdata = deaths.slice(start_index, end_index);
      var tooltip2 = d3.select("body").append("div").style("opacity","0").style("position","absolute");
    chartGroup1.selectAll("circle.deaths_age_sex").remove();
      chartGroup1.selectAll("circle.deaths_age_sex")
                .data(newdata)
                .enter().append("circle")
              .attr("class", "deaths_age_sex")
              .attr("cx",function(d,i){return d.x*30;})
              .attr("cy",function(d,i){return height - d.y*30;})
              .attr("r","4")
              .attr("stroke","black")
              .attr("stroke-width",1)
              .attr("fill",function(d,i){
                        if (d.gender==0){
                          return "#376b37";
                        } else{
                          return "#c38eb1";
                        }
                      })
              .on("mouseover", function(d,i){
                d3.select(this)
                    .transition()
                      .attr("r","6");
                var gender = "female";
                var index = d.age;
                var age = ["0-10","11-20","21-40","41-60","61-80",">80"];
                if(d.gender==0 ){gender = "male";};

                tooltip2.html(d)
                        .style("opacity","1")
                        .style("left",d3.select(this).attr("cx")+"px")
                        .style("top",d3.select(this).attr("cy")+200+"px")
                        .style("background","lightblue")
                        .style("border-radius","8px")
                        .style("padding","2px")
                        .style("position" ,"absolute");
                      tooltip2.html("Age:"+age[index]+" <br> Gender:"+ gender);
              })
              .on("mouseout", function(d){
                d3.select(this)
                  .transition()
                    .attr("r","4");
                  tooltip2.style("opacity","0");
              });

              legend_gender();
              update_bar();
        };

function deaths_by_age(start_index = 0, end_index = deaths.length-1){
  newdata = deaths.slice(start_index, end_index);
    var tooltip3 = d3.select("body").append("div").style("opacity","0").style("position","absolute");
  var colors = ['#d73027','#fc8d59','#fee090','#e0f3f8','#91bfdb','#4575b4'];
  chartGroup1.selectAll("circle.deaths_age_sex").remove();
    chartGroup1.selectAll("circle.deaths_age_sex")
              .data(newdata)
              .enter().append("circle")
            .attr("class", "deaths_age_sex")
            .attr("cx",function(d,i){return d.x*30;})
            .attr("cy",function(d,i){return height - d.y*30;})
            .attr("r","4")
            .attr("stroke","black")
            .attr("stroke-width",1)
            .attr("fill",function(d,i){
                      index = d.age;
                      return colors[index];
                    })
            .on("mouseover", function(d,i){
              d3.select(this)
                  .transition()
                    .attr("r","6");
              var gender = "female";
              var index = d.age;
              var age = ["0-10","11-20","21-40","41-60","61-80",">80"];
              if(d.gender==0 ){gender = "male";};
              tooltip3.html(d)
                      .style("opacity","1")
                      .style("left",d3.select(this).attr("cx")+"px")
                      .style("top",d3.select(this).attr("cy")+200+"px")
                      .style("background","lightblue")
                      .style("border-radius","8px")
                      .style("padding","2px");
                    tooltip3.html("Age:"+age[index]+" <br> Gender:"+ gender);
            })
            .on("mouseout", function(d){
              d3.select(this)
                .transition()
                  .attr("r","4");
                tooltip3.style("opacity","0");
            });

            legend_ages();
            update_bar();
};


chartGroup1.call(d3.zoom()
                .scaleExtent([0.8,2])
                .on("zoom", function(){
                    chartGroup1.attr("transform", d3.event.transform);
                }));

var chartGroup2 = svgContainer_1.append("g")
                    .attr("transform","translate(-50,50)");
var parseDate = d3.timeParse("%d-%b");
var formatMonth = d3.timeFormat('%d-%b');


                    function legend_gender(){
                                      chartGroup2.selectAll(".legend_2").remove();
                                      chartGroup2.selectAll(".legend_1a").remove();

                                      var gender_colors = ["#e85110","#523b7a","#8f8f8f",'#376b37','#c38eb1'];
                                      var gender_legend = ["Pump","Work House","Brewery","Male","Female"];

                                      chartGroup2.append("rect")
                                                .attr("class","legend_1a")
                                                .attr("x","250")
                                                .attr("y","-40")
                                                .attr("height","150")
                                                .attr("width","200")
                                                .attr("stroke", "black")
                                                .attr("stroke-width", 2)
                                                .attr("fill","none");

                                      chartGroup2.selectAll("circle")
                                                .data(gender_colors)
                                                .enter().append("circle")
                                                .attr("class","legend_1a")
                                                .attr("cx","280")
                                                .attr("cy",function(d,i){return -20+i*20;})
                                                .attr("r","6")
                                                .attr("stroke", "black")
                                                .attr("fill",function(d,i){return d;});

                                      chartGroup2.selectAll("text")
                                                .data(gender_legend)
                                                .enter().append("text")
                                                .attr("class","legend_1a")
                                                .attr("x","295")
                                                .attr("y",function(d,i){return -15+i*20})
                                                .attr("text-anchor", "left")
                                                .style("font-size", "16px")
                                                .text(function(d,i){return d;});


                    };

                    function legend_ages(){

                                  chartGroup2.selectAll(".legend_1a").remove();

                                  var colors = ["#e85110","#523b7a","#8f8f8f",'#d73027','#fc8d59','#fee090','#e0f3f8','#91bfdb','#4575b4'];

                                  var age = ["Pump","Work House","Brewery","0-10","11-20","21-40","41-60","61-80",">80"];


                                  chartGroup2.append("rect")
                                            .attr("class","legend_2")
                                            .attr("x","250")
                                            .attr("y","-40")
                                            .attr("height","200")
                                            .attr("width","200")
                                            .attr("stroke", "black")
                                            .attr("stroke-width", 2)
                                            .attr("fill","none");

                                  chartGroup2.selectAll("circle")
                                            .data(colors)
                                            .enter().append("circle")
                                            .attr("class","legend_2")
                                            .attr("cx","280")
                                            .attr("cy",function(d,i){return -20+i*20;})
                                            .attr("r","6")
                                            .attr("stroke", "black")
                                            .attr("fill",function(d,i){return d;});

                                  chartGroup2.selectAll("text")
                                            .data(age)
                                            .enter().append("text")
                                            .attr("class","legend_2")
                                            .attr("x","295")
                                            .attr("y",function(d,i){return -15+i*20})
                                            .attr("text-anchor", "left")
                                            .style("font-size", "16px")
                                            .text(function(d,i){return d;});



                                  };



d3.csv("deathdays.csv")
    .row(function(d){return {date: parseDate(d.date), deaths:Number(d.deaths)};})
    .get(function(error, data){

    var data_version2 = data;
    var height = 250;
    var width = 600;
    var tooltip4 = d3.select("body").append("div").style("opacity","0").style("position","absolute");
    var max = d3.max(data, function(d){return d.deaths;});
    var minDate = d3.min(data, function(d){return d.date;});
    var maxDate = d3.max(data, function(d){return d.date;});

    var y = d3.scaleLinear()
                .domain([0, max])
                .range([height,0]);

    var x = d3.scaleTime()
              .range([0, width]);

    var x2 = d3.scaleTime().domain([minDate, maxDate]).range([0, width]);
    var y2 = d3.scaleLinear().range([20, 0]);

    var y_axis = d3.axisLeft(y);
    var x_axis = d3.axisBottom(x);
    var xAxis2 = d3.axisBottom(x2);

    x.domain([minDate, maxDate]);

    var margin = {left:50, right:0, top:60, bottom:0};
    var margin2 = {top: 370, right: 20, bottom: 30, left: 50};

    var brush = d3.brushX()
                  .extent([[0, 0], [width, 40]])
                  .on("brush", brushed);

    var chartGroup3 = svg1.append("g")
                      .attr("transform","translate("+margin.left+","+margin.top+")");

    svg1.append("defs").append("clipPath")
                      .attr("id", "clip")
                    .append("rect")
                      .attr("width", width)
                      .attr("height", height);
    var context = svg1.append("g")
                      .attr("class", "context")
                      .attr("transform", "translate(" + margin2.left + "," + margin2.top+ ")");
    var line = d3.line()
                  .x(function(d){return x(d.date); })
                  .y(function(d){return y(d.deaths); });

    chartGroup3.append("path").attr("d", line(data)).attr("class","time");
    chartGroup3.append("g").attr("class","xaxis").attr("transform","translate(0,"+height+")").call(x_axis);
    chartGroup3.append("g").attr("class","yaxis").call(y_axis);

    chartGroup3.append("text")
              .attr("transform",
                    "translate(" + (width/2) + " ," +
                                   (height + margin.top) + ")")
              .attr("dy", "-0.8em")
              .style("text-anchor", "middle")
              .text("Date");


    chartGroup3.append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 0 - margin.left)
              .attr("x",0 - (height / 2))
              .attr("dy", "1em")
              .style("text-anchor", "middle")
              .text("No. of Deaths");

      chartGroup3.append("g").append("text")
          .attr("x", (width / 2))
          .attr("y", -40)
          .attr("class","title")
          .attr("text-anchor", "middle")
          .style("font-size", "18px")
          .style("text-decoration", "bolc")
          .text("Timeline: Date vs. No. of Deaths");

          chartGroup3.append("g").append("text")
              .attr("x", (width / 2))
              .attr("y", -40)
              .attr("class","title")
              .attr("text-anchor", "middle")
              .style("font-size", "18px")
              .style("text-decoration", "bold")
              .text("Timeline: Date vs. No. of Deaths");

    chartGroup3.selectAll("circle")
        .data(data)
        .enter().append("circle")
                .attr("class", "grp")
                .attr("cx",function(d,i){return x(d.date);})
                .attr("cy",function(d,i){return y(d.deaths);})
                .attr("r","3")
                .on("mouseover", function(d){
                  d3.select(this)
                      .transition()
                        .attr("r","6");
                  tooltip4.style("opacity","1")
                             .style("opacity","1")
                             .style("left",d3.mouse(this)[0]+800+"px")
                             .style("top",d3.mouse(this)[1]+100+"px")
                             .style("background","lightblue")
                             .style("border-radius","8px")
                             .style("padding","2px");
                        tooltip4.html("Date:"+formatMonth(d.date)+" <br> No. of Deaths:"+d.deaths);
                })
                .on("mouseout", function(d){
                  d3.select(this)
                    .transition()
                      .attr("r","3");
                    tooltip4.style("opacity","0");
                      this.style.fill="black";
                })
                .on("click", function(d,i){
                  var total_deaths = 0;
                  for(var x=0;x<i;x++){
                    total_deaths = total_deaths + data[x].deaths;
                  };
                  var start_index = total_deaths;
                  var end_index = start_index + data[i].deaths;
                  deaths_by_index(start_index, end_index);
                  update_bar(start_index, end_index);
                });

                context.append("g")
                      .attr("class", "xaxis2")
                      .attr("transform", "translate(0, 20)")
                      .call(xAxis2);

                context.append("g")
                      .attr("class", "brush")
                      .call(brush)
                      .call(brush.move, x.range());

                function brushed() {
                  var selection = d3.event.selection;

                    x.domain(selection.map(x2.invert, x2));
                    var extent = selection.map(x2.invert, x2);
                    data_updated = data.filter(function(d){return d.date>=extent[0]&& d.date<= extent[1];});

                    chartGroup3.select(".xaxis")
                          .call(xAxis);

                    chartGroup3.selectAll("path.time")
                            .attr("d", line(data_updated))
                            .attr("class","time");

                          chartGroup3.selectAll("circle.grp").remove();
                            chartGroup3.selectAll("circle.grp")
                                    .data(data_updated)
                                    .enter().append("circle")
                                            .attr("class", "grp")
                                            .attr("cx",function(d,i){return x(d.date);})
                                            .attr("cy",function(d,i){return y(d.deaths);})
                                            .attr("r","3")
                                            .on("mouseover", function(d){
                                              d3.select(this)
                                                  .transition()
                                                    .attr("r","6");
                                              tooltip4.style("opacity","1")
                                                         .style("opacity","1")
                                                         .style("left",d3.mouse(this)[0]+800+"px")
                                                         .style("top",d3.mouse(this)[1]+100+"px")
                                                         .style("background","lightblue")
                                                         .style("border-radius","8px")
                                                         .style("padding","2px");
                                                    tooltip4.html("Date:"+formatMonth(d.date)+" <br> No. of Deaths:"+d.deaths);
                                            })
                                            .on("mouseout", function(d){
                                              d3.select(this)
                                                .transition()
                                                  .attr("r","3");
                                                tooltip4.style("opacity","0");
                                                  this.style.fill="black";
                                          })
                                            .on("click", function(d,i){
                                              var total_deaths = 0;
                                              for(var x=0;x<i;x++){
                                                total_deaths = total_deaths + data_updated[x].deaths;
                                              };

                                                var start_index = total_deaths;
                                                var end_index = start_index + data_updated[i].deaths;
                                                deaths_by_index(start_index, end_index);
                                                update_bar(start_index, end_index);
                                              });

                };

                var chartGroup4 = svg3.append("g")
                                  .attr("transform","translate(100,80)");

              var age_groups = ["0-10","11-20","21-40","41-60","61-80",">80"];


              window.update_bar = function (start_index = 0, end_index = deaths.length-1){
                        newdata = deaths.slice(start_index, end_index);
                        var tooltip5 = d3.select("body").append("div").style("opacity","0").style("position","absolute");
                        nested_data = d3.nest()
                                        .key(function(d) { return d.age; })
                                        .key(function(d) { return d.gender; })
                                        .sortKeys(function(a,b){ return d3.ascending(a.age, b.age);})
                                        .rollup(function(leaves) { return leaves.length; })
                                        .entries(newdata);
                            chartGroup4.selectAll(".age_bars").remove();

                            var age_groups = ["0-10","11-20","21-40","41-60","61-80",">80"];
                            var groups = d3.map(nested_data, function(d){return d.key;}).keys();
                            var groups = groups.sort(function(a,b){return d3.ascending(a,b);});

                            var subgroups = [0,1];

                              var arr=[];
                              nested_data.map(function(d) {
                                    arr = arr.concat.apply(arr, d.values);
                                  });

                              maxValue = d3.max(arr, function(d){return d.value;});

                            var x1 = d3.scaleBand()
                                        .domain(groups)
                                        .range([0,450])
                                        .padding(0.2);

                            var y1 = d3.scaleLinear()
                                      .domain([0,maxValue])
                                      .range([height,0]);

                              var xSubgroup = d3.scaleBand()
                                                .domain(subgroups)
                                                .range([0, x1.bandwidth()])
                                                .padding([0.05]);

                                var color = d3.scaleOrdinal()
                                              .domain(subgroups)
                                              .range(["#376b37","#c38eb1"]);
                                              //

                            var x_axis1 = d3.axisBottom(x1).ticks(6).tickFormat(function(d,i){
                                                                                return age_groups[i];});
                            var y_axis1 = d3.axisLeft(y1);

                            chartGroup4.append("g").attr("class","age_bars").attr("transform","translate(0,"+height+")").call(x_axis1);
                            chartGroup4.append("g").attr("class","age_bars").call(y_axis1);

                        chartGroup4.append("g")
                                    .selectAll("g")
                                    .data(nested_data)
                                    .enter().append("g")
                                      .attr("transform", function(d) { return "translate(" + x1(d.key) + ",0)"; })
                                      .attr("class","age_bars")
                                      .selectAll("rect")
                                      .data(function(d){return d.values;})
                                      .enter().append("rect")
                                        .attr("x", function(d) { return xSubgroup(d.key); })
                                        .attr("y", function(d) { return y1(d.value); })
                                        .attr("width", xSubgroup.bandwidth())
                                        .attr("height", function(d) { return height - y1(d.value); })
                                        .attr("fill", function(d) { return color(d.key); })
                                        .on("mouseover", function(d){
                                          tooltip5.style("opacity","1")
                                                     .style("left",d3.event.pageX+"px")
                                                     .style("top",d3.event.pageY+"px")
                                                     .style("background","lightblue")
                                                     .style("border-radius","8px")
                                                     .style("padding","2px");

                                                tooltip5.html("No. of Deaths:"+d.value);
                                        })
                                        .on("mouseout", function(d){
                                            tooltip5.style("opacity","0");
                                              this.style.fill=color(d.key);
                                      });


                };


                  update_bar();

                //Legends and Axes labels for Bar Chart
                chartGroup4.append("g").append("text")
                              .attr("x", 200)
                              .attr("y", -20)
                              .attr("class","title2")
                              .attr("text-anchor", "middle")
                              .style("font-size", "18px")
                              .style("text-decoration", "bold")
                              .text("Deaths by Age& Gender");

                chartGroup4.append("text")
                          .attr("transform",
                                "translate(200  ," +
                                               (height + margin.top) + ")")
                          .attr("dy", "-0.8em")
                          .style("text-anchor", "middle")
                          .text("Age Group");


                chartGroup4.append("text")
                          .attr("transform", "rotate(-90)")
                          .attr("y", 0 - margin.left)
                          .attr("x",0 - (height / 2))
                          .attr("dy", "1em")
                          .style("text-anchor", "middle")
                          .text("No. of Deaths");
D
                textgender = ["Male","Female"];
                colorgender = ['#376b37','#c38eb1'];

                chartGroup4.append("rect")
                          .attr("class","legend_2a")
                          .attr("x","480")
                          .attr("y","0")
                          .attr("height","100")
                          .attr("width","100")
                          .attr("stroke", "black")
                          .attr("stroke-width", 2)
                          .attr("fill","none");

                chartGroup4.selectAll("circle")
                          .data(colorsgender)
                          .enter().append("circle")
                          .attr("class","legend_2a")
                          .attr("cx","500")
                          .attr("cy",function(d,i){return 45+25*i ;})
                          .attr("r","6")
                          .attr("stroke", "black")
                          .attr("fill",function(d){return d;});

                chartGroup4.append("text")
                          .attr("class","legend_2c")
                          .attr("x","520")
                          .attr("y", "75")
                          .attr("text-anchor", "left")
                          .style("font-size", "16px")
                          .text("Female");

                chartGroup4.append("text")
                          .attr("class","legend_2c")
                          .attr("x","520")
                          .attr("y", "50")
                          .attr("text-anchor", "left")
                          .style("font-size", "16px")
                          .text("Male");

                chartGroup4.append("text")
                          .attr("class","legend_2b")
                          .attr("x","500")
                          .attr("y","25")
                          .attr("text-anchor", "left")
                          .style("font-size", "16px")
                          .text("Gender");





});
