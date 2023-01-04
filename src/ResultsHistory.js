import React from "react";
import axios from "axios";
import SelectBox from "./SelectBox";

class ResultsHistory extends React.Component {

    state = {
        startRound: 1,
        endRound: 0,
        roundList: [],
        leagues: []

    }

    componentDidMount = () => {
        axios.get("https://app.seker.live/fm1/history/" + this.state.leagueId)
            .then((response) => {
                const lastGame = response.data[response.data.length - 1]
                this.setState({
                    endRound: lastGame.round
                })
            })
        this.roundList();
    }

    roundList = () => {
        let tempList = []
        for (let i = this.state.startRound; i <= this.state.endRound; i++) {
            tempList.push(i)
        }
        this.setState({
            roundList : tempList
        })
    }

    startRoundChanged = (event) => {
        this.setState({
            startRound: event.target.value
        })


    }

    setLeagues = (receivedLeagues) => {
        this.setState({
            leagues: receivedLeagues
        })
    }

    render() {
        return(
            <div>
                <SelectBox responseClick={this.setLeagues.bind(this)}/>
                Start:
                <select value={this.state.startRound} onChange={this.startRoundChanged}>
                    <option value={"none"} disabled={true}>Select Start Round</option>
                    {
                        this.state.roundsList.map((item) => {
                            return (
                                <option value={item}>{item}</option>
                            )
                        })
                    }
                </select>


            </div>
        )
    }



}

export default ResultsHistory;