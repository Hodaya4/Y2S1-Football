import "./Tables.css";
import axios from "axios";
import React from "react";
class Tables extends React.Component {

    state = {
        playerNames: []
    }
    arrPlayerNames = []

    /*calcEachTeamPoints(games) {
        let tempGames = []
        games.forEach(game => {
            const homeTeam = game.homeTeam.name
            let homeTeamGoals = 0
            const awayTeam = game.awayTeam.name
            let awayTeamGoals = 0
            const goals = game.goals
            goals.forEach(goal => {
                if(goal.home) {
                    homeTeamGoals++
                }
                else {
                    awayTeamGoals++
                }
            })
            tempGames.push({homeTeam : homeTeam, homeTeamGoals : homeTeamGoals, awayTeam : awayTeam, awayTeamGoals : awayTeamGoals})
        })
        this.setState({
            games : tempGames
        })
    }*/

    /*setTeamPlayers(team) {
        let tempPlayers = []
        team.forEach(player => {
            tempPlayers.push(player.firstName + " " + player.lastName)
        })
        this.setState({team : tempPlayers})
    }

    getTeamInfo(team) {
        const index = this.props.teamsId[this.props.teams.findIndex(item => {
            return item.name === team.name
        })]

        axios.get("https://app.seker.live/fm1/history/" + this.props.leagueId + "/" + this.props.teamsId[index]).
        then((response) => {
            this.calcEachTeamPoints(response)
        })

        axios.get("https://app.seker.live/fm1/squad/" + this.props.leagueId + "/" + this.props.teamsId[index]).
        then((response) => {

        })
    }*/

    playerNameList = (id) => {
        let name
        this.arrPlayerNames = []
        axios.get("https://app.seker.live/fm1/squad/" + this.props.leagueId + "/" + id)
            .then((response) => {
                response.data.forEach(item => {
                    name = item.firstName + " " + item.lastName
                    this.arrPlayerNames.push(name)
                })
            })
        this.setState({
            playerNames: this.arrPlayerNames
        })
    }

    render(){
        return(
            <div>
                <table>
                    <tr>
                        <th>Points</th>
                        <th>Goals Delta</th>
                        <th>Name</th>
                    </tr>
                    {
                        this.props.teams.map((item) => {
                            return(
                                <tr /*onClick={this.playerNameList(item.id)}*/>
                                    <td>
                                        {item.points}
                                    </td>
                                    <td>
                                        {item.goalsDelta}
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                </tr>
                            )
                        })
                    }




                </table>
            </div>
        )
    }
}

export default Tables;