import React from "react";
import { Component } from 'react';
import { render } from "react-dom";
import {withRouter} from 'react-router-dom'

import {
    VictoryBar,
    VictoryChart,
    VictoryLine,
    VictoryStack,
    VictoryPie,
    VictoryTheme,
    VictoryLabel,
    VictoryGroup,
    VictoryAxis,
    VictoryTooltip
  } from "victory";

class BarGraphTotal extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props.dataset)
        // this.state.dataset.map((data, i) => {
        //     console.log("Bar graph data: " + data)
        // })
    }
    transformData(dataset) {
        return dataset.map((data) => {
            console.log("Data in map:  "+ data)
            let label = '', result, routeVariable;
            if (data.team_id == data.home_team_id) {
                label += 'vs ' + data.away_team_name;
                if (data.home_team_score > data.away_team_score) {
                    label += '\nResult: W';
                    result = true;
                }
                else {
                    label += '\nResult: L';
                    result = false;
                }
            }
            else{
                label += '@ ' + data.home_team_name
                if (data.home_team_score > data.away_team_score) {
                    label += '\nResult: L';
                    result = false;
                }
                else {
                    label += '\nResult: W';
                    result = true;
                }
            }
            // label += '\n' + this.props.metric + ' : ' + data[this.props.metric] > 0 ? '+' : '' + data[this.props.metric];
            // label += '\nClick to see Game Report'
            if (this.props.routeVariable == 'game_id') {
                routeVariable = data[this.props.routeVariable].toString().substring(0,2) == '00' ? data[this.props.routeVariable] : '00' + data[this.props.routeVariable]
            }
            return {'x' : data.date, 'y' : data[this.props.metric], 'label' : label, 'result': result, [this.props.routeVariable]: routeVariable}
        })
    }
    render() {
        console.log(this.transformData(this.props.dataset))
        const dataset = this.transformData(this.props.dataset)
        console.log("Dataset" + dataset)
        return (
            <div>
                {/* <h1>Bar Graph Total</h1> */}
                <div className="App">
                    <VictoryChart
                        vertical
                        height={250}
                        width={500}
                        domainPadding={{ x: 30, y: 20 }}
                        theme={VictoryTheme.material}
                        animate={{duration: 500}}
                    >
                        <VictoryStack colorScale={["black"]}>
                        {/* {this.state.dataset.map((data, i) => {
                            return <VictoryBar data={} />;
                        })} */}
                        <VictoryBar
                            labelComponent={
                                <VictoryTooltip
                                    // pointerLength={0}
                                    // cornerRadius={0}
                                />
                            }
                            style = {{
                                data : {
                                    fill: ({datum}) => datum.result ?  "#0AE30A" : "#FF0000"
                                }
                            }}
                            data={dataset}
                            barRatio = {0.6}
                            events={[
                                {
                                    target : 'data',
                                    eventHandlers : {
                                        onClick: (evt, clickedProps) => {
                                            this.props.history.push('/' + this.props.routeEndPoint + '?' + this.props.routeVariable + '=' + clickedProps.datum[this.props.routeVariable] + '&date=' + clickedProps.datum.x)
                                        }
                                    }
                                }
                            ]}
                        />
                        </VictoryStack>
                        <VictoryAxis
                        dependentAxis
                        style={{
                            axis: {
                            stroke: "none"
                            },
                            tickLabels: {
                            fontSize: 12,
                            lineHeight: 18,
                            color: "red"
                            },
                            ticks: {
                            stroke: "none"
                            },
                            grid: {
                            strokeDasharray: "none"
                            }
                        }}
                        // tickValues={[-6, -4, -2, 0, 2, 4, 6, 8]}
                        />
                        {/* <VictoryAxis
                        crossAxis
                        offsetX={50}
                        style={{
                            axis: {
                            stroke: "#D6D8DF",
                            strokeWidth: "1px"
                            },
                            // tickLabels: {
                            // fontSize: 12,
                            // lineHeight: 18,
                            // color: "red"
                            // },
                            // ticks: {
                            // stroke: "none"
                            // },
                            grid: {
                            stroke: "none"
                            }
                        }}
                        />
                        <VictoryAxis
                        standalone={false}
                        style={{
                            axis: { stroke: "gray" }
                        }}
                        /> */}
                    </VictoryChart>
                    </div>
            </div>
        )
    }
}

export default withRouter(BarGraphTotal)