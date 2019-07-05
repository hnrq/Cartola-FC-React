import React from 'react';
import {Player} from '../player/';

export default class Roster extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            players: []
        }
    }

    async componentDidMount() {
        var fetchedData = await this.fetchRoster();
        fetchedData = fetchedData.players.filter((player) => player.clube_id === this.props.clubeId);
        this.setState({players: fetchedData});
    }

    async fetchRoster() {
        try {
            const response = await fetch('https://api.cartolafc.globo.com/atletas/mercado');
            return await response.json();
        } catch (error) {
            console.warn(error);
        }
    }

    render(){
        const {players} = this.state;
        return (
            <div>
                {players.map((player,key) => <Player {...player} key={key}/>)}
            </div>
        )
    }
}