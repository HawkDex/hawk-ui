import loadContact from "../utils/contracts/loadContract";
import createContractInstance from "../utils/contracts/createContractInstance";

const config = require("./../configs");

const erc20Abi = require("./../contracts/abi/standard-token/erc20");
const WEthAbi = require("./../contracts/abi/standard-token/ds-eth-token");
const TokenWrapperAbi = require("./../contracts/abi/token-wrapper/token-wrapper");
const MatchingMarketAbi = require("./../contracts/abi/maker-otc/matching-market");
const DepositBrokerAbi = require("./../contracts/abi/token-wrapper/deposit-broker");
const OTCSupportContractAbi = require("../contracts/abi/otc-support-methods/otc-support-methods");
import { fromJS } from "immutable";
import web3 from "./web3";
import {
  TOKEN_DAI,
  TOKEN_USDC,
  TOKEN_USDT,
  TOKEN_WBTC,
  TOKEN_WMATIC,
  TOKEN_HAWK,
  TOKEN_WETH,
} from '../constants';

let brokers = fromJS({});
let contracts = {};
let contractsInitialized = false;

const init = networkName => {
  const tokencontractsDeploymentAdressessList = config["tokens"][networkName];
  const marketDeploymentAddress = config["market"][networkName]["address"];

  const WETH = loadContact(
    WEthAbi.interface,
    tokencontractsDeploymentAdressessList["WETH"]
  );
  const DAI = loadContact(
    erc20Abi.interface,
    tokencontractsDeploymentAdressessList["DAI"]
  );
  const USDC = loadContact(
    erc20Abi.interface,
    tokencontractsDeploymentAdressessList["USDC"]
  );
  const USDT = loadContact(
    erc20Abi.interface,
    tokencontractsDeploymentAdressessList["USDT"]
  );
  const WBTC = loadContact(
    erc20Abi.interface,
    tokencontractsDeploymentAdressessList["WBTC"]
  );
  const HAWK = loadContact(
    TokenWrapperAbi.interface,
    tokencontractsDeploymentAdressessList["HAWK"]
  );
  const WMATIC = loadContact(
    erc20Abi.interface,
    tokencontractsDeploymentAdressessList["WMATIC"]
  );
  const market = loadContact(
    MatchingMarketAbi.interface,
    marketDeploymentAddress
  );
  const marketNoProxy = loadContact(
    MatchingMarketAbi.interface,
    marketDeploymentAddress,
    true
  );

  const OTCSupportMethods = loadContact(
    OTCSupportContractAbi.interface,
    config.otcSupportMethods[networkName].address
  );

  const OTCSupportMethodsNoProxy = loadContact(
    OTCSupportContractAbi.interface,
    config.otcSupportMethods[networkName].address,
    true
  );


  // const WGNTNoProxy = loadContact(
  //   TokenWrapperAbi.interface,
  //   tokencontractsDeploymentAdressessList["W-GNT"],
  //   true
  // );

  const abiList = Object.freeze({
    erc20Abi,
    WEthAbi,
    TokenWrapperAbi,
    DepositBrokerAbi,
    OTCSupportContractAbi
  });

  contracts = Object.freeze({
    tokens: {
      [TOKEN_WETH]: WETH,
      [TOKEN_WBTC]: WBTC,
      [TOKEN_DAI]: DAI,
      [TOKEN_USDC]: USDC,
      [TOKEN_USDT]: USDT,
      [TOKEN_WMATIC]: WMATIC,
      [TOKEN_HAWK]: HAWK
    },
    market,
    noProxyTokens: {
    },
    marketNoProxy,
    OTCSupportMethods,
    OTCSupportMethodsNoProxy,
    abiList,
    createContractInstance
  });
  setContractsInitialized();
};

const setContractsInitialized = initializationState =>
  (contractsInitialized = initializationState);

const initDepositBrokerContract = (token, address) => {
  if (!web3.isAddress(address)) {
    throw new Error("This is not Ethereum address!");
  }
  brokers = brokers.set(
    token,
    loadContact(DepositBrokerAbi.interface, address)
  );
  console.log("initDepositBrokerContract", brokers);
  return brokers.get(token);
};

const getTokenContractInstance = tokenName => {
  if (contracts.tokens[tokenName]) {
    return contracts.tokens[tokenName];
  } else {
    throw Error(`Contract for *${tokenName}* token not found!`);
  }
};

const getMarketContractInstance = () => {
  if (contracts.market) {
    return contracts.market;
  } else {
    throw Error(`Contract for *market* not found!`);
  }
};

const getOTCSupportMethodsContractInstance = () => {
  if (contracts.OTCSupportMethods) {
    return contracts.OTCSupportMethods;
  } else {
    throw Error(`Contract for *OTCSupportMethodsContract* not found!`);
  }
};

const getOTCSupportMethodsNoProxyContractInstance = () => {
  if (contracts.OTCSupportMethodsNoProxy) {
    return contracts.OTCSupportMethodsNoProxy;
  } else {
    throw Error(`Contract for *OTCSupportMethodsContract* not found!`);
  }
};

const getTokenContractsList = () => contracts.tokens;

const getMarketNoProxyContractInstance = () => contracts.marketNoProxy;
const getTokenNoProxyContractInstance = tokenName =>
  contracts.noProxyTokens[tokenName];

const getDepositBrokerContractInstance = token => {
  if (brokers.has(token)) {
    return brokers.get(token);
  }
};

const areContractsInitialized = () => contractsInitialized;

export {
  getTokenContractInstance,
  getDepositBrokerContractInstance,
  getMarketContractInstance,
  getTokenContractsList,
  getMarketNoProxyContractInstance,
  getTokenNoProxyContractInstance,
  initDepositBrokerContract,
  areContractsInitialized,
  getOTCSupportMethodsContractInstance,
  getOTCSupportMethodsNoProxyContractInstance
};

export default {
  init
};
