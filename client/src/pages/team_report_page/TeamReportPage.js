import React from "react";
import { Component } from "react";
import axios from "axios";
import "../../css/style.css";
import Search from "../../components/search/Search";
import BarGraphTotal from "../../components/bar_graph_total/BarGraphTotal";
import { METRIC_REPORT } from "../../utils/constants";

// Team Report Page
export default class TeamReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team_id: null,
      teams: [],
      gotTeams: false,
      teamsLabel: "Select Team",
      teamUpdateVariable: "team_id",
      disableCategory: true,
      categories: [
        { name: "Drives" },
        { name: "Pull Up Shooting" },
        { name: "Catch and Shoot" },
        { name: "Open Three Pointers" },
        { name: "Contested Three Pointers" },
      ],
      category: null,
      categoryUpdateVariable: "name",
      metric: METRIC_REPORT,
      categoryLabel: "Select Category",
      disableMetric: true,
      metricLabel: "Select Metric",
      metricUpdateVariable: "column_name",
      metricColumn: null,
      gotMetric: false,
      gotTeamReportTotal: false,
      routeVariable: "game_id",
      routeEndPoint: "game-report",
    };
  }

  componentDidMount() {
    axios.get("/api/v1/get-teams").then((res) => {
      const response = res.data.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      this.setState({
        teams: response,
        gotTeams: true,
      });
    });
  }

  updateTeamId = (team_id) => {
    if (team_id) {
      this.setState({
        team_id: team_id,
        disableCategory: false,
      });
      axios
        .get("/api/v1/get-team-report-total?team_id=" + team_id)
        .then((res) => {
          const response = res.data;
          this.setState({
            teamReportTotal: response,
            gotTeamReportTotal: true,
          });
        });
    }
  };

  updateCategory = (category) => {
    if (category) {
      this.setState({
        category: category,
        disableMetric: false,
      });
    }
  };

  updateMetric = (metric) => {
    if (metric) {
      this.setState({
        metricColumn: metric,
        gotMetric: true,
      });
    }
  };

  getTeamOption = (option) => {
    return option.city + " " + option.name;
  };

  getCategoryOption = (option) => {
    return option.name;
  };

  getMetricOption = (option) => {
    return option.name;
  };

  render() {
    let teamsSearchBar,
      categorySearchBar,
      metricSearchBar,
      metricData = [],
      teamReportGraph,
      graphInfo;
    if (this.state.category) {
      metricData = this.state.metric[this.state.category];
    }
    if (this.state.gotTeams) {
      teamsSearchBar = (
        <Search
          data={this.state.teams}
          updateFunction={this.updateTeamId}
          updateVariable={this.state.teamUpdateVariable}
          optionFunc={this.getTeamOption}
          label={this.state.teamsLabel}
        ></Search>
      );
      categorySearchBar = (
        <Search
          data={this.state.categories}
          updateFunction={this.updateCategory}
          updateVariable={this.state.categoryUpdateVariable}
          isDisabled={this.state.disableCategory}
          optionFunc={this.getCategoryOption}
          label={this.state.categoryLabel}
        ></Search>
      );
      metricSearchBar = (
        <Search
          data={metricData}
          updateFunction={this.updateMetric}
          updateVariable={this.state.metricUpdateVariable}
          isDisabled={this.state.disableMetric}
          optionFunc={this.getMetricOption}
          label={this.state.metricLabel}
        ></Search>
      );
      graphInfo = (
        <div class="graph-info">
          <em>- Green bars are wins</em>
          <br />
          <em>- Red bars are losses</em>
          <br />
          <em>- Click bars to view Game Reports</em>
        </div>
      );
    }
    if (this.state.gotTeamReportTotal && this.state.gotMetric) {
      teamReportGraph = (
        <BarGraphTotal
          dataset={this.state.teamReportTotal}
          metric={this.state.metricColumn}
          routeVariable={this.state.routeVariable}
          routeEndPoint={this.state.routeEndPoint}
        />
      );
    }
    return (
      <div class="main-container">
        <div class="filters-container">
          <div>
            <h1>Team Report</h1>
          </div>
          <br />
          <div>{teamsSearchBar}</div>
          <br />
          <div>{categorySearchBar}</div>
          <br />
          <div>{metricSearchBar}</div>
          <br />
          {graphInfo}
        </div>
        <div class="report-container">{teamReportGraph}</div>
      </div>
    );
  }
}
