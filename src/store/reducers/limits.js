import { createAction, handleActions } from "redux-actions";
import { fromJS } from "immutable";
import { fulfilled } from "../../utils/store";
import { convertTo18Precision } from "../../utils/conversion";
import { TOKEN_DAI, TOKEN_USDC, TOKEN_USDT, TOKEN_HAWK, TOKEN_WETH, TOKEN_WBTC, TOKEN_WMATIC } from '../../constants';

const initialState = fromJS({
  limitsLoaded: false,
  tokens: {
    [TOKEN_WETH]:        { minSell: null, maxSell: null },
    [TOKEN_DAI]:         { minSell: null, maxSell: null },
    [TOKEN_USDC]:        { minSell: null, maxSell: null },
    [TOKEN_USDT]:        { minSell: null, maxSell: null },
    [TOKEN_WBTC]:        { minSell: null, maxSell: null },
    [TOKEN_WMATIC]:      { minSell: null, maxSell: null },
    [TOKEN_HAWK]:        { minSell: null, maxSell: null },
  }
});

const init = createAction("LIMITS/INIT", () => null);

/**
 *
 */
const getTokenMinSell = createAction(
  "LIMITS/GET_MIN_SELL",
  () => async () => {}
);

/**
 * Get min sell limits for all tokens traded.
 */
const getAllTradedTokenMinSellLimits = createAction(
  "LIMITS/GET_ALL_TRADED_TOKENS_MIN_SELL",
  async (marketContract, tokensContractsLists) =>
    Promise.all(
      Object.entries(tokensContractsLists).map(([, tokenContract]) =>
        marketContract.getMinSell(tokenContract.address)
      )
    ).then(tokensMinSellLimits => {
      const limitsByTokenName = {};
      Object.keys(tokensContractsLists).forEach(
        (key, i) =>
          (limitsByTokenName[key] = convertTo18Precision(
            tokensMinSellLimits[i].toNumber(),
            key
          )).toString()
      );
      return limitsByTokenName;
    })
);

const actions = {
  init,
  getTokenMinSell,
  getAllTradedTokenMinSellLimits
};

const reducer = handleActions(
  {
    [fulfilled(getAllTradedTokenMinSellLimits)]: (state, { payload }) =>
      state
        .update("tokens", tokens => {
          Object.entries(payload).forEach(
            ([tokenName, tokenMinSell]) =>
              (tokens = tokens.setIn([tokenName, "minSell"], tokenMinSell))
          );
          return tokens;
        })
        .set("limitsLoaded", true)
  },
  initialState
);

export default {
  actions,
  reducer
};
