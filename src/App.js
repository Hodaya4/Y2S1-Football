import './App.css';
import React from "react";
import axios, {get} from "axios";
import {BrowserRouter , Routes , Route ,NavLink} from "react-router-dom";
import Tables from "./Tables";
import GeneralStatistics from "./GeneralStatistics";
import ResultsHistory from "./ResultsHistory";
import TopScorers from "./TopScorers";

class App extends React.Component {

  state = {
    option  :  "none" ,
    leagues : [] ,
    teams: []
  }
  arrName = []
  tempTeams = []



  leagueChanged = (event) => {
    this.setState({
      option : event.target.value
    })
    this.getTeams();
  }

  componentDidMount() {
    this.getLeagues();
  }

  getLeagues = () => {
    axios.get("https://app.seker.live/fm1/leagues").
    then((response)  => {
      response.data.map((item) => {
        return(
            this.arrName.push(item.name)
        )
      })
      this.setState({
        leagues : this.arrName
      })
    })
  }

  getTeams = () => {
    axios.get("https://app.seker.live/fm1/teams/" + this.state.leagues.indexOf(this.state.option) + 1).
    then((response) => {
      response.data.map((item) => {
        return (
            this.tempTeams.push(item.name)
        )
      })
      this.setState({
        teams : this.tempTeams
      })


    })
  }





  render() {
    return (
        <div className="App">
          <div> Information about soccer leagues:</div>
          Which league would you like?
          <select value={this.state.option} onChange={this.leagueChanged}>{this.state.option}>
            <option value={"none"}>None</option>
            {
              this.state.leagues.map((item) => {
                return (
                    <option value={item}>{item}</option>
                )
              })
            }
          </select>
          <BrowserRouter>
            <div>
              <NavLink  style={{margin : "10px"}} to={"./Tables"}>Tables</NavLink>
              <NavLink  style={{margin : "10px"}} to={"./GeneralStatistics"}>General statistics</NavLink>
              <NavLink  style={{margin : "10px"}} to={"./ResultsHistory"}>Results history</NavLink>
              <NavLink  style={{margin : "10px"}} to={"./TopScorers"}>Top scorers</NavLink>
            </div>
            <Routes>
              <Route path={"/Tables"} element = {<Tables/>}></Route>
              <Route path={"/GeneralStatistics"} element = {<GeneralStatistics/>}></Route>
              <Route path={"/ResultsHistory"} element = {<ResultsHistory/>}></Route>
              <Route path={"/TopScorers"} element = {<TopScorers/>}></Route>
            </Routes>
          </BrowserRouter>
        </div>
    );
  }



}


export default App;