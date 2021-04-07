import React from 'react';
import { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {withRouter} from 'react-router-dom'


// Search bar component to select metrics, teams, players, etc
class Search extends Component {

    onChange = (event, values) => {
        if (values){
            this.props.updateFunction(values[this.props.updateVariable])
        }
        else {
            this.props.updateFunction(null)
        }
    }
    render (){
        return (
            <div>
                <div>
                    <Autocomplete
                        id="combo-box-demo"
                        options={this.props.data}
                        getOptionLabel={this.props.optionFunc}
                        style={{ width: 300 }}
                        defaultValue={this.props.defaultValue ? this.props.defaultValue : null}
                        onChange={this.onChange}
                        disabled={this.props.isDisabled}
                        renderInput={(params) => <TextField {...params} label={this.props.label} variant="outlined" />}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(Search)
