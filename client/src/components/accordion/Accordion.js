import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "../../css/style.css";
import Icon from "@material-ui/core/Icon";

const metric = {
  drives: {
    name: "Drives",
    metric: "drives_diff",
    text: "Drives Per Game",
  },
  catchAndShoot: {
    name: "Catch And Shoot",
    metric: "catch_shoot_pts_diff",
    text: "Catch and Shoot Points",
  },
  pullUp: {
    name: "Pull Up Shooting",
    metric: "pull_up_pts_diff",
    text: "Pull Up Shooting Points",
  },
  openThreePointers: {
    name: "Open Three Pointers",
    metric: "fg3_pts_diff_open",
    text: "Open Three Pointers Points",
  },
  contestedThreePointers: {
    name: "Contested Three Pointers",
    metric: "fg3_pts_diff_tight",
    text: "Contested Three Pointers Points",
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  header: {
    display: "flex",
    width: "650px",
  },
  metricHeading: {
    width: "130px",
  },
}));

function getMetric(data, metricDict, onClickMetric, selectedName) {
  // Function to get Metrics for Single Bar Graph
  if (data[metricDict["metric"]] > 0) {
    return (
      <div
        class="metric-display clickable-metrics"
        onClick={() => onClickMetric(metricDict["name"], data, selectedName)}
      >
        <span>{metricDict["text"]}: +</span>
        <span class="positive-metric">
          {Number(data[metricDict["metric"]]).toFixed(2)}
        </span>
        <div class="icon-up icon">
          <Icon className="fa fa-caret-up" />
        </div>
      </div>
    );
  } else if (data[metricDict["metric"]] < 0) {
    return (
      <div
        class="metric-display clickable-metrics"
        onClick={() => onClickMetric(metricDict["name"], data, selectedName)}
      >
        <span>{metricDict["text"]}: -</span>
        <span class="negative-metric">
          {Math.abs(Number(data[metricDict["metric"]]).toFixed(2))}
        </span>
        <div class="icon-down icon">
          <Icon className="fa fa-caret-down" />
        </div>
      </div>
    );
  } else {
    return (
      <div
        class="metric-display clickable-metrics"
        onClick={() => onClickMetric(metricDict["name"], data, selectedName)}
      >
        <span>{metricDict["text"]}:</span>
        <span>{data[metricDict["metric"]]}</span>
      </div>
    );
  }
}

// Function to populate the accordion with the Box Score and Game Report for the Game Report Page
export default function ControlledAccordions({
  teamReportData,
  teamReportDailyData,
  onClickMetric,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel0"}
        onChange={handleChange("panel0")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={"panel0bh-content"}
          id={"panel0bh-header"}
        >
          <Typography className={classes.heading}>
            {teamReportDailyData[0].city + " " + teamReportDailyData[0].name}
          </Typography>
          <Typography className={classes.secondaryHeading}>
            Team Summary Report
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div class="accordion-content-container">
            <div class="top-row accordion-content-row">
              <div class="top-item accordion-content-item">
                {getMetric(
                  teamReportDailyData[0],
                  metric.drives,
                  onClickMetric,
                  teamReportDailyData[0].city +
                    " " +
                    teamReportDailyData[0].name
                )}
              </div>
              <div class="top-item accordion-content-item">
                {getMetric(
                  teamReportDailyData[0],
                  metric.catchAndShoot,
                  onClickMetric,
                  teamReportDailyData[0].city +
                    " " +
                    teamReportDailyData[0].name
                )}
              </div>
              <div class="top-item accordion-content-item">
                {getMetric(
                  teamReportDailyData[0],
                  metric.pullUp,
                  onClickMetric,
                  teamReportDailyData[0].city +
                    " " +
                    teamReportDailyData[0].name
                )}
              </div>
            </div>
            <div class="accordion-content-row">
              <div class="bottom-item accordion-content-item">
                {getMetric(
                  teamReportDailyData[0],
                  metric.openThreePointers,
                  onClickMetric,
                  teamReportDailyData[0].city +
                    " " +
                    teamReportDailyData[0].name
                )}
              </div>
              <div class="bottom-item accordion-content-item">
                {getMetric(
                  teamReportDailyData[0],
                  metric.contestedThreePointers,
                  onClickMetric,
                  teamReportDailyData[0].city +
                    " " +
                    teamReportDailyData[0].name
                )}
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      {teamReportData
        .filter((data) => data.min)
        .sort((a, b) => {
          let aMin =
            parseInt(a.min.split(":")[0]) +
            parseInt(a.min.split(":")[1]) * 0.01;
          let bMin =
            parseInt(b.min.split(":")[0]) +
            parseInt(b.min.split(":")[1]) * 0.01;
          if (aMin < bMin) {
            return 1;
          }
          return -1;
        })
        .map((data, i) => {
          console.log(data);
          let header, details;
          if (data.comment) {
            header = (
              <Typography className={classes.secondaryHeading}>
                {data.comment}
              </Typography>
            );
            details = <div class="comment-details">{data.comment}</div>;
          } else {
            let drives,
              catchAndShoot,
              pullUpShooting,
              openThrees,
              contestedThrees;
            drives = getMetric(
              data,
              metric.drives,
              onClickMetric,
              data.player_name
            );
            catchAndShoot = getMetric(
              data,
              metric.catchAndShoot,
              onClickMetric,
              data.player_name
            );
            pullUpShooting = getMetric(
              data,
              metric.pullUp,
              onClickMetric,
              data.player_name
            );
            openThrees = getMetric(
              data,
              metric.openThreePointers,
              onClickMetric,
              data.player_name
            );
            contestedThrees = getMetric(
              data,
              metric.contestedThreePointers,
              onClickMetric,
              data.player_name
            );
            header = (
              <div className={classes.header}>
                <Typography
                  className={[
                    classes.secondaryHeading,
                    classes.metricHeading,
                  ].join(" ")}
                >
                  Min: {data.min}
                </Typography>
                <Typography
                  className={[
                    classes.secondaryHeading,
                    classes.metricHeading,
                  ].join(" ")}
                >
                  Points: {data.pts}
                </Typography>
                <Typography
                  className={[
                    classes.secondaryHeading,
                    classes.metricHeading,
                  ].join(" ")}
                >
                  Rebounds: {data.reb}
                </Typography>
                <Typography
                  className={[
                    classes.secondaryHeading,
                    classes.metricHeading,
                  ].join(" ")}
                >
                  Assists: {data.ast}
                </Typography>
              </div>
            );
            details = (
              <div class="accordion-content-container">
                <div class="top-row accordion-content-row">
                  <div class="top-item accordion-content-item">{drives}</div>
                  <div class="top-item accordion-content-item">
                    {catchAndShoot}
                  </div>
                  <div class="top-item accordion-content-item">
                    {pullUpShooting}
                  </div>
                </div>
                <div class="accordion-content-row">
                  <div class="bottom-item accordion-content-item">
                    {openThrees}
                  </div>
                  <div class="bottom-item accordion-content-item">
                    {contestedThrees}
                  </div>
                </div>
              </div>
            );
          }
          return (
            <Accordion
              expanded={expanded === "panel" + (i + 1)}
              onChange={handleChange("panel" + (i + 1))}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={"panel" + (i + 1) + "bh-content"}
                id={"panel" + (i + 1) + "bh-header"}
              >
                <Typography className={classes.heading}>
                  {data.player_name}
                </Typography>
                {header}
              </AccordionSummary>
              <AccordionDetails>{details}</AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
}
