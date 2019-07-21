import React, { Component } from "react"
import * as d3 from "d3"

class Graph extends Component {
    componentWillReceiveProps(props) {
        const graph = props.graph
        const graphSVG = d3.select("#graph")
        const padding = 100
        const width = graphSVG.node().parentNode.clientWidth
        graphSVG.attr("width", width).attr("height", width)
        .append("rect")
            .attr("x",50)
            .attr("y",50)
            .attr("width",18)
            .attr("height",18)
            .attr("fill","#FFD700")
        graphSVG.append("text")
            .text("MP*1")
            .attr("x",75)
            .attr("y",65)
            .attr("font-size",20)
        graphSVG.append("rect")
            .attr("x",180)
            .attr("y",50)
            .attr("width",18)
            .attr("height",18)
            .attr("fill","#FF0000")
        graphSVG.append("text")
            .text("MP*2")
            .attr("x",205)
            .attr("y",65)
            .attr("font-size",20)
        graphSVG.append("rect")
            .attr("x",310)
            .attr("y",50)
            .attr("width",18)
            .attr("height",18)
            .attr("fill","#080808")
        graphSVG.append("text")
            .text("PC")
            .attr("x",335)
            .attr("y",65)
            .attr("font-size",20)
        graphSVG.append("rect")
            .attr("x",440)
            .attr("y",50)
            .attr("width",18)
            .attr("height",18)
            .attr("fill","#0000CD")
        graphSVG.append("text")
            .text("PC*")
            .attr("x",465)
            .attr("y",65)
            .attr("font-size",20)
        graphSVG.append("rect")
            .attr("x",570)
            .attr("y",50)
            .attr("width",18)
            .attr("height",18)
            .attr("fill","#00CD00")
        graphSVG.append("text")
            .text("PSI*")
            .attr("x",595)
            .attr("y",65)
            .attr("font-size",20)

        const simulation = d3
            .forceSimulation()
            .force(
                "link",
                d3.forceLink().id(function(d) {
                    return d.id
                })
            )
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, width / 2))

        simulation.nodes(graph.nodes).on("tick", ticked)
        console.log(graph)
        simulation.force("link").links(graph.links)
        const link = graphSVG
            .append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter()
            .append("line")
            .attr("stroke", "#d9dde2")
            .attr("stroke-width", function(data,i){
                if(data.weight>8){
                    return 8+"px"}
                else{
                    return data.weight+"px"
                }
            });
        const node = graphSVG
            .append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter()
            .append("circle")
            .attr("r", 8)
        function ticked() {
            let max = {}
            let min = {}
            max.x = d3.max(graph.nodes, n => n.x)
            max.y = d3.max(graph.nodes, n => n.y)
            min.x = d3.min(graph.nodes, n => n.x)
            min.y = d3.min(graph.nodes, n => n.y)
            const xScale = d3
                .scaleLinear()
                .domain([min.x, max.x])
                .range([padding, width - padding])
            const yScale = d3
                .scaleLinear()
                .domain([min.y, max.y])
                .range([padding, width - padding])
            link.attr("x1", function(d) {
                return xScale(d.source.x)
            })
                .attr("y1", function(d) {
                    return yScale(d.source.y)
                })
                .attr("x2", function(d) {
                    return xScale(d.target.x)
                })
                .attr("y2", function(d) {
                    return yScale(d.target.y)
                })
            node.attr("cx", function(d) {
                return xScale(d.x)
            }).attr("cy", function(d) {
                return yScale(d.y)
                //console.log(d.x,d.y)
            }).attr("fill",function(data,i){
                if(data.class=="MP*1"){
                    return "#FFD700"
                }
                if(data.class=="MP*2"){
                    return "#FF0000"
                }
                if(data.class=="PC"){
                    return "#080808"
                }
                if(data.class=="PC*"){
                    return "#0000CD"
                }
                if(data.class=="PSI*"){
                    return "#00CD00"
                }
            })
        }
        
    }
    render() {
        return (
        <svg id="graph" />
        )
       
    }
}

export default Graph
