import { createAction, handleActions } from "redux-actions";
import { fromJS } from "immutable";
import { reset, formValueSelector, change } from "redux-form/immutable";

import {
  DEFAULT_GAS_PRICE,
  ETH_UNIT_ETHER,
  TOKEN_MATIC,
  TOKEN_WMATIC
} from "../../constants";
import wrapUnwrap from "../selectors/wrapUnwrap";
import accounts from "../selectors/accounts";
import { fulfilled } from "../../utils/store";
import web3 from "../../bootstrap/web3";
import {
  TX_UNWRAP_ETHER,
  TX_UNWRAP_TOKEN_WRAPPER,
  TX_WRAP_ETHER,
  TX_WRAP_TOKEN_WRAPPER
} from "./transactions";
import { createPromiseActions } from "../../utils/createPromiseActions";
import balances from "../selectors/balances";
import { handleTransaction } from "../../utils/transactions/handleTransaction";
import {
  getDepositBrokerContractInstance,
  getTokenContractInstance,
  getTokenNoProxyContractInstance,
  initDepositBrokerContract
} from "../../bootstrap/contracts";

export const WRAP_UNWRAP_CREATE_DEPOSIT_BROKER =
  "WRAP_UNWRAP/CREATE_DEPOSIT_BROKER";
export const WRAP_UNWRAP_CLEAR_DEPOSIT_BROKER =
  "WRAP_UNWRAP/CLEAR_DEPOSIT_BROKER";

const initialState = fromJS({
  wrapperTokenPairs: [
    {
      unwrapped: TOKEN_MATIC,
      wrapper: TOKEN_WMATIC
    },
  ],
  activeUnwrappedToken: TOKEN_MATIC,
  loadedBrokerContracts: [],
  brokerAddresses: {},
  activeTokenWrapStatus: null,
  activeTokenUnwrapStatus: null
});

export const WRAP_ETHER = "WRAP_UNWRAP/WRAP_ETHER";
export const UNWRAP_ETHER = "WRAP_UNWRAP/UNWRAP_ETHER";
export const WRAP_TOKEN_WRAPPER_NEXT_TRANSACTION_DELAY_MS = 3000;

export const WRAP_TOKEN_WRAPPER = "WRAP_UNWRAP/WRAP_GNT_TOKEN";
export const UNWRAP_TOKEN_WRAPPER = "WRAP_UNWRAP/UNWRAP_GNT_TOKEN";

export const TOKEN_WRAP_STATUS_AWAITING_TRANSFER_TO_BROKER_APPROVAL =
  "TOKEN_WRAP_STATUS_AWAITING_TRANSFER_TO_BROKER_APPROVAL";
export const TOKEN_WRAP_STATUS_TRANSFER_TO_BROKER_PENDING =
  "TOKEN_WRAP_STATUS_TRANSFER_TO_BROKER_PENDING";
export const TOKEN_WRAP_STATUS_TRANSFER_TO_BROKER_COMPLETE =
  "TOKEN_WRAP_STATUS_TRANSFER_TO_BROKER_COMPLETE";
export const TOKEN_WRAP_STATUS_AWAITING_TRANSFER_TO_WRAPPER_CONTRACT_APROVAL =
  "TOKEN_WRAP_STATUS_AWAITING_TRANSFER_TO_WRAPPER_CONTRACT_APROVAL";
export const TOKEN_WRAP_STATUS_WRAP_COMPLETE =
  "TOKEN_WRAP_STATUS_WRAP_COMPLETE";

export const TOKEN_UNWRAP_STATUS_AWAITING_UNWRAP_APPROVAL =
  "TOKEN_UNWRAP_STATUS_AWAITING_UNWRAP_APPROVAL";
export const TOKEN_UNWRAP_STATUS_UNWRAP_PENDING =
  "TOKEN_UNWRAP_STATUS_UNWRAP_PENDING";
export const TOKEN_UNWRAP_STATUS_UNWRAP_COMPLETE =
  "TOKEN_UNWRAP_STATUS_UNWRAP_COMPLETE";

const getWrapAmount = (rootState, wrapType) =>
  web3.toWei(
    formValueSelector(
      wrapType === WRAP_ETHER ? "wrapEther" : "wrapTokenWrapper"
    )(rootState, "amount"),
    ETH_UNIT_ETHER
  );

const getUnwrapAmount = (rootState, unwrapToken) =>
  web3.toWei(
    formValueSelector(
      unwrapToken === UNWRAP_ETHER ? "unwrapEther" : "unwrapTokenWrapper"
    )(rootState, "amount"),
    ETH_UNIT_ETHER
  );

const setActiveWrapUnwrappedToken = createAction(
  "WRAP_UNWRAP/SET_ACTIVE_UNWRAPPED_TOKEN",
  token => token
);

const wrapEther = createAction(
  WRAP_ETHER,
  ({
    amountInWei,
    gasPrice = DEFAULT_GAS_PRICE
  }) =>
    getTokenContractInstance(TOKEN_WMATIC).deposit({
      value: amountInWei,
      gasPrice
    })
);

const wrapEther$ = createPromiseActions("WRAP_UNWRAP/WRAP_ETHER");
const wrapETHTokenEpic = (
  withCallbacks,
  { doWrapEther = wrapEther, doAddTransactionEpic = null } = {}
) => (dispatch, getState) => {
  dispatch(wrapEther$.pending());
  const wrapAmount = getWrapAmount(getState(), WRAP_ETHER);
  return handleTransaction(
    {
      dispatch,
      transactionDispatcher: () =>
        dispatch(doWrapEther({ amountInWei: wrapAmount })),
      transactionType: TX_WRAP_ETHER,
      withCallbacks
    },
    doAddTransactionEpic ? { addTransactionEpic: doAddTransactionEpic } : {}
  );
};

const unwrapEther = createAction(
  UNWRAP_ETHER,
  async (
    amountInWei,
    { gasPrice = DEFAULT_GAS_PRICE } = {}
  ) =>
    getTokenContractInstance(TOKEN_WMATIC).withdraw(amountInWei, {
      gasPrice
    })
);

const unwrapEther$ = createPromiseActions("WRAP_UNWRAP/UNWRAP_ETHER");
const unwrapEtherEpic = (
  withCallbacks,
  { doUnwrapEther = unwrapEther, doAddTransactionEpic = null } = {}
) => (dispatch, getState) => {
  dispatch(unwrapEther$.pending());
  return handleTransaction(
    {
      dispatch,
      transactionDispatcher: () =>
        dispatch(doUnwrapEther(getUnwrapAmount(getState(), UNWRAP_ETHER))),
      transactionType: TX_UNWRAP_ETHER,
      withCallbacks
    },
    doAddTransactionEpic ? { addTransactionEpic: doAddTransactionEpic } : {}
  );
};

const clearDepositBroker = createAction(
  "WRAP_UNWRAP/CLEAR_DEPOSIT_BROKER",
  (
    tokenName,
    { gasPrice = DEFAULT_GAS_PRICE } = {}
  ) =>
    getDepositBrokerContractInstance(tokenName).clear({
      gasPrice
    })
);

const wrapTokenEpic = withCallbacks => (dispatch, getState) => {
  switch (wrapUnwrap.activeUnwrappedToken(getState())) {
    case TOKEN_MATIC:
      {
        dispatch(wrapETHTokenEpic(withCallbacks));
      }
      break;
  }
};

const unwrapTokenEpic = withCallbacks => (dispatch, getState) => {
  switch (wrapUnwrap.activeUnwrappedToken(getState())) {
    case TOKEN_MATIC:
      {
        dispatch(unwrapEtherEpic(withCallbacks));
      }
      break;
  }
};

const setWrapMax = () => (dispatch, getState) => {
  const activeUnwrappedToken = wrapUnwrap.activeUnwrappedToken(getState());
  const maxWrapValueInEther =
    activeUnwrappedToken === TOKEN_MATIC
      ? web3.fromWei(balances.ethBalance(getState()))
      : balances.tokenBalance(getState(), { tokenName: activeUnwrappedToken });
  if (maxWrapValueInEther) {
    dispatch(
      change(
        activeUnwrappedToken === TOKEN_MATIC ? "wrapEther" : "wrapTokenWrapper",
        "amount",
        maxWrapValueInEther.toString()
      )
    );
  }
};

const setUnwrapMax = () => (dispatch, getState) => {
  const activeWrappedToken = wrapUnwrap.activeWrappedToken(getState());
  const maxUnwrapValueInEther = balances.tokenBalance(getState(), {
    tokenName: activeWrappedToken
  });

  if (maxUnwrapValueInEther) {
    dispatch(
      change(
        activeWrappedToken === TOKEN_WMATIC
          ? "unwrapEther"
          : "unwrapTokenWrapper",
        "amount",
        maxUnwrapValueInEther.toString()
      )
    );
  }
};

const resetActiveWrapForm = wrapType =>
  reset(wrapType === WRAP_ETHER ? "wrapEther" : "wrapTokenWrapper");

const setActiveUnwrapStatus = createAction(
  "WRAP_UNWRAP/SET_UNWRAP_STATUS",
  status => status
);
const resetActiveUnwrapStatus = createAction("WRAP_UNWRAP/SET_UNWRAP_STATUS");

const setActiveWrapStatus = createAction(
  "WRAP_UNWRAP/SET_WRAP_STATUS",
  status => status
);
const resetActiveWrapStatus = createAction("WRAP_UNWRAP/SET_WRAP_STATUS");

const resetActiveUnwrapForm = unwrapType =>
  reset(unwrapType === UNWRAP_ETHER ? "unwrapEther" : "unwrapTokenWrapper");

const actions = {
  wrapTokenEpic,
  unwrapTokenEpic,
  setActiveWrapUnwrappedToken,
  setWrapMax,
  setUnwrapMax,
  resetActiveWrapForm,
  resetActiveUnwrapForm
};

const testActions = {
  wrapETHTokenEpic,
  unwrapEtherEpic,
};

const reducer = handleActions(
  {
    [setActiveWrapUnwrappedToken]: (state, { payload }) => {
      return state.set("activeUnwrappedToken", payload);
    },
    [setActiveWrapStatus]: (state, payload) =>
      state.set("activeWrapStatus", payload),
    [resetActiveWrapStatus]: state => state.set("activeWrapStatus", null),
    [setActiveUnwrapStatus]: (state, payload) =>
      state.set("activeUnwrapStatus", payload),
    [resetActiveUnwrapStatus]: state => state.set("activeUnwrapStatus", null)
  },
  initialState
);

export default {
  actions,
  testActions,
  reducer
};
