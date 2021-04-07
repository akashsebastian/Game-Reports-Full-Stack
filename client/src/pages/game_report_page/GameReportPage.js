import React from 'react';
import MaterialUIPickers from '../../components/date/Date'
import queryString from 'query-string';
import axios from 'axios'
import { Component } from 'react';
import Search from '../../components/search/Search'
import '../../css/style.css'
import Tabs from '../../components/tabs/Tabs'
import BarGraphSingle from '../../components/bar_graph_single/BarGraphSingle'

// Game Report Page
export default class GameReport extends Component {

    constructor(props){
        super(props);
        this.state = {
            video_status: [],
            gameUpdateVariable : 'game_id',
            gameLabel : 'Select Game',
            game_id : null,
            gameReport : [],
            gotGameReport : false,
            score : [],
            gotScore : false,
            homeTeamReportDaily : [],
            gotHomeTeamReportDaily : false,
            awayTeamReportDaily : [],
            gotAwayTeamReportDaily : false,
            selectedStats : null,
        }
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        let date = null
        date = new Date()
        date.setDate(date.getDate() - 1);
        this.setState({
            date: date
        })
        axios.get('/api/v1/get-video-status?date=' + date.toISOString().split('T')[0]).then((res) => {
            const response = res.data;
            this.setState({video_status : response});
        });
        if (values.game_id && values.date) {
            this.setState({
                date: new Date(Date.parse(values.date))
            })
            this.updateGame(values.game_id)
        }
    }

    handleDateChange = (date) => {
        this.setState({
            date: date
        })
        date = date.toISOString().split('T')[0]
        axios.get('/api/v1/get-video-status?date=' + date).then((res) => {
            const response = res.data;
            this.setState({video_status : response});
        });
    }

    updateGame = (game_id) => {
        if (game_id){
            this.setState({
                game_id : game_id
            })
            axios.get('/api/v1/get-game-report?game_id=' + game_id).then((res) => {
                const response = res.data;
                this.setState({
                    gameReport : response,
                    gotGameReport : true
                });
            });
            axios.get('/api/v1/get-score?game_id=' + game_id).then((res) => {
                let date = this.state.date.toISOString().split('T')[0]
                const response = res.data;
                this.setState({
                    score : response,
                    gotScore: true
                });
                axios.get('/api/v1/get-team-report-daily?team_id=' + response[0].home_team_id + '&date=' + date).then((res) => {
                    const response = res.data;
                    this.setState({
                        homeTeamReportDaily : response,
                        gotHomeTeamReportDaily: true
                    });
                });
                axios.get('/api/v1/get-team-report-daily?team_id=' + response[0].away_team_id + '&date=' + date).then((res) => {
                    const response = res.data;
                    this.setState({
                        awayTeamReportDaily : response,
                        gotAwayTeamReportDaily: true
                    });
                });
            });
        }
    }

    getGameOption = (option) => {
        return (option.visitor_team_name + ' at ' + option.home_team_name)
    }

    onClickMetric = (metricKey, data) => {
        this.setState({
            metricKey : metricKey,
            metricData : data
        })
    }
    render (){
        let score, tabs, homeTeamReport, awayTeamReport, selectedStats;
        if (this.state.gotScore) {
            score = <div class = 'score-container'>
                <div class = 'team-wrapper'>
                    <div class = 'team-details'>
                        <div class = 'team-name'>
                            <h3>{this.state.score[0].away_team_name}</h3>
                        </div>
                        <div class = 'record'>
                            <h6>{this.state.score[0].away_team_wins} - {this.state.score[0].away_team_losses}</h6>
                        </div>
                    </div>
                    <div class = 'team-score'>
                            <h2 style={{ ...this.state.score[0].away_team_score > this.state.score[0].home_team_score ? {'font-weight':'bold'}: {}}}>{this.state.score[0].away_team_score}</h2>
                    </div>
                </div>
                <div class = 'game-status'>
                    {this.state.score[0].status}
                </div>
                <div class = 'team-wrapper'>
                    <div class = 'team-score'>
                        <h2 style={{ ...this.state.score[0].home_team_score > this.state.score[0].away_team_score ? {'font-weight':'bold'}: {}}}>{this.state.score[0].home_team_score}</h2>
                    </div>
                    <div class = 'team-details'>
                        <div class = 'team-name'>
                            <h3>{this.state.score[0].home_team_name}</h3>
                        </div>
                        <div class = 'record'>
                            <h6>{this.state.score[0].home_team_wins} - {this.state.score[0].home_team_losses}</h6>
                        </div>
                    </div>
                </div>
            </div>
        }
        if (this.state.gotGameReport && this.state.gotScore && this.state.gotHomeTeamReportDaily && this.state.gotAwayTeamReportDaily) {
            homeTeamReport = this.state.gameReport.filter(data => data.team_id == this.state.score[0].home_team_id)
            awayTeamReport = this.state.gameReport.filter(data => data.team_id == this.state.score[0].away_team_id)
            tabs = <Tabs awayTeamName = {this.state.score[0].away_team_name} homeTeamName = {this.state.score[0].home_team_name} homeTeamReport = {homeTeamReport} awayTeamReport = {awayTeamReport} homeTeamReportDaily = {this.state.homeTeamReportDaily} awayTeamReportDaily = {this.state.awayTeamReportDaily} onClickMetric = {this.onClickMetric}></Tabs>
        }
        if (this.state.metricKey) {
            selectedStats = <BarGraphSingle
                metricKey = {this.state.metricKey}
                metricData = {this.state.metricData}
            />
        }
        return (
            <div class = 'main-container'>
                <div class = 'game-filters-container filters-container'>
                    <div class = 'game-selector'>
                        <h1>
                            Game Report
                        </h1>
                    </div>
                    <div>
                        <MaterialUIPickers date = {this.state.date} onChangeDate = {this.handleDateChange}></MaterialUIPickers>
                    </div>
                    <br/>
                    <div class = 'game-selector'>
                        <Search data = {this.state.video_status} updateFunction = {this.updateGame} updateVariable = {this.state.gameUpdateVariable} optionFunc = {this.getGameOption} label = {this.state.gameLabel}></Search>
                    </div>
                    <div class = 'select-stats-container'>
                        {selectedStats}
                    </div>
                </div>
                <div class = 'game-report-container report-container'>
                        <div class = 'score'>
                            {score}
                        </div>
                        <br/>
                        <div class = 'accordion-game-report'>
                            {tabs}
                        </div>
                </div>
            </div>
        );
    }
}