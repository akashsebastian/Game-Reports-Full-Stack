const nba_model = require('../models/model.js')
const getVideoStatus = (req, res, next) => {
    nba_model.getVideoStatus(req.query.date)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
};

const getPlayerReport = (req, res, next) => {
    nba_model.getPlayerReport(req.query.date)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
};

const getTeamReportTotal = (req, res, next) => {
    nba_model.getTeamReportTotal(req.query.team_id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
};

const getTeamReportDaily = (req, res, next) => {
  nba_model.getTeamReportDaily(req.query.team_id, req.query.date)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
};

const getBoxScore = (req, res, next) => {
  nba_model.getBoxScore(req.query.game_id, req.query.team_id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
};

const getTeams = (req, res, next) => {
  nba_model.getTeams()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
};

const getPlayers = (req, res, next) => {
  nba_model.getPlayers(req.query.team_id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
};


const getPlayerReportTotal = (req, res, next) => {
  nba_model.getPlayerReportTotal(req.query.player_id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
};

const getGameReport = (req, res, next) => {
  nba_model.getGameReport(req.query.game_id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
};

const getScore = (req, res, next) => {
  nba_model.getScore(req.query.game_id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
};

module.exports.getVideoStatus = getVideoStatus;
module.exports.getPlayerReport = getPlayerReport;
module.exports.getTeamReportTotal = getTeamReportTotal;
module.exports.getTeamReportDaily = getTeamReportDaily;
module.exports.getBoxScore = getBoxScore;
module.exports.getTeams = getTeams;
module.exports.getPlayers = getPlayers;
module.exports.getPlayerReportTotal = getPlayerReportTotal;
module.exports.getGameReport = getGameReport;
module.exports.getScore = getScore;
