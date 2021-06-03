import React from "react";
import { Component } from "react";
import axios from "axios";
import "../../css/style.css";
import Search from "../../components/search/Search";
import BarGraphTotal from "../../components/bar_graph_total/BarGraphTotal";
import { METRIC_REPORT } from "../../utils/constants";

// Player Report Page
export default class PlayerReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      gotTeams: false,
      teamUpdateVariable: "team_id",
      teamsLabel: "Filter Players by Team",
      team_id: -1,
      players: [],
      gotPlayers: false,
      playerUpdateVariable: "player_id",
      playersLabel: "Select Player",
      player_id: null,
      playerReportTotal: [],
      gotPlayerReportTotal: false,
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
    axios
      .get("/api/v1/get-players?team_id=" + this.state.team_id)
      .then((res) => {
        const response = res.data.sort(function (a, b) {
          var textA = a.player.toUpperCase();
          var textB = b.player.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        this.setState({
          players: response,
          gotPlayers: true,
        });
      });
  }

  updateTeamId = (team_id) => {
    if (team_id == null) {
      team_id = -1;
    }
    axios.get("/api/v1/get-players?team_id=" + team_id).then((res) => {
      const response = res.data.sort(function (a, b) {
        var textA = a.player.toUpperCase();
        var textB = b.player.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      this.setState({
        players: response,
      });
    });
    this.setState({
      team_id: team_id,
    });
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

  updatePlayerId = (player_id) => {
    this.setState({
      player_id: player_id,
      disableCategory: false,
    });
    axios
      .get("/api/v1/get-player-report-total?player_id=" + player_id)
      .then((res) => {
        const response = res.data;
        this.setState({
          playerReportTotal: response,
          gotPlayerReportTotal: true,
        });
      });
  };

  getPlayerOption = (option) => {
    return option.player;
  };

  getCategoryOption = (option) => {
    return option.name;
  };

  getMetricOption = (option) => {
    return option.name;
  };
  render() {
    let playersSearchBar,
      teamsSearchBar,
      playerReportGraph,
      categorySearchBar,
      metricSearchBar,
      metricData = [];
    if (this.state.category) {
      metricData = this.state.metric[this.state.category];
    }
    if (this.state.gotTeams && this.state.gotPlayers) {
      teamsSearchBar = (
        <Search
          data={this.state.teams}
          updateFunction={this.updateTeamId}
          updateVariable={this.state.teamUpdateVariable}
          optionFunc={this.getTeamOption}
          label={this.state.teamsLabel}
        ></Search>
      );
      playersSearchBar = (
        <Search
          data={this.state.players}
          updateFunction={this.updatePlayerId}
          updateVariable={this.state.playerUpdateVariable}
          optionFunc={this.getPlayerOption}
          label={this.state.playersLabel}
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
    }
    if (this.state.gotPlayerReportTotal && this.state.gotMetric) {
      playerReportGraph = (
        <BarGraphTotal
          dataset={this.state.playerReportTotal}
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
            <h1>Player Report</h1>
          </div>
          <br />
          <div>{playersSearchBar}</div>
          <br />
          <div>{teamsSearchBar}</div>
          <br />
          <div>{categorySearchBar}</div>
          <br />
          <div>{metricSearchBar}</div>
          <br />
          <div class="graph-info">
            <em>- Green bars are wins</em>
            <br />
            <em>- Red bars are losses</em>
            <br />
            <em>- Click bars to view Game Reports</em>
          </div>
        </div>
        <div class="report-container">{playerReportGraph}</div>
      </div>
    );
  }
}
