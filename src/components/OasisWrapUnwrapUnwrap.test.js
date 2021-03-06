/* global shallow describe it expect */
/* eslint-disable import/first,no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import OasisWrapUnwrapUnwrap from './OasisWrapUnwrapUnwrap';
import { TOKEN_WETH } from '../constants';

describe('(Component) OasisWrapUnwrapUnwrap', () => {
  it('should render', () => {
    const props = {
      activeWrappedToken: TOKEN_WETH,
      onSubmit: jest.fn,
      transactionState: { txStatus: true },
      hidden: true
    };
    const wrapper = shallow(
      <OasisWrapUnwrapUnwrap {...props}/>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
