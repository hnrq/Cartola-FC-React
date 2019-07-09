import React from 'react';
import {shallow} from 'enzyme';
import {Player} from '../../../components/player/';

import '../../test.setup';

describe('Player tests section', () => {
    it('should render an image.',() => {
        // prepare
        const imageSrc = "https://static.ndonline.com.br/2014/12/07-12-2014-11-12-03-alex-o-craque-que-brilhou-e-fez-historia-com-a-camisa-do-cruzeiro.jpg";
        const wrapper = shallow(<Player foto={imageSrc}/>);
        // execution
        expect(wrapper.find("img").prop("src")).toEqual(imageSrc);
    });

    it("should have the player's info passed as props.",()=>{
        // prepare
        const wrapper = shallow(<Player apelido="Alex"/>);
        // execution
        expect(wrapper.find("h1").text()).toBe("Alex");
    });

    it("should get position name by position Id prop.", () => {
        // prepare
        const wrapper = shallow(<Player positionId={4}/>);
        // execution
        expect(wrapper.find("h3").text()).toBe("Meia");
    });
});