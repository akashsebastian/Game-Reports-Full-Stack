import React from 'react';
import { Component } from 'react';
import axios from 'axios'
import queryString from 'query-string';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Search from '../../components/search/Search'
import BarGraphTotal from '../../components/bar_graph_total/BarGraphTotal'

export default class TeamReport extends Component{

    constructor(props) {
        super(props);
        this.state = {
            gotTeamReportTotal : false,
            teamReportTotal : []
        }
    }

    componentDidMount() {
        console.log("team report mounted team_id = " + this.props.team_id)
        axios.get('/api/v1/get-team-report-total?team_id=' + this.props.team_id).then((res) => {
            const response = res.data;
            console.log(response)
            this.setState({
                teamReportTotal : response,
                gotTeamReportTotal : true
            });
        });
    }

    render () {
        let report;
        if (this.state.gotTeamReportTotal) {
            report = <div>
                <h1>Got Team Report</h1>
                <BarGraphTotal dataset = {this.state.teamReportTotal}></BarGraphTotal>
            </div>
        }
        return(
            <div>
                <h1>Team ID: {this.props.team_id}</h1>
                {report}
            </div>
        )
    }
}