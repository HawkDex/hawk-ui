import { fromJS } from "immutable";
import { WRAP_UNWRAP_HISTORY_TYPE_WRAP } from '../../store/reducers/wrapUnwrapHistory';
import { TOKEN_MATIC } from '../../constants';

const createHistoryEntry = ({ event, transactionHash, tokenName, timestamp, blockNumber, wrapUnwrapType }) => {
  const action  = wrapUnwrapType === WRAP_UNWRAP_HISTORY_TYPE_WRAP ? 'wrap': 'unwrap';
  switch (tokenName) {
    case TOKEN_MATIC: {
      const { who, amount } = event.args;
      return fromJS({
        tokenName,
        fromAddress: who,
        toAddress: null,
        tokenAmount: amount.toString(),
        timestamp,
        blockNumber,
        wrapUnwrapType,
        transactionHash,
        action
      });
    }
  }
};

export default createHistoryEntry;