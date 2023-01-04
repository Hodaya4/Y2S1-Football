import "./Tables.css";
import axios from "axios";
import React from "react";
import SelectBox from "./SelectBox";

class Tables extends React.Component {

    state = {
        playerNames: [],

        teams: []
    }
    tempTeams = []

    arrPlayerNames = []


    getTeams = (currentLeagueId) => {
            axios.get("https://app.seker.live/fm1/teams/" + currentLeagueId)
                .then((response) => {
                    this.tempTeams = []
                    response.data.map((item) => {

                        axios.get("https://app.seker.live/fm1/history/" + currentLeagueId + "/" + item.id)
                            .then((response) => {
                                let tempPoints = 0
                                let delta = 0
                                response.data.forEach(game => {
                                    let goalsScored = 0
                                    let goalsConceded = 0
                                    let home

                                    if (game.homeTeam.id === item.id) {
                                        home = true
                                    }else {
                                        home = false
                                    }
                                    game.goals.forEach(goal => {
                                        if (goal.home === home) {
                                            goalsScored++
                                            delta++
                                        } else {
                                            goalsConceded++
                                            delta--
                                        }
                                    })

                                    if (goalsScored > goalsConceded) {
                                        tempPoints+=3
                                    } else if (goalsScored === goalsConceded) {
                                        tempPoints++
                                    }
                                })
                                this.tempTeams.push({
                                    name : item.name,
                                    id : item.id,
                                    points : tempPoints,
                                    goalsDelta : delta
                                })

                            })
                    })
                    this.setState({
                        teams: this.tempTeams,
                    })
                })
        }


        /*


            playerNameList = (id) => {
                let name
                this.arrPlayerNames = []
                axios.get("https://app.seker.live/fm1/squad/" + this.props.currentLeagueId + "/" + id)
                    .then((response) => {
                        response.data.forEach(item => {
                            name = item.firstName + " " + item.lastName
                            this.arrPlayerNames.push(name)
                        })
                    })
                this.setState({
                    playerNames: this.arrPlayerNames
                },() => {
                    console.log(this.state.playerNames)
                })
            }

            showDetails = (id) => {
                this.playerNameList(id)
                return (
                    <ul>
                        {
                            this.state.playerNames.map((item) => {
                                console.log(item)
                                return (
                                    <li key={item}>{item}</li>
                                )
                            })

                        }
                    </ul>

                )
            }


            sortTeams() {
    let tempTeams = this.state.teams
    tempTeams  = tempTeams.sort((a, b) => {
      if (a.points > b.points){
        return -1
      }
      if (a.points  === b.points){
        if (a.goalsDelta > b.goalsDelta){
          return -1
        }
        if (a.goalsDelta === b.goalsDelta){
          if (a.name < b.name){
            return  -1
          }
        }
      }
    })
    this.setState ({
      teams: tempTeams
    })
  }
        */


    render() {
        return(
            <div>
                <SelectBox responseClick={this.getTeams.bind(this)}/>
                {
                    (this.state.teams.length > 0) &&
                    <table>
                        <tr>
                            <th>Points</th>
                            <th>Goals Delta</th>
                            <th>Name</th>
                        </tr>
                        {
                            this.state.teams.map((team) => {
                                return(
                                    <tr /*onClick={() => {
                                    this.showDetails(team.id)
                                }}*/>
                                        <td>
                                            {team.points}
                                        </td>
                                        <td>
                                            {team.goalsDelta}
                                        </td>
                                        <td>
                                            {team.name}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                }

                {


                }
            </div>
        )
    }
}

export default Tables;
