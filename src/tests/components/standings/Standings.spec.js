import React from 'react';
import {Standings} from '../../../components/standings/';
import {Team} from '../../../components/team/';
import {shallow} from 'enzyme';

import '../../test.setup';

define("Standings tests section", () => {
    it("should fetch the teams", () => {
        // prepare
        const mockSuccessResponse = {"262": {
            "id": 262,
            "nome": "Flamengo",
            "abreviacao": "FLA",
            "posicao": 3,
            "nome_fantasia": "Flamengo"
            },
            "263": {
            "id": 263,
            "nome": "Botafogo",
            "abreviacao": "BOT",
            "posicao": 7,
            "nome_fantasia": "Botafogo"
            }
        }
        const mockJsonPromise = new Promise(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({json: () => mockJsonPromise});
        jest.spyOn(global,'fetch').mockImplementation(() => mockFetchPromise);
        
        // execution
        const wrapper = shallow(<Standings/>);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('https://api.cartolafc.globo.com/clubes');

        process.nextTick(() => { // Ensuring that the functions queued before are completed.
            expect(wrapper.state().teams).toEqual(mockSuccessResponse);

            global.fetch.mockClear();
            done();
        });
    });

    it("should render one Team component for each one in state.teams", () => {
        // prepare
        const mockTeams = {"262": {
            "nome": "Flamengo"
            },
            "263": {
            "nome": "Botafogo"
            },
            "601": {
            "nome": "Atletico-MG"
            }
        }
        const wrapper = shallow(<Standings/>);
        
        // execution
        wrapper.setState({teams:mockTeams});
        expect(wrapper.find(Team)).toHaveLength(3);
    });
});