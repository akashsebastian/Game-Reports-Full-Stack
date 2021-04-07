import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Accordion from '../accordion/Accordion'

// Tab Panel component for Game Reports
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs({awayTeamName, homeTeamName, homeTeamReport, awayTeamReport, homeTeamReportDaily, awayTeamReportDaily, onClickMetric}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label={awayTeamName} {...a11yProps(0)} />
        <Tab label={homeTeamName} {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
          <div>
            <Accordion
              teamReportData = {awayTeamReport}
              teamReportDailyData = {awayTeamReportDaily}
              onClickMetric = {onClickMetric}
            />
          </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
          <div>
            <Accordion
              teamReportData = {homeTeamReport}
              teamReportDailyData = {homeTeamReportDaily}
              onClickMetric = {onClickMetric}
            />
          </div>
      </TabPanel>
    </div>
  );
}