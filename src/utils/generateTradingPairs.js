import {
  TOKEN_DAI,
  TOKEN_USDC,
  TOKEN_USDT,
  TOKEN_HAWK,
  TOKEN_WBTC,
  TOKEN_WETH,
  TOKEN_WMATIC,
} from "../constants";

export const generateTradingPairs = () => {
  return [
    {
      base: TOKEN_WETH,
      quote: TOKEN_DAI,
      priority: 9,
      isDefault: true
    },
    {
      base: TOKEN_HAWK,
      quote: TOKEN_WETH,
      isDefault: true
    },
    {
      base: TOKEN_WBTC,
      quote: TOKEN_WETH,
      isDefault: true
    },
    {
      base: TOKEN_WMATIC,
      quote: TOKEN_WETH
    },
    {
      base: TOKEN_HAWK,
      quote: TOKEN_DAI
    },
  ];
};
