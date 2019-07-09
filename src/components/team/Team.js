import React from 'react';
import {Roster} from '../roster/';

export default class Team extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: true
        }
    }

    toggleCollapse = () => this.setState({collapsed: !this.state.collapsed});

    render(){
        const {escudo,nome,clubeId} = this.props;
        const {collapsed} = this.state;
        return(
            <div className="team" onClick={this.toggleCollapse}>
                <div className="team-info">
                    <h2 className="team-position">{this.props.posicao}</h2>
                    <img className="escudo" alt="escudo" src={escudo}/>
                    <h1 className="team-name">{nome}</h1>
                </div>
                <Roster collapse={collapsed} clubeId={clubeId}/>
            </div>
        );
    }
}