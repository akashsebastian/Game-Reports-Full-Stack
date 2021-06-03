import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";

import {
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
  VictoryAxis,
  VictoryTooltip,
} from "victory";

// Class to plot Bar Graphs for Team and Player Reports
class BarGraphTotal extends Component {
  transformData(dataset) {
    return dataset.map((data) => {
      let label = "",
        result,
        routeVariable;
      if (data.team_id === data.home_team_id) {
        label += "vs " + data.away_team_name;
        result = data.home_team_score > data.away_team_score ? true : false;
      } else {
        label += "@ " + data.home_team_name;
        result = data.home_team_score > data.away_team_score ? false : true;
      }
      label = label + "\nValue : " + Number(data[this.props.metric]).toFixed(2);
      if (this.props.routeVariable === "game_id") {
        routeVariable =
          data[this.props.routeVariable].toString().substring(0, 2) === "00"
            ? data[this.props.routeVariable]
            : "00" + data[this.props.routeVariable];
      }
      return {
        x: data.date,
        y: data[this.props.metric],
        label: label,
        result: result,
        [this.props.routeVariable]: routeVariable,
      };
    });
  }
  render() {
    const dataset = this.transformData(this.props.dataset);
    return (
      <div>
        <div className="App">
          <VictoryChart
            vertical
            height={250}
            width={500}
            domainPadding={{ x: 30, y: 20 }}
            theme={VictoryTheme.material}
            animate={{ duration: 500 }}
          >
            <VictoryStack colorScale={["black"]}>
              <VictoryBar
                labelComponent={<VictoryTooltip />}
                style={{
                  data: {
                    fill: ({ datum }) => (datum.result ? "#0AE30A" : "#FF0000"),
                  },
                }}
                data={dataset}
                barRatio={0.6}
                events={[
                  {
                    target: "data",
                    eventHandlers: {
                      onClick: (evt, clickedProps) => {
                        this.props.history.push(
                          "/" +
                            this.props.routeEndPoint +
                            "?" +
                            this.props.routeVariable +
                            "=" +
                            clickedProps.datum[this.props.routeVariable] +
                            "&date=" +
                            clickedProps.datum.x
                        );
                      },
                    },
                  },
                ]}
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
                  strokeDasharray: "none",
                },
              }}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default withRouter(BarGraphTotal);
