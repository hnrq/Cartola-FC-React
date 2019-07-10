import React from 'react';
import {Player} from '../player/';

export default class Roster extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            players: undefined
        }
    }

    async componentDidMount() {
        try {
            var fetchedData = await this.fetchRoster();
            fetchedData = fetchedData.atletas.filter((atleta) => atleta.clube_id === this.props.clubeId).sort((a1,a2) => a1.posicao_id - a2.posicao_id);
            this.setState({players: fetchedData});
        } catch (error) {
        }
    }

    abortController = new AbortController();

    async fetchRoster() {
        try {
            const response = await fetch('/api/atletas/mercado', {signal: this.abortController.signal});
            return await response.json();
        } catch (error) {
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }
    
    render(){
        const {players} = this.state;
        const {collapse} = this.props;
        return (
            <div className={`roster${collapse ? ' collapse' : ''}`}>
                {players ? players.map((player,key) => <Player {...player} key={key} positionId={player.posicao_id}/> ) : null}
            </div>
        )
    }
}