import React from 'react';
import {Standing} from '../../../components/standing/';
import {Team} from '../../../components/team';
import {shallow} from 'enzyme';

import '../../test.setup';

describe("Standing tests section", () => {
    it("should fetch the teams", done => {
        // prepare
        const mockSuccessResponse = {"262": {
            "id": 262,
            "nome": "Flamengo",
            "abreviacao": "FLA",
            "posicao": 3,
            "escudos": {
            "60x60": "https://s.glbimg.com/es/sde/f/equipes/2018/04/09/Flamengo-65.png",
            "45x45": "https://s.glbimg.com/es/sde/f/equipes/2018/04/09/Flamengo-45.png",
            "30x30": "https://s.glbimg.com/es/sde/f/equipes/2018/04/09/Flamengo-30.png"
            },
            "nome_fantasia": "Flamengo"
            },
            "263": {
            "id": 263,
            "nome": "Botafogo",
            "abreviacao": "BOT",
            "posicao": 7,
            "escudos": {
            "60x60": "https://s.glbimg.com/es/sde/f/equipes/2014/04/14/botafogo_60x60.png",
            "45x45": "https://s.glbimg.com/es/sde/f/equipes/2013/12/16/botafogo_45x45.png",
            "30x30": "https://s.glbimg.com/es/sde/f/equipes/2013/12/16/botafogo_30x30.png"
            },
            "nome_fantasia": "Botafogo"
            },
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({json: () => mockJsonPromise});
        jest.spyOn(global,'fetch').mockImplementation(() => mockFetchPromise);
        
        // execution
        const wrapper = shallow(<Standing/>);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('/api/clubes');

        process.nextTick(() => { // Ensuring that the functions queued before are completed.
            expect(wrapper.state().teams).toEqual(mockSuccessResponse);

            global.fetch.mockClear();
            done();
        });
    });

    it("should render one Team component for each one in state.teams", () => {
        // prepare
        const mockTeams = {"262": {
            "id": 262,
            "nome": "Flamengo",
            "abreviacao": "FLA",
            "posicao": 3,
            "escudos": {
            "60x60": "https://s.glbimg.com/es/sde/f/equipes/2018/04/09/Flamengo-65.png",
            "45x45": "https://s.glbimg.com/es/sde/f/equipes/2018/04/09/Flamengo-45.png",
            "30x30": "https://s.glbimg.com/es/sde/f/equipes/2018/04/09/Flamengo-30.png"
            },
            "nome_fantasia": "Flamengo"
            },
            "263": {
            "id": 263,
            "nome": "Botafogo",
            "abreviacao": "BOT",
            "posicao": 7,
            "escudos": {
            "60x60": "https://s.glbimg.com/es/sde/f/equipes/2014/04/14/botafogo_60x60.png",
            "45x45": "https://s.glbimg.com/es/sde/f/equipes/2013/12/16/botafogo_45x45.png",
            "30x30": "https://s.glbimg.com/es/sde/f/equipes/2013/12/16/botafogo_30x30.png"
            },
            "nome_fantasia": "Botafogo"
            },

            "601": {
                "id": 601,
                "nome": "Atletico-MG",
                "abreviacao": "BOT",
                "posicao": 7,
                "escudos": {
                "60x60": "https://s.glbimg.com/es/sde/f/equipes/2014/04/14/botafogo_60x60.png",
                "45x45": "https://s.glbimg.com/es/sde/f/equipes/2013/12/16/botafogo_45x45.png",
                "30x30": "https://s.glbimg.com/es/sde/f/equipes/2013/12/16/botafogo_30x30.png"
                },
                "nome_fantasia": "Botafogo"
                },
        }
        const wrapper = shallow(<Standing/>);
        
        // execution
        wrapper.setState({teams:mockTeams});
        expect(wrapper.find(Team)).toHaveLength(3);
        expect(wrapper.find(Team).get(0).props.nome).toBe("Flamengo");
        expect(wrapper.find(Team).get(1).props.nome).toBe("Botafogo");
        expect(wrapper.find(Team).get(2).props.nome).toBe("Atletico-MG");
    });

    it('should change search criteria when input is changed', () => {
        // prepare
        const wrapper = shallow(<Standing/>);
        // execution
        wrapper.find('input').simulate('change', {target: {value: 'test'}});
        expect(wrapper.state().searchCriteria).toBe('test');
        expect(wrapper.find('input').props().value).toBe('test');
    });
});