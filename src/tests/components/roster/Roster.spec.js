import React from 'react';
import {Roster} from '../../../components/roster/';
import {shallow} from 'enzyme';
import {Player} from '../../../components/player/'

import '../../test.setup';

describe("Roster tests section", () => {
    it("should fetch players data from CartolaFC's server and filter by the specific team.", done => {
        // prepare
        const mockSuccessResponse = {"atletas":[{            
                "nome": "Fábio Deivson Lopes Maciel",
                "slug": "fabio",
                "apelido": "Fábio",
                "foto": "https://s.glbimg.com/es/sde/f/2018/05/18/d4072db4bdda7615aec2517449afe555_FORMATO.png",
                "atleta_id": 37656,
                "rodada_id": 9,
                "clube_id": 283,
                "posicao_id": 1,
                "status_id": 7,
            },
            {
                "nome": "Pedro Tonon Geromel",
                "slug": "pedro-geromel",
                "apelido": "Pedro Geromel",
                "foto": "https://s.glbimg.com/es/sde/f/2018/05/21/afc76ea4e9c31e2977ea5e9a90c802b3_FORMATO.png",
                "atleta_id": 80853,
                "rodada_id": 9,
                "clube_id": 284,
                "posicao_id": 3,
                "status_id": 7,
            }
        ]};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({json: () => mockJsonPromise});
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        
        // execution
        const wrapper = shallow(<Roster clubeId={283}/>);
        
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('/api/atletas/mercado');

        process.nextTick(() => { // Ensuring that the functions queued before are completed.
            expect(wrapper.state().players).toEqual([{            
                "nome": "Fábio Deivson Lopes Maciel",
                "slug": "fabio",
                "apelido": "Fábio",
                "foto": "https://s.glbimg.com/es/sde/f/2018/05/18/d4072db4bdda7615aec2517449afe555_FORMATO.png",
                "atleta_id": 37656,
                "rodada_id": 9,
                "clube_id": 283,
                "posicao_id": 1,
                "status_id": 7,
            }]);
            global.fetch.mockClear();
            done();
        });
    });

    it('should render Player component for each player in state.players', () => {
        // prepare
        const wrapper = shallow(<Roster/>);
        // execution
        wrapper.setState({players:[{nome: 'Fabio'},{nome: 'Geromel'}]});
        expect(wrapper.find(Player)).toHaveLength(2);
    });
});