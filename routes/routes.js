const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/get-video-status', controllers.getVideoStatus);
router.get('/get-player-report', controllers.getPlayerReport);
router.get('/get-team-report-total', controllers.getTeamReportTotal);
router.get('/get-team-report-daily', controllers.getTeamReportDaily);
router.get('/get-box-score', controllers.getBoxScore);
router.get('/get-teams', controllers.getTeams);
router.get('/get-players', controllers.getPlayers);
router.get('/get-player-report-total', controllers.getPlayerReportTotal);
router.get('/get-game-report', controllers.getGameReport);
router.get('/get-score', controllers.getScore);

module.exports = router;