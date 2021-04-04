import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from 'axios'
import { format } from "date-fns";


export default function MaterialUIPickers({date, onChangeDate}) {
  // The first commit of Material-UI
  // var date = new Date()
  // // Got yesterday's date
  // date.setDate(date.getDate() - 1);
  const [selectedDate, setSelectedDate] = React.useState(date);
  // console.log("Selected date " + selectedDate)

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // axios.get('/api/v1/get-video-status?date=' + format(date, 'yyyy-MM-dd')).then((res) => {
    //   const response = res.data;
    //   console.log(response)
    //   // this.setState({response});
    // });
    onChangeDate(date)
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Select Date"
          value={date}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
