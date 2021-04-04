import React from 'react';
import { Component } from 'react';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Redirect } from 'react-router-dom'
import createHistory from "history/createBrowserHistory"
import {withRouter} from 'react-router-dom'
import queryString from 'query-string';
import TeamReport from '../../pages/team_report/TeamReport'


class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            teams : [],
            gotTeams : false,
            team_id : null
        }
    }

    componentDidMount() {
        // axios.get('/api/v1/' + this.props.endpoint).then((res) => {
        //     const response = res.data;
        //     console.log(response)
        //     this.setState({teams : response});
        //     this.setState({gotTeams : true})
        // });
        // const values = queryString.parse(this.props.location.search)
        // console.log(values.team_id)
        // this.setState({team_id : values.team_id})
    }

    onChange = (event, values) => {
        if (values){
            this.props.updateFunction(values[this.props.updateVariable])
        }
        else {
            this.props.updateFunction(null)
        }
    }
    render (){
        let teams_dropdown;
        if (this.state.gotTeams) {
            teams_dropdown = <Autocomplete
                id="combo-box-demo"
                options={this.props.data}
                getOptionLabel={(option) => option.city + ' ' + option.name}
                style={{ width: 300 }}
                onChange={this.onChange}
                renderInput={(params) => <TextField {...params} label="Select Team" variant="outlined" />}
            />
        }
        let team_report;
        if (this.state.team_id) {
            team_report = <TeamReport team_id = {this.state.team_id}></TeamReport>
        }
        return (
            <div>
                <div>
                    <Autocomplete
                        id="combo-box-demo"
                        options={this.props.data}
                        getOptionLabel={this.props.optionFunc}
                        style={{ width: 300 }}
                        onChange={this.onChange}
                        disabled={this.props.isDisabled}
                        renderInput={(params) => <TextField {...params} label={this.props.label} variant="outlined" />}
                    />
                </div>
                {/* <div>
                    {team_report}
                </div> */}
            </div>
        )
    }
}

export default withRouter(Search)
