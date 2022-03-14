import { TRANSACTION_TYPE } from "../vars/variables";
import { transactionFiter } from "./transactionFilter";
export function transactionSplitByType(transactions = []) {
  return {
    debit: transactionFiter(transactions, TRANSACTION_TYPE.DEBIT),
    credit: transactionFiter(transactions, TRANSACTION_TYPE.CREDIT),
  };
}
