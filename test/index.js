import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { test } from 'tap';
import '../setupTests';
import Repeatable from '../src';

global.window.navigator.userAgentData = { mobile: false };

test('<Repeatable />', (t) => {
    const wrapper = mount((
        <Repeatable>
            <button type="button" />
        </Repeatable>
    ));
    t.equal(wrapper.find(Repeatable).length, 1, 'should render <Repeatable /> component');
    t.end();
});

test('simulates click event', (t) => {
    const onClick = sinon.spy();
    const wrapper = mount(<Repeatable onClick={onClick} />);
    wrapper.find(Repeatable).simulate('click');
    t.ok(onClick.calledOnce, 'should be called once');
    t.end();
});
