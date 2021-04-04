import React from 'react';
import { Component } from 'react';
import { format } from "date-fns";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';

export default class GameTile extends Component {

    constructor(props){
        super(props);
        this.state = {
            home_team_box_score : [],
            away_team_box_score : [],
            isClicked : false
        }
    }
    componentDidMount() {
        console.log("Game Tile mounted")
    }
    getGameReport(){
        console.log("Game ID " + this.props.game.game_id);
        this.state.isClicked = true;
        axios.get('/api/v1/get-box-score?game_id=' + this.props.game.game_id + '&team_id=' + this.props.game.home_team_id).then((res) => {
            const response = res.data;
            console.log(response)
            this.setState({home_team_box_score : response});
        });
        axios.get('/api/v1/get-box-score?game_id=' + this.props.game.game_id + '&team_id=' + this.props.game.visitor_team_id).then((res) => {
            const response = res.data;
            console.log(response)
            this.setState({away_team_box_score : response});
        });
    }
    render (){
        let nav;
        if (this.state.isClicked) {
            nav = <h1>{this.state.home_team_box_score[0].player_name}</h1>
        }
        return (
            <div>
                <Button onClick={() => {this.getGameReport()}}>{this.props.game.visitor_team_name + ' at ' + this.props.game.home_team_name}</Button>
                {nav}
            </div>
        );
    }
}