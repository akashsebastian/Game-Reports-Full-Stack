import React from 'react';
import MaterialUIPickers from '../../components/date/Date'
import GamesList from '../games_list/GamesList'
import queryString from 'query-string';
import { format } from "date-fns";
import axios from 'axios'
import { Component } from 'react';
import GameTile from '../../components/game_tile/GameTile'
import Search from '../../components/search/Search'
import '../../css/style.css'
import BarGraphTotal from '../../components/bar_graph_total/BarGraphTotal'
import Tabs from '../../components/tabs/Tabs'

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
            gotAwayTeamReportDaily : false
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
        console.log("Mounted date: " + this.state.date)
        axios.get('/api/v1/get-video-status?date=' + date.toISOString().split('T')[0]).then((res) => {
            const response = res.data;
            console.log(response)
            this.setState({video_status : response});
        });
        if (values.game_id && values.date) {
            this.setState({
                date: new Date(Date.parse(values.date))
            })
            console.log("value from URL: " + values.date)
            console.log("Got date from URL " + this.state.date)
            this.updateGame(values.game_id)
        }
    }

    handleDateChange = (date) => {
        this.setState({
            date: date
        })
        date = date.toISOString().split('T')[0]
        console.log(date)
        axios.get('/api/v1/get-video-status?date=' + date).then((res) => {
            const response = res.data;
            console.log(response)
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
                console.log(response)
                this.setState({
                    gameReport : response,
                    gotGameReport : true
                });
            });
            axios.get('/api/v1/get-score?game_id=' + game_id).then((res) => {
                let date = this.state.date.toISOString().split('T')[0]
                const response = res.data;
                console.log(response)
                this.setState({
                    score : response,
                    gotScore: true
                });
                console.log("Date in update: " + this.state.date)
                axios.get('/api/v1/get-team-report-daily?team_id=' + response[0].home_team_id + '&date=' + date).then((res) => {
                    const response = res.data;
                    console.log(response)
                    this.setState({
                        homeTeamReportDaily : response,
                        gotHomeTeamReportDaily: true
                    });
                });
                axios.get('/api/v1/get-team-report-daily?team_id=' + response[0].away_team_id + '&date=' + date).then((res) => {
                    const response = res.data;
                    console.log(response)
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
    render (){
        let score, tabs, homeTeamReport, awayTeamReport;
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
            tabs = <Tabs awayTeamName = {this.state.score[0].away_team_name} homeTeamName = {this.state.score[0].home_team_name} homeTeamReport = {homeTeamReport} awayTeamReport = {awayTeamReport} homeTeamReportDaily = {this.state.homeTeamReportDaily} awayTeamReportDaily = {this.state.awayTeamReportDaily}></Tabs>
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