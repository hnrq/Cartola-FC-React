import React from 'react';
import {Team} from '../../../components/team/';
import {Roster} from '../../../components/roster/';
import {shallow} from 'enzyme';

import '../../test.setup';

describe("Team tests section", () => {
    it("should render team info.", () => {
        // prepare
        const shieldSrc  = "https://http2.mlstatic.com/escudo-cruzeiro-esporte-clube-60-cm-de-altura-mdfcompensad-D_NQ_NP_990179-MLB26596984216_012018-F.jpg";
        const wrapper = shallow(<Team escudo={shieldSrc} nome={"Cruzeiro"}/>);
        // execution
        expect(wrapper.find("img").prop("src")).toEqual(shieldSrc);
        expect(wrapper.find("h1").text()).toBe("Cruzeiro");
    });

    it("should have one Roster component", () => {
        // prepare
        const wrapper = shallow(<Team/>);
        // execution
        expect(wrapper.find(Roster)).toHaveLength(1);
    });

    it("should pass club ID prop as a prop to Roster", () => {
        // prepare
        const wrapper = shallow(<Team clubeId={283}/>);
        // execution
        expect(wrapper.find(Roster).prop('clubeId')).toBe(283);
    });

    it("should be mounted collapsed by default", () => {
        // prepare
        const wrapper = shallow(<Team/>);
        // execution
        expect(wrapper.state().collapsed).toBe(true);
    });

    it("should toggle collapse state on click", () => {
        // prepare
        const wrapper = shallow(<Team/>);
        // execution
        wrapper.simulate('click',{});
        expect(wrapper.state().collapsed).toBe(false);
        wrapper.simulate('click',{});
        expect(wrapper.state().collapsed).toBe(true);
    });
});