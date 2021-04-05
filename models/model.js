const dbConfig = require("../config/db.config.js");
const Pool = require('pg').Pool
const pool = new Pool({
  user: dbConfig.USER,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: 5432,
});

const getVideoStatus = (date) => {
    return new Promise(function(resolve, reject) {
        queryString = "SELECT * FROM video_status where game_date = '" + date + "' and is_available = 1";
        pool.query(queryString, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}
const getPlayerReport = (date) => {
    return new Promise(function(resolve, reject) {
        queryString = "SELECT * FROM player_report where date = '" + date + "'";
        pool.query(queryString, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}
const getTeamReportTotal = (team_id) => {
    return new Promise(function(resolve, reject) {
        queryString = "select away_team.name as away_team_name, home_team.name as home_team_name,a.*, b.*,b.fg3m_diff_open *3 as fg3_pts_diff_open,b.fg3m_daily_open *3 as fg3_pts_daily_open,b.fg3m_total_open *3 as fg3_pts_total_open,b.fg3m_diff_tight *3 as fg3_pts_diff_tight,b.fg3m_daily_tight *3 as fg3_pts_daily_tight,b.fg3m_total_tight *3 as fg3_pts_total_tight from scores a, team_report b, teams home_team, teams away_team where a.date = b.date and (b.team_id = a.home_team_id or b.team_id = a.away_team_id) and b.team_id = " + team_id + " and a.home_team_id = home_team.team_id and a.away_team_id = away_team.team_id";
        pool.query(queryString, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const getTeamReportDaily = (team_id, date) => {
    return new Promise(function(resolve, reject) {
        queryString = "select * from team_report, teams where team_report.team_id = teams.team_id and team_report.team_id = " + team_id + " and date = '" + date + "'";
        pool.query(queryString, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const getBoxScore = (game_id, team_id) => {
    return new Promise(function(resolve, reject) {
        queryString = "SELECT * FROM box_score where game_id = '" + game_id + "' and team_id = " + team_id;
        pool.query(queryString, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}


const getTeams = () => {
    return new Promise(function(resolve, reject) {
        queryString = "SELECT * FROM teams";
        pool.query(queryString, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const getPlayers = (team_id) => {
    return new Promise(function(resolve, reject) {
        queryString = "select distinct players.player, players.player_id from player_report left join players on player_report.player_id = players.player_id where players.player is not null and (players.team_id = " + team_id + " or " + team_id + " = -1);";
        pool.query(queryString, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const getPlayerReportTotal = (player_id) => {
    return new Promise(function(resolve, reject) {
        queryString = "select *,player_report.fg3m_diff_open *3 as fg3_pts_diff_open,player_report.fg3m_daily_open *3 as fg3_pts_daily_open,player_report.fg3m_total_open *3 as fg3_pts_total_open,player_report.fg3m_diff_tight *3 as fg3_pts_diff_tight,player_report.fg3m_daily_tight *3 as fg3_pts_daily_tight,player_report.fg3m_total_tight *3 as fg3_pts_total_tight from (select box_score.player_id, box_score.game_id, box_score.team_id, video_status.game_date, scores.home_team_score , scores.away_team_score, scores.home_team_id , scores.away_team_id, home_team.name as home_team_name, away_team.name as away_team_name from box_score, video_status, scores, teams home_team, teams away_team where box_score.game_id = video_status.game_id and CAST(box_score.game_id as INTEGER) = scores.game_id and home_team.team_id = scores.home_team_id and away_team.team_id = scores.away_team_id) as box_score_extended left join player_report on box_score_extended.game_date = player_report.date and box_score_extended.player_id = player_report.player_id where player_report.player_id = " + player_id + " order by game_date";
        pool.query(queryString, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const getGameReport = (game_id) => {
    return new Promise(function(resolve, reject) {
        queryString = "select * from (select box_score.*, video_status.game_date from box_score, video_status where  box_score.game_id = video_status.game_id) as box_score_extended left join player_report on box_score_extended.game_date = player_report.date and box_score_extended.player_id = player_report.player_id where box_score_extended.game_id = '" + game_id +"'";
        pool.query(queryString, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const getScore = (game_id) => {
    return new Promise(function(resolve, reject) {
        queryString = "select scores.*, away_team.name as away_team_name, home_team.name as home_team_name from scores, teams as away_team, teams as home_team where game_id = " +  game_id + " and scores.home_team_id = home_team.team_id and scores.away_team_id = away_team.team_id";
        pool.query(queryString, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

module.exports = {
    getVideoStatus,
    getPlayerReport,
    getTeamReportTotal,
    getTeamReportDaily,
    getBoxScore,
    getTeams,
    getPlayers,
    getPlayerReportTotal,
    getGameReport,
    getScore
}
