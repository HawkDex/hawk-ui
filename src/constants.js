/**
 *   NETWORKS
 */
export const MAIN_NET_ID = "1";
export const KOVAN_NET_ID = "42";
export const KOVAN = "kovan";
export const MAIN = "main";

/**
 * NETWORK STATUS
 */
export const ONLINE = "NETWORK/ONLINE";
export const CONNECTING = "NETWORK/CONNECTING";
export const OUT_OF_SYNC = "NETWORK/OUT_OF_SYNC";
export const CLOSED = "NETWORK/CLOSED";

/**
 * BIG NUMBER
 */
export const BN_DECIMAL_PRECISION = 18;

/**
 * PRECISION
 */

export const ETH_UNIT_WEI = "wei"; // wei 	1 wei 	1
export const ETH_UNIT_KWEI = "kwei"; // Kwei (babbage) 	1e3 wei 	1,000
export const ETH_UNIT_MWEI = "mwei"; // Mwei (lovelace) 	1e6 wei 	1,000,000
export const ETH_UNIT_GWEI = "gwei"; // Gwei (shannon) 	1e9 wei 	1,000,000,000
export const ETH_UNIT_MICROETHER = "microether"; // microether (szabo) 	1e12 wei 	1,000,000,000,000
export const ETH_UNIT_MILIETHER = "milliether"; // milliether (finney) 	1e15 wei 	1,000,000,000,000,000
export const ETH_UNIT_ETHER = "ether"; // ether 	1e18 wei 	1,000,000,000,000,000,000

export const HAS_ACCOUNTS = true;
export const NO_ACCOUNTS = false;

export const TOKEN_MATIC = "MATIC";
export const TOKEN_WETH = "WETH";
export const TOKEN_WBTC = "WBTC";
export const TOKEN_WMATIC = "WMATIC";
export const TOKEN_DAI = "DAI";
export const TOKEN_USDC = "USDC";
export const TOKEN_USDT = "USDT";
export const TOKEN_HAWK = "HAWK";

export const QUOTE_TOKENS = [TOKEN_WETH, TOKEN_DAI];

export const BASE_TOKENS = [
  TOKEN_DAI,
  TOKEN_WMATIC,
  TOKEN_USDC,
  TOKEN_USDT,
  TOKEN_WBTC,
  TOKEN_HAWK,
];

export const MAKE_BUY_OFFER = "OFFER_MAKES/MAKE_BUY_OFFER";
export const MAKE_SELL_OFFER = "OFFER_MAKES/MAKE_SELL_OFFER";
export const MAKE_SELL_OFFER_FORM_NAME = "makeSellOffer";
export const MAKE_BUY_OFFER_FORM_NAME = "makeBuyOffer";

export const TOKEN_ALLOWANCE_TRUST_STATUS_DISABLED_MIN_MAX = 0;
export const TOKEN_ALLOWANCE_TRUST_STATUS_ENABLED = true;
export const TOKEN_ALLOWANCE_TRUST_STATUS_DISABLED = false;
export const TOKEN_ALLOWANCE_TRUST_STATUS_NOT_SET = undefined;
export const TOKEN_ALLOWANCE_TRUST_STATUS_LOADING = null;
export const TOKEN_ALLOWANCE_TRUST_STATUS_ENABLED_MIN =
  "0xffffffffffffffffffffffffffffffff";
export const TOKEN_ALLOWANCE_TRUST_STATUS_ENABLED_MAX =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

export const TOKEN_ALLOWANCE_TRUST_SUBJECT_TYPE_MARKET =
  "BALANCES/TOKEN_ALLOWANCE_TRUST_SUBJECT_TYPE_MARKET";
export const TOKEN_ALLOWANCE_TRUST_SUBJECT_TYPE_ADDRESS =
  "BALANCES/TOKEN_ALLOWANCE_TRUST_SUBJECT_TYPE_ADDRESS";

export const SYNC_STATUS_PRISTINE = "SYNC_STATUS_PRISTINE";
export const SYNC_STATUS_PENDING = "SYNC_STATUS_PENDING";
export const SYNC_STATUS_COMPLETED = "SYNC_STATUS_COMPLETED";
export const SYNC_STATUS_ERROR = "SYNC_STATUS_ERROR";

export const SETMAXBTN_HIDE_DELAY_MS = 100;

/**
 *  GAS and GAS_PRICE default values
 */
export const DEFAULT_GAS_LIMIT = "1000000"; // 1M GAS
export const DEFAULT_GAS_PRICE = "2000000000"; // 6 GWEI

/**
 * Subscriptions
 */

export const SUBSCRIPTIONS_GROUP_GLOBAL_INITIAL = 'SUBSCRIPTIONS/GROUP_GLOBAL/INITIAL';
export const SUBSCRIPTIONS_GROUP_ACCOUNT_SPECIFIC_INITIAL = 'SUBSCRIPTIONS/GROUP_ACCOUNTS_SPECIFIC/INITIAL';

export const SUBSCRIPTIONS_LATEST_BLOCK = "SUBSCRIPTIONS/LATEST_BLOCK";
export const SUBSCRIPTIONS_TOKEN_BALANCE_EVENTS = "SUBSCRIPTIONS/TOKEN_BALANCES";
export const SUBSCRIPTIONS_ORDERS_EVENTS = "SUBSCRIPTIONS/ORDERS_EVENTS";
export const SUBSCRIPTIONS_ETHER_BALANCE_CHANGE_EVENTS = "SUBSCRIPTIONS/ETHER_BALANCE_CHANGE_EVENTS";
export const SUBSCRIPTIONS_LOG_TAKE_EVENTS = "SUBSCRIPTIONS/LOG_TAKE_EVENTS";
export const SUBSCRIPTIONS_USER_LOG_TAKE_EVENTS = "SUBSCRIPTIONS/USER_LOG_TAKE_EVENTS";
export const SUBSCRIPTIONS_TOKEN_TRANSFER_EVENTS = "SUBSCRIPTIONS/TOKEN_TRANSFER_EVENTS";
export const SUBSCRIPTIONS_TOKEN_TRANSFER_HISTORY_EVENTS = "SUBSCRIPTIONS/TOKEN_TRANSFER_HISTORY_EVENTS";
export const SUBSCRIPTIONS_TOKEN_WRAP_UNWRAP_HISTORY_EVENTS = "SUBSCRIPTIONS/TOKEN_TRANSFER_HISTORY_EVENTS";


export const subscriptionGroupToKeyMap = {
  [SUBSCRIPTIONS_GROUP_GLOBAL_INITIAL]: 'globalInitial',
  [SUBSCRIPTIONS_GROUP_ACCOUNT_SPECIFIC_INITIAL]: 'accountSpecificInitial'
};

export const subscriptionTypeToKeyMap = {
  [SUBSCRIPTIONS_LATEST_BLOCK]: 'latestBlock',
  // [SUBSCRIPTIONS_TOKEN_BALANCE_EVENTS]: 'tokenBalances',
  [SUBSCRIPTIONS_ORDERS_EVENTS]: 'ordersEvents',
  [SUBSCRIPTIONS_LOG_TAKE_EVENTS]: 'latestBlock',
  [SUBSCRIPTIONS_TOKEN_WRAP_UNWRAP_HISTORY_EVENTS]: 'wrapUnwrapHistory',
  [SUBSCRIPTIONS_ETHER_BALANCE_CHANGE_EVENTS]: 'etherBalance',
  [SUBSCRIPTIONS_TOKEN_TRANSFER_EVENTS]: 'tokenTransfers'
};

/**
 * Validation errors
 */

export const VALIDATION_VALUE_IS_REQUIRED = 'VALIDATION/VALUE_IS_REQUIRED';

/**
 * Global precision - 10**18
 * @type {number}
 */
export const APP_BASE_PRECISION = 18;

export const USER_TO_LOG_TAKE_OFFER_RELATION_TAKEN_BY_USER = 'USER_TO_LOG_TAKE_RELATION/TAKEN_BY_USER';
export const USER_TO_LOG_TAKE_OFFER_RELATION_USER_MADE = 'USER_TO_LOG_TAKE_RELATION/USER_MADE';
export const USER_TO_LOG_TAKE_OFFER_RELATION_NONE = 'USER_TO_LOG_TAKE_RELATION/NONE';

export const PROVIDER_TYPE_METAMASK = 'PROVIDER_TYPE/METAMASK';
export const PROVIDER_TYPE_MIST = 'PROVIDER_TYPE/MIST';
