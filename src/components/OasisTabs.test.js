/* global shallow describe it expect */
/* eslint-disable import/first */
import React from 'react';

import OasisTabs from './OasisTabs';
import { shallow } from 'enzyme';
import { TOKEN_DAI, TOKEN_WETH } from '../constants';

describe('(Component) OasisTabs', () => {
  it('should render', () => {
    const props = {
      defaultTradingPair: {
        baseToken: TOKEN_WETH,
        quoteToken: TOKEN_DAI
      }
    };
    const wrapper = shallow(
      <OasisTabs {...props}/>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
