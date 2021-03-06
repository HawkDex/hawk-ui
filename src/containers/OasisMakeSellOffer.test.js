/* global shallow describe it expect */
/* eslint-disable import/first */
import React from 'react';
import { fromJS } from 'immutable';

import {
  OasisMakeSellOfferWrapper,
  mapStateToProps,
  mapDispatchToProps
} from './OasisMakeSellOffer';
import { shallow } from 'enzyme';
import { TOKEN_WETH } from '../constants';

describe('(Container) OasisMakeSellOffer', () => {
  const state = fromJS(global.storeMock);
  const initialProps = mapStateToProps(state);
  const initialActions = mapDispatchToProps(x => x);
  const props = {
    ...initialActions,
    ...initialProps,
    baseToken: TOKEN_WETH,
  };

  it('will receive right props', () => {
    expect(initialProps).toMatchSnapshot();
  });


  it('will receive right actions', () => {
    expect(initialActions).toMatchSnapshot();
  });

  it('should render', () => {
    const wrapper = shallow(
      <OasisMakeSellOfferWrapper {...props}/>
    );
    expect(wrapper).toMatchSnapshot();
  });

});
