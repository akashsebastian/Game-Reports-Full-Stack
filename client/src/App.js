import React from "react";
import "./css/App.css";
import GameReport from "./pages/game_report_page/GameReportPage";
import TeamReportPage from "./pages/team_report_page/TeamReportPage";
import PlayerReportPage from "./pages/player_report_page/PlayerReportPage";
import Menu from "./components/menu/Menu";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Menu />
      <main>
        <Container>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/game-report" />;
              }}
            />
            <Route exact path="/game-report/" component={GameReport} />
            <Route exact path="/team-report/" component={TeamReportPage} />
            <Route exact path="/player-report/" component={PlayerReportPage} />
          </Switch>
        </Container>
      </main>
    </Router>
  );
};

export default App;
