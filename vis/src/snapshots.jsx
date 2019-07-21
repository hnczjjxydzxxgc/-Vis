import React, { Component } from "react"
import * as d3 from "d3"
import { rgb } from "d3-color";

class Snapshots extends Component {
    constructor(props) {
        super(props)
        this.state={
            grahfi:null,
        }
    }

    
    componentWillReceiveProps(props) {
        const snapshots = props.snapshots
        const snapshotSVG = d3.select("#snapshot")
        const padding = 100
        const width = snapshotSVG.node().parentNode.clientWidth
        const dataset = 100

        var defs = d3.select("#snapshot").append("defs");  
        var a = d3.rgb(255,0,0);    //红色  
        var b = d3.rgb(255,128,0);    //绿色  
        var c = d3.rgb(255,255,0)
        var d = d3.rgb(0,255,0)
        var e = d3.rgb(0,0,255)
        var f = d3.rgb(64,128,128)
        var g = d3.rgb(128,0,128)
        var h = d3.rgb(128,0,0)
        var i = d3.rgb(64,0,64)


        var compute = d3.interpolate(a,b);  
        var linearGradient = defs.append("linearGradient")  
                        .attr("id","linearColor")  
                        .attr("x1","0%")  
                        .attr("y1","0%")  
                        .attr("x2","100%")  
                        .attr("y2","0%");  

        var stop1 = linearGradient.append("stop")  
                .attr("offset","0%")  
                .style("stop-color",a.toString());  

        var stop2 = linearGradient.append("stop")  
                .attr("offset","10%")  
                .style("stop-color",b.toString());  
        
        var stop3 = linearGradient.append("stop")  
                .attr("offset","20%")  
                .style("stop-color",c.toString());  

        var stop4 = linearGradient.append("stop")  
                .attr("offset","30%")  
                .style("stop-color",d.toString());
        var stop5 = linearGradient.append("stop")  
                .attr("offset","40%")  
                .style("stop-color",e.toString());
        var stop6 = linearGradient.append("stop")  
                .attr("offset","50%")  
                .style("stop-color",f.toString());
        var stop7 = linearGradient.append("stop")  
                .attr("offset","60%")  
                .style("stop-color",g.toString());
        var stop8 = linearGradient.append("stop")  
                .attr("offset","70%")  
                .style("stop-color",h.toString());
        var stop9 = linearGradient.append("stop")  
                .attr("offset","80%")  
                .style("stop-color",i.toString());
        snapshotSVG.attr("width", width).attr("height", width)
        .append("rect")
        .attr("x",50)
        .attr("y",40)
        .attr("width",150)
        .attr("height",15)
        .attr("data",40)
        .style("fill","url(#" + linearGradient.attr("id") + ")")
        .append("text")
        .attr("x",0).attr("y",0).attr("fill","red").attr("font-size",30)
        .text( "zxcedsfczc")
        snapshotSVG.append("text")
        .text("2012/11/19 \n06:36")
        .attr("x",10)
        .attr("y",70)
        snapshotSVG.append("text")
        .text("2012/11/27 \n17:14")
        .attr("x",150)
        .attr("y",70)
        
        
        

        const max = {}
        const min = {}
        max.x = d3.max(snapshots, snpst => snpst.vector[0])
        max.y = d3.max(snapshots, snpst => snpst.vector[1])
        min.x = d3.min(snapshots, snpst => snpst.vector[0])
        min.y = d3.min(snapshots, snpst => snpst.vector[1])

        const xScale = d3
            .scaleLinear()
            .domain([min.x, max.x])
            .range([padding, width - padding])
        const yScale = d3
            .scaleLinear()
            .domain([min.y, max.y])
            .range([padding, width - padding])

        const snapshotLinkData = []
        for (let i = 0; i < snapshots.length - 1; i++) {
            snapshotLinkData.push([
                snapshots[i].vector,
                snapshots[i + 1].vector
            ])
        }
        const snapshotLink = snapshotSVG
            .selectAll("line")
            .data(snapshotLinkData)
        snapshotLink.exit().remove()
        snapshotLink
            .enter()
            .append("line")
            .attr("x1", d => xScale(d[0][0]))
            .attr("x2", d => xScale(d[1][0]))
            .attr("y1", d => yScale(d[0][1]))
            .attr("y2", d => yScale(d[1][1]))
            .attr("stroke", "#d9dde2")
            .attr("stroke-width", 3)

        const pointsData = snapshots.map(snpst => snpst.vector)
        const points = snapshotSVG.selectAll("circle").data(pointsData)
        points.exit().remove()
        points
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d[0]))
            .attr("cy", d => yScale(d[1]))
            .attr("r", 5)
            .attr("fill", function(data,i){
            if(snapshots[i]["day"]["days"]=="2012/11/19"){ return "rgb(255,0,0)"}
            if(snapshots[i]["day"]["days"]=="2012/11/20"){ return "rgb(255,128,0)" }
            if(snapshots[i]["day"]["days"]=="2012/11/21"){ return "rgb(255,255,0)"; }
            if(snapshots[i]["day"]["days"]=="2012/11/22"){ return "rgb(0,255,0)"; }
            if(snapshots[i]["day"]["days"]=="2012/11/23"){ return "rgb(0,0,255)"; }
            if(snapshots[i]["day"]["days"]=="2012/11/24"){ return "rgb(64,128,128)"; }
            if(snapshots[i]["day"]["days"]=="2012/11/25"){ return "rgb(128,0,128)"; }
            if(snapshots[i]["day"]["days"]=="2012/11/26"){ return "rgb(128,0,0)"; }
            if(snapshots[i]["day"]["days"]=="2012/11/27"){ return "rgb(64,0,64)"; }
            })
            
               // if(i < 100){ return "rgb(80,255,"+(255 - i*2)+")";}
               // else{return "rgb(80,"+(255 - i/3 + 200)+",0)";}
                
           // })
            .on("click", (d, i) => {
                this.setState({
                    grahfi:i,
                });
                // console.log(this.state.grahfi)
                //console.log(d, i);

            })
            

    
    }
    render() {
        return <svg id="snapshot" onClick={
                // console.log(this.state.grahfi),
                this.props.news.getChildData.bind(this,this.state.grahfi)
        }
        />
    }
}

export default Snapshots
