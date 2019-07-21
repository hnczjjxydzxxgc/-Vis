import React, { Component } from "react"
import * as d3 from "d3"

class Scatter extends Component {
    componentWillReceiveProps(props) {
        const scatter = props.scatter
        const line_scatter = props.scatter_lines
        const scatterSVG = d3.select("#scatter")
        const padding = 100
        const width = scatterSVG.node().parentNode.clientWidth
        scatterSVG.attr("width", width).attr("height", width)
        var xscale = d3.scaleLinear()
                        .domain([0,10])
                        .range([padding,width -padding]);
        var yscale = d3.scaleLinear()
                        .domain([0,50])
                        .range([width -padding,padding]);
        var xAxis = d3.axisBottom()
                        .scale(xscale)
                        .ticks(5);
        var yAxis = d3.axisLeft()
                        .scale(yscale)
                        .ticks(5);
        scatterSVG.append("g")
                        .attr("transform","translate(0,"+(width - padding)+")")
                        .call(xAxis);
        scatterSVG.append("g")
                        .attr("transform","translate(" + padding + ",0"+ ")")
                        .call(yAxis);
                        //console.log("scatter"+scatter);
                        
        
        scatterSVG.append("g")
                        .attr("class", "links")
                        .selectAll("line")
                        .data(line_scatter)
                        .enter()
                        .append("line")
                        .attr("stroke", "#0f0")
                        .attr("fill","red")
                        .attr("x1",function(data){
                            return xscale(data["x1"]);
                        })
                        .attr("y1",function(data){
                            return yscale(data["y1"]);
                        })
                        .attr("x2",function(data){
                            return xscale(data["x2"]);
                        })
                        .attr("y2",function(data){
                            return yscale(data["y2"]);
                        });

        scatterSVG.append("g")
                        .attr("class", "circles")
                        .selectAll("circle")
                        .data(scatter)
                        .enter()
                        .append("circle")
                        .attr("cx",function(data){
                            console.log("cx");
                            console.log(xscale(data));
                            return xscale(data[0]);
                        })
                        .attr("cy",function(data){
                            console.log(yscale(data[1]));
                            return yscale(data[1]);
                        })
                        .attr("r",5);


    }
    render() {
        return <svg id="scatter" />
    }
}

export default Scatter
