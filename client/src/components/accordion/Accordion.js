import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "../../css/style.css";
import { green, red } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import Search from "../search/Search";

const metric = {
  Drives: [
    { name: "Drives/G", column_name: "drives_diff" },
    { name: "Field Goals Made", column_name: "drive_fgm_diff" },
    { name: "Field Goals Attempted", column_name: "drive_fga_diff" },
    { name: "Points", column_name: "drive_pts_diff" },
  ],
  "Pull Up Shooting": [
    { name: "Field Goals Made", column_name: "pull_up_fgm_diff" },
    { name: "Field Goals Attempted", column_name: "pull_up_fga_diff" },
    { name: "Points", column_name: "pull_up_pts_diff" },
    { name: "Three Pointers Made", column_name: "pull_up_fg3m_diff" },
    { name: "Three Pointers Attempted", column_name: "pull_up_fg3a_diff" },
  ],
  "Catch and Shoot": [
    { name: "Field Goals Made", column_name: "catch_shoot_fgm_diff" },
    { name: "Field Goals Attempted", column_name: "catch_shoot_fga_diff" },
    { name: "Points", column_name: "catch_shoot_pts_diff" },
    { name: "Three Pointers Made", column_name: "catch_shoot_fg3m_diff" },
    { name: "Three Pointers Attempted", column_name: "catch_shoot_fg3a_diff" },
  ],
  "Open Three Pointers": [
    { name: "Three Pointers Points", column_name: "fg3_pts_diff_open" },
    { name: "Three Pointers Made", column_name: "fg3m_diff_open" },
    { name: "Three Pointers Attempted", column_name: "fg3a_diff_open" },
  ],
  "Contested Three Pointers": [
    { name: "Three Pointers Points", column_name: "fg3_pts_diff_tight" },
    { name: "Three Pointers Made", column_name: "fg3m_diff_tight" },
    { name: "Three Pointers Attempted", column_name: "fg3a_diff_tight" },
  ],
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

function getDrives(data, onClickMetric) {
  // Drives
  if (data.drives_diff > 0) {
    return (
      <div
        class="metric-display clickable-metrics"
        onClick={() => onClickMetric("Drives", data)}
      >
        <span>Drives Per Game: +</span>
        <span class="positive-metric">
          {Number(data.drives_diff).toFixed(2)}
        </span>
        <div class="icon-up icon">
          <Icon className="fa fa-caret-up" />
        </div>
      </div>
    );
  } else if (data.drives_diff < 0) {
    return (
      <div
        class="metric-display clickable-metrics"
        onClick={() => onClickMetric("Drives", data)}
      >
        <span>Drives Per Game: -</span>
        <span class="negative-metric">
          {Math.abs(Number(data.drives_diff).toFixed(2))}
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
        onClick={() => onClickMetric("Drives", data)}
      >
        <span>Drives Per Game:</span>
        <span>{data.drives_diff}</span>
      </div>
    );
  }
}
function getCatchShoot(data, onClickMetric) {
  if (data.catch_shoot_pts_diff > 0) {
    return (
      <div
        class="metric-display clickable-metrics"
        onClick={() => onClickMetric("Catch and Shoot", data)}
      >
        <span>Catch and Shoot Points: +</span>
        <span class="positive-metric">
          {Number(data.catch_shoot_pts_diff).toFixed(2)}
        </span>
        <div class="icon-up icon">
          <Icon className="fa fa-caret-up" />
        </div>
      </div>
    );
  } else if (data.catch_shoot_pts_diff < 0) {
    return (
      <div
        class="metric-display clickable-metrics"
        onClick={() => onClickMetric("Catch and Shoot", data)}
      >
        <span>Catch and Shoot Points: -</span>
        <span class="negative-metric">
          {Math.abs(Number(data.catch_shoot_pts_diff).toFixed(2))}
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
        onClick={() => onClickMetric("Catch and Shoot", data)}
      >
        <span>Catch and Shoot Points:</span>
        <span>{data.catch_shoot_pts_diff}</span>
      </div>
    );
  }
}
function getPullUp(data, onClickMetric) {
  // Pull Up Shooting
  if (data.pull_up_pts_diff > 0) {
    return (
      <div
        class="metric-display clickable-metrics"
        onClick={() => onClickMetric("Pull Up Shooting", data)}
      >
        <span>Pull Up Shooting Points: +</span>
        <span class="positive-metric">
          {Number(data.pull_up_pts_diff).toFixed(2)}
        </span>
        <div class="icon-up icon">
          <Icon className="fa fa-caret-up" />
        </div>
      </div>
    );
  } else if (data.pull_up_pts_diff < 0) {
    return (
      <div
        class="metric-display clickable-metrics"
        onClick={() => onClickMetric("Pull Up Shooting", data)}
      >
        <span>Pull Up Shooting Points: -</span>
        <span class="negative-metric">
          {Math.abs(Number(data.pull_up_pts_diff).toFixed(2))}
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
        onClick={() => onClickMetric("Pull Up Shooting", data)}
      >
        <span>Pull Up Shooting Points:</span>
        <span>{data.pull_up_pts_diff}</span>
      </div>
    );
  }
}
function getOpenThrees(data, onClickMetric) {
  // Open Three Pointers
  if (data.fg3_pts_diff_open > 0) {
    return (
      <div
        class="metric-display clickable-metrics"
        onClick={() => onClickMetric("Open Three Pointers", data)}
      >
        <span>Open Three Pointers Points: +</span>
        <span class="positive-metric">
          {Number(data.fg3_pts_diff_open).toFixed(2)}
        </span>
        <div class="icon-up icon">
          <Icon className="fa fa-caret-up" />
        </div>
      </div>
    );
  } else if (data.fg3_pts_diff_open < 0) {
    return (
      <div
        class="metric-display clickable-metrics"
        onClick={() => onClickMetric("Open Three Pointers", data)}
      >
        <span>Open Three Pointers Points: -</span>
        <span class="negative-metric">
          {Math.abs(Number(data.fg3_pts_diff_open).toFixed(2))}
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
        onClick={() => onClickMetric("Open Three Pointers", data)}
      >
        <span>Open Three Pointers Points:</span>
        <span>{data.fg3_pts_diff_open}</span>
      </div>
    );
  }
}
function getContestedThrees(data, onClickMetric) {
  // Contested Three Pointers
  if (data.fg3_pts_diff_tight > 0) {
    return (
      <div
        class="metric-display clickable-metrics"
        onClick={() => onClickMetric("Contested Three Pointers", data)}
      >
        <span>Contested Three Pointers Points: +</span>
        <span class="positive-metric">
          {Number(data.fg3_pts_diff_tight).toFixed(2)}
        </span>
        <div class="icon-up icon">
          <Icon className="fa fa-caret-up" />
        </div>
      </div>
    );
  } else if (data.fg3_pts_diff_tight < 0) {
    return (
      <div
        class="metric-display clickable-metrics"
        onClick={() => onClickMetric("Contested Three Pointers", data)}
      >
        <span>Contested Three Pointers Points: -</span>
        <span class="negative-metric">
          {Math.abs(Number(data.fg3_pts_diff_tight).toFixed(2))}
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
        onClick={() => onClickMetric("Contested Three Pointers", data)}
      >
        <span>Contested Three Pointers Points:</span>
        <span>{data.fg3_pts_diff_tight}</span>
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
                {getDrives(teamReportDailyData[0], onClickMetric)}
              </div>
              <div class="top-item accordion-content-item">
                {getCatchShoot(teamReportDailyData[0], onClickMetric)}
              </div>
              <div class="top-item accordion-content-item">
                {getPullUp(teamReportDailyData[0], onClickMetric)}
              </div>
            </div>
            <div class="accordion-content-row">
              <div class="bottom-item accordion-content-item">
                {getOpenThrees(teamReportDailyData[0], onClickMetric)}
              </div>
              <div class="bottom-item accordion-content-item">
                {getContestedThrees(teamReportDailyData[0], onClickMetric)}
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      {teamReportData
        .sort((a, b) => {
          if (a.min && b.min) {
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
            drives = getDrives(data, onClickMetric);
            // Catch and Shoot
            catchAndShoot = getCatchShoot(data, onClickMetric);
            pullUpShooting = getPullUp(data, onClickMetric);
            openThrees = getOpenThrees(data, onClickMetric);
            contestedThrees = getContestedThrees(data, onClickMetric);
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
