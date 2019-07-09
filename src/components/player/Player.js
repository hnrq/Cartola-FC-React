import React from 'react';
import {positions} from '../../utils/';

export default class Player extends React.Component{
    render(){
        const {foto} = this.props;
        return(
            <div className="player">
                <img alt="Foto" className="player-pic" src={foto ? foto.replace("FORMATO","140x140") : null}/>
                <h1 className="player-name">{this.props.apelido}</h1>
                <h3 className="player-role">{positions.find((position) => position.id === this.props.positionId).nome}</h3>
            </div>
        );
    }
}

Player.defaultProps = {
    nome: "Allejo",
    positionId: 6,
    foto: "",
}