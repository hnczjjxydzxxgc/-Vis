import React from "react"
import * as d3 from "d3"
import "./App.css"
import { Col, Row } from "antd"
import Snapshots from "./snapshots"
import Graph from "./graph"
import Scatter from "./scatter"
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            snapshots: [],
            graph: {},
            scatter:{},
            scatter_lines:{},
            res: 0,
        }
    }

    componentDidMount() {
        d3.json("./test_data.json").then(snapshots => {
            //console.log(snapshots)
            //console.log("scatter[0]");
            //console.log("scatter[0]" + snapshots[1][0]);
            this.setState({
                snapshots: snapshots[0],
                graph: snapshots[0][this.state.res].graph,
                scatter: snapshots[1][0],
                scatter_lines: snapshots[2][0]
            })
        })
        // d3.json("./test_datas.json").then(scatter => {
        //     //console.log(snapshots)
        //     console.log("scatter[0]");
        //     this.setState({
        //         scatter: scatter[0],
        //     })
        // })
    }
    //子组件传递数据
    getChildData=(res)=>{
        console.log(res)
        // this.setState({
        //     res:res
        // })
        //d3.select("#graph").remove()
        // delete(document.getElementById('graph'))
        // 清除画布
        d3.select("#graph").selectAll("line").remove()
        d3.select("#graph").selectAll("circle").remove()
        d3.select("#scatter").selectAll("line").remove()
        d3.select("#scatter").selectAll("circle").remove()


        d3.json("./test_data.json").then(snapshots => {
            this.setState({
                res:res,
                snapshots: snapshots[0],
                graph: snapshots[0][res].graph,
                scatter: snapshots[1][res],
                scatter_lines: snapshots[2][res],
            })
        })
		// this.setState({
		// 		msg:res
        // })
        //console.log(this.state.msg)
        //ReactDOM.render(element, container[, callback])
        
        this.render()
        //return res
	}

    render() {
        const snapshots = this.state.snapshots
        const graph = this.state.graph
        const scatter = this.state.scatter
        const scatter_lines = this.state.scatter_lines
        var can=document.getElementById("huaban");//获得画板数据

        return (
            <div className="App">
                    <Col span={5}>
                        <Scatter  scatter={scatter} scatter_lines = {scatter_lines}/>
                    </Col>

                    <Col span={9}>
                        <Snapshots snapshots={snapshots} news={this}/>
                    </Col>

                    <Col span={9}>
                        <Row >
                            <Graph  graph={graph} />
                        </Row>
                    </Col>
                   
                    

                    {/* <hr style="border-right:red 1px dashed;border-top:red 1px dashed;left:100px;border-ledt:red 1px dashed;width:1px;border-bottom:red 1px dashed;top:100px;height:199px"></hr> */}
            </div>
            
        )
    }
}


export default App
