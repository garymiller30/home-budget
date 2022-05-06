import { TRANSACTION_TYPE } from "../vars/variables";
import { transactionFiter } from ".";
import Transaction from "../model/transaction";
export function transactionSplitByType(transactions: Transaction[] = []): { debit: Transaction[], credit: Transaction[] } {
  return {
    debit: transactionFiter(transactions, TRANSACTION_TYPE.DEBIT),
    credit: transactionFiter(transactions, TRANSACTION_TYPE.CREDIT),
  };
}
