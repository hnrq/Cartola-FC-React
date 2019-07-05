import React from 'react';
import {positions} from '../../utils/';

export default class Player extends React.Component{
    render(){
        return(
            <div>
                <img src={this.props.foto}/>
                <h1>{this.props.nome}</h1>
                <h3>{positions.find((position) => position.id === this.props.positionId).nome}</h3>
            </div>
        );
    }
}

Player.defaultProps = {
    nome: "Allejo",
    positionId: 6
}