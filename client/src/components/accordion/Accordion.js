import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../../css/style.css'
import { green, red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  header: {
    display: 'flex',
    width: '600px'
  },
  metricHeading: {
    //   paddingLeft: '3em'
    width:'130px'
  }
}));

function getDrives(drives) {
    // Drives
    if (drives > 0) {
        return (<div class = 'metric-display'>
            <span>
                Drives Per Game: +
            </span>
            <span class = 'positive-metric'>
                {Number(drives).toFixed(2)}
            </span>
            <div class = 'icon-up icon'>
                <Icon
                    className = "fa fa-caret-up"
                />
            </div>
        </div>
        )
    }
    else if (drives < 0) {
        return (<div class = 'metric-display'>
            <span>
                Drives Per Game: -
            </span>
            <span class = 'negative-metric'>
                {Math.abs(Number(drives).toFixed(2))}
            </span>
            <div class = 'icon-down icon'>
                <Icon
                    className = "fa fa-caret-down"
                />
            </div>
        </div>
        )
    }
    else {
        return (<div>
            <span>
                Drives Per Game:
            </span>
            <span>
                {drives}
            </span>
        </div>
        )
    }
}
function getCatchShoot(catchShoot) {
    if (catchShoot > 0) {
        return (<div class = 'metric-display'>
            <span>
                Catch and Shoot Points: +
            </span>
            <span class = 'positive-metric'>
                {Number(catchShoot).toFixed(2)}
            </span>
            <div class = 'icon-up icon'>
                <Icon
                    className = "fa fa-caret-up"
                />
            </div>
        </div>
        )
    }
    else if (catchShoot < 0) {
        return (<div class = 'metric-display'>
            <span>
                Catch and Shoot Points: -
            </span>
            <span class = 'negative-metric'>
                {Math.abs(Number(catchShoot).toFixed(2))}
            </span>
            <div class = 'icon-down icon'>
                <Icon
                    className = "fa fa-caret-down"
                />
            </div>
        </div>
        )
    }
    else {
        return (<div>
            <span>
                Catch and Shoot Points:
            </span>
            <span>
                {catchShoot}
            </span>
        </div>
        )
    }
}
function getPullUp(pullUp) {
    // Pull Up Shooting
    if (pullUp > 0) {
        return (<div class = 'metric-display'>
            <span>
                Pull Up Shooting Points: +
            </span>
            <span class = 'positive-metric'>
                {Number(pullUp).toFixed(2)}
            </span>
            <div class = 'icon-up icon'>
                <Icon
                    className = "fa fa-caret-up"
                />
            </div>
        </div>
        )
    }
    else if (pullUp < 0) {
        return (<div class = 'metric-display'>
            <span>
                Pull Up Shooting Points: -
            </span>
            <span class = 'negative-metric'>
                {Math.abs(Number(pullUp).toFixed(2))}
            </span>
            <div class = 'icon-down icon'>
                <Icon
                    className = "fa fa-caret-down"
                />
            </div>
        </div>
        )
    }
    else {
        return (<div>
            <span>
                Pull Up Shooting Points:
            </span>
            <span>
                {pullUp}
            </span>
        </div>
        )
    }
}
function getOpenThrees(openThrees) {
    // Open Three Pointers
    if (openThrees > 0) {
        return (<div class = 'metric-display'>
            <span>
                Open Three Pointers Points: +
            </span>
            <span class = 'positive-metric'>
                {Number(openThrees).toFixed(2)}
            </span>
            <div class = 'icon-up icon'>
                <Icon
                    className = "fa fa-caret-up"
                />
            </div>
        </div>
        )
    }
    else if (openThrees < 0) {
        return (<div class = 'metric-display'>
            <span>
                Open Three Pointers Points: -
            </span>
            <span class = 'negative-metric'>
                {Math.abs(Number(openThrees).toFixed(2))}
            </span>
            <div class = 'icon-down icon'>
                <Icon
                    className = "fa fa-caret-down"
                />
            </div>
        </div>
        )
    }
    else {
        return (<div>
            <span>
                Open Three Pointers Points:
            </span>
            <span>
                {openThrees}
            </span>
        </div>
        )
    }
}
function getContestedThrees(contestedThrees) {
    // Contested Three Pointers
    if (contestedThrees > 0) {
        return (<div class = 'metric-display'>
            <span>
                Contested Three Pointers Points: +
            </span>
            <span class = 'positive-metric'>
                {Number(contestedThrees).toFixed(2)}
            </span>
            <div class = 'icon-up icon'>
                <Icon
                    className = "fa fa-caret-up"
                />
            </div>
        </div>
        )
    }
    else if (contestedThrees < 0) {
        return (<div class = 'metric-display'>
            <span>
                Contested Three Pointers Points: -
            </span>
            <span class = 'negative-metric'>
                {Math.abs(Number(contestedThrees).toFixed(2))}
            </span>
            <div class = 'icon-down icon'>
                <Icon
                    className = "fa fa-caret-down"
                />
            </div>
        </div>
        )
    }
    else {
        return (<div>
            <span>
                Contested Three Pointers Points: 
            </span>
            <span>
                {contestedThrees}
            </span>
        </div>
        )
    }
}

export default function ControlledAccordions({teamReportData, teamReportDailyData}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
        <Accordion expanded = {expanded === 'panel0'} onChange={handleChange('panel0')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={"panel0bh-content"}
                id={"panel0bh-header"}
            >
                <Typography className={classes.heading}>{teamReportDailyData[0].city + ' ' + teamReportDailyData[0].name}</Typography>
                <Typography className={classes.secondaryHeading}>Team Summary Report</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div class = 'accordion-content-container'>
                    <div class = 'top-row accordion-content-row'>
                        <div class = 'top-item accordion-content-item'>
                            {getDrives(teamReportDailyData[0].drives_diff)}
                        </div>
                        <div class = 'top-item accordion-content-item'>
                            {getCatchShoot(teamReportDailyData[0].catch_shoot_pts_diff)}
                        </div>
                        <div class = 'top-item accordion-content-item'>
                            {getPullUp(teamReportDailyData[0].pull_up_pts_diff)}
                        </div>
                    </div>
                    <div class = 'accordion-content-row'>
                        <div class = 'bottom-item accordion-content-item'>
                            {getOpenThrees(teamReportDailyData[0].fg3_pts_diff_open)}
                        </div>
                        <div class = 'bottom-item accordion-content-item'>
                            {getContestedThrees(teamReportDailyData[0].fg3_pts_diff_tight)}
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
        {teamReportData.map((data, i) => {
            let header, details;
            if (data.comment) {
                header = <Typography className={classes.secondaryHeading}>{data.comment}</Typography>
                details = <div class = 'comment-details'>
                    {data.comment}
                </div>
            }
            else {
                let drives, catchAndShoot, pullUpShooting, openThrees, contestedThrees;
                drives = getDrives(data.drives_diff);
                // Catch and Shoot
                catchAndShoot = getCatchShoot(data.catch_shoot_pts_diff);
                pullUpShooting = getPullUp(data.pull_up_pts_diff);
                openThrees = getOpenThrees(data.fg3_pts_diff_open);
                contestedThrees = getContestedThrees(data.fg3_pts_diff_tight);
                header = <div className={classes.header}>
                    <Typography className={[classes.secondaryHeading, classes.metricHeading].join(' ')}>Min: {data.min}</Typography>
                    <Typography className={[classes.secondaryHeading, classes.metricHeading].join(' ')}>Points: {data.pts}</Typography>
                    <Typography className={[classes.secondaryHeading, classes.metricHeading].join(' ')}>Rebounds: {data.reb}</Typography>
                    <Typography className={[classes.secondaryHeading, classes.metricHeading].join(' ')}>Assists: {data.ast}</Typography>
                </div>
                details = <div class = 'accordion-content-container'>
                    <div class = 'top-row accordion-content-row'>
                        <div class = 'top-item accordion-content-item'>
                            {drives}
                        </div>
                        <div class = 'top-item accordion-content-item'>
                            {catchAndShoot}
                        </div>
                        <div class = 'top-item accordion-content-item'>
                            {pullUpShooting}
                        </div>
                    </div>
                    <div class = 'accordion-content-row'>
                        <div class = 'bottom-item accordion-content-item'>
                            {openThrees}
                        </div>
                        <div class = 'bottom-item accordion-content-item'>
                            {contestedThrees}
                        </div>
                    </div>
                </div>
            }
            return (
                <Accordion expanded = {expanded === 'panel' + (i + 1)} onChange={handleChange('panel' + (i + 1))}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"panel" + (i + 1) + "bh-content"}
                        id={"panel" + (i + 1) + "bh-header"}
                    >
                        <Typography className={classes.heading}>{data.player_name}</Typography>
                        {header}
                    </AccordionSummary>
                    <AccordionDetails>
                        {details}
                    </AccordionDetails>
                </Accordion>
            )
        })}
    </div>
  );
}
