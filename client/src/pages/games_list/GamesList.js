import React from 'react';
import { Component } from 'react';
import { format } from "date-fns";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import GameTile from '../../components/game_tile/GameTile'

export default class GameList extends Component {

    constructor(props){
        super(props);
        this.state = {
            video_status : []
        }
    }
    componentDidMount() {
        console.log("Component did mount")
        let date = format(this.props.date, 'yyyy-MM-dd')
        axios.get('/api/v1/get-video-status?date=' + date).then((res) => {
            const response = res.data;
            console.log(response)
            this.setState({video_status : response});
        });
    }
    render (){
        return (
            <div>
            <h1>Games List</h1>
            <div>{this.state.video_status.map(game => <GameTile game = {game}></GameTile>)}</div>
            </div>
        );
    }
}