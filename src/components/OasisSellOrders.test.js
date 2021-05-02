/* global shallow describe it expect */
/* eslint-disable import/first */
import React from 'react';
import { shallow } from 'enzyme';
import OasisSellOrders from './OasisSellOrders';
import { TOKEN_MAKER, TOKEN_WETH } from '../constants';
import { fromJS } from 'immutable';

describe('(Component) OasisSellOrders', () => {
  it('should render', () => {
    const props = {
      activeTradingPair: { baseToken : TOKEN_MAKER, quoteToken: TOKEN_WETH },
      sellOffers: fromJS([]),
      onSetOfferTakeModalOpen: jest.fn,
      onSetActiveOfferTakeOfferId: jest.fn,
      onCheckOfferIsActive: jest.fn,
      onResetCompletedOfferCheck: jest.fn
    };


    const wrapper = shallow(
      <OasisSellOrders {...props}/>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
