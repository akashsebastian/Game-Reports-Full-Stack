import React from "react";
import { Component } from "react";
import Search from "../search/Search";
import { METRIC_SINGLE_GRAPH } from "../../utils/constants";

import {
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
} from "victory";

// Class to plot bar graph when a category is click in the Game Report
export default class BarGraphSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metric: METRIC_SINGLE_GRAPH,
      metricUpdateVariable: "column_name",
      metricKey: this.props.metricKey,
    };
  }

  componentDidMount() {
    this.setState({
      gotMetric: true,
      metricColumn: this.state.metric[this.props.metricKey][0].column_name,
      metricKey: this.props.metricKey,
      metricData: this.props.metricData,
    });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.metricKey !== prevState.metricKey) {
      return {
        metricKey: nextProps.metricKey,
        metricColumn: prevState.metric[nextProps.metricKey][0].column_name,
        metricData: nextProps.metricData,
      };
    } else {
      return {
        metricData: nextProps.metricData,
      };
    }
  }
  updateMetric = (metric) => {
    if (metric) {
      this.setState({
        metricColumn: metric,
        gotMetric: true,
      });
    }
  };

  getMetricOption = (option) => {
    return option.name;
  };

  render() {
    let graph, dataset;
    if (this.state.gotMetric) {
      if (
        this.state.metricKey === "Open Three Pointers" ||
        this.state.metricKey === "Contested Three Pointers"
      ) {
        let split = this.state.metricColumn.split("_");
        let last = split.pop();
        let first = split.join("_");
        dataset = [
          {
            x: "Daily",
            y: this.state.metricData[first + "_daily_" + last],
            label: this.state.metricData[first + "_daily_" + last],
            greater:
              this.state.metricData[first + "_daily_" + last] >
              this.state.metricData[first + "_total_" + last]
                ? true
                : false,
          },
          {
            x: "Average",
            y: this.state.metricData[first + "_total_" + last],
            label: Number(
              this.state.metricData[first + "_total_" + last]
            ).toFixed(2),
            greater:
              this.state.metricData[first + "_daily_" + last] <
              this.state.metricData[first + "_total_" + last]
                ? true
                : false,
          },
        ];
      } else {
        dataset = [
          {
            x: "Daily",
            y: this.state.metricData[this.state.metricColumn + "_daily"],
            label: this.state.metricData[this.state.metricColumn + "_daily"],
            greater:
              this.state.metricData[this.state.metricColumn + "_daily"] >
              this.state.metricData[this.state.metricColumn + "_total"]
                ? true
                : false,
          },
          {
            x: "Average",
            y: this.state.metricData[this.state.metricColumn + "_total"],
            label: Number(
              this.state.metricData[this.state.metricColumn + "_total"]
            ).toFixed(2),
            greater:
              this.state.metricData[this.state.metricColumn + "_daily"] <
              this.state.metricData[this.state.metricColumn + "_total"]
                ? true
                : false,
          },
        ];
      }
      graph = (
        <div>
          <div className="App">
            <VictoryChart
              vertical
              height={300}
              width={200}
              domainPadding={{ x: 30, y: 20 }}
              theme={VictoryTheme.material}
              animate={{ duration: 500 }}
            >
              <VictoryStack colorScale={["black"]}>
                <VictoryBar
                  labelComponent={<VictoryLabel />}
                  style={{
                    data: {
                      fill: ({ datum }) =>
                        datum.greater ? "#0AE30A" : "#FF0000",
                    },
                  }}
                  data={dataset}
                  barRatio={0.8}
                />
              </VictoryStack>
              <VictoryAxis
                dependentAxis
                style={{
                  axis: {
                    stroke: "none",
                  },
                  tickLabels: {
                    fontSize: 12,
                    lineHeight: 18,
                    color: "red",
                  },
                  ticks: {
                    stroke: "none",
                  },
                  grid: {
                    stroke: "none",
                    strokeDasharray: "none",
                  },
                }}
              />
              <VictoryAxis
                crossAxis
                offsetX={50}
                style={{
                  grid: {
                    stroke: "none",
                  },
                }}
              />
            </VictoryChart>
          </div>
        </div>
      );
    }
    return (
      <div key={this.props.metricKey}>
        <div>
          <Search
            data={this.state.metric[this.state.metricKey]}
            updateFunction={this.updateMetric}
            updateVariable={this.state.metricUpdateVariable}
            optionFunc={this.getMetricOption}
            defaultValue={this.state.metric[this.state.metricKey][0]}
            label="Select Metric"
          />
        </div>
        <div>{graph}</div>
      </div>
    );
  }
}
