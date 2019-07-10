import React from 'react';
import {Team} from '../team';

export default class Standing extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            teams: {},
            searchCriteria: ''
        }
    }
    
    async componentDidMount(){
        var fetchedData = await this.fetchTeams();
        this.setState({teams: fetchedData});
    }

    async fetchTeams() {
        try {
            const response = await fetch('/api/clubes');
            return await response.json();
        } catch (error) {
            console.warn(error);
        }
    }

    handleChangeSearchCriteria = (e) => this.setState({searchCriteria: e.target.value});

    render(){
        let {teams,searchCriteria} = this.state;
        if(teams)
            teams = Object.values(teams).filter((team) => team.posicao).sort((team1, team2) => team1.posicao - team2.posicao);
        if(searchCriteria.length > 0)
            teams = teams.filter((team) => team.nome.toLowerCase().includes(searchCriteria.toLowerCase()));
        return(
            <div className="container">
                <input className="searchbar" placeholder="filter team by name..." value={this.state.searchCriteria} onChange={this.handleChangeSearchCriteria}/>
                <div className="standing">
                    { teams ? teams.map((team, key) => {
                        if(team.id !== 1) 
                            return <Team {...team} clubeId={team.id} escudo={team.escudos["30x30"]} key={key}/>
                        return null;
                    }) : null}
                </div>
            </div>
        );
    }
}