import { ObjectId } from "mongodb";
import { iTransactionDate } from "../interfaces/iTransactionDate";
export default class Transaction {
  _id?: ObjectId
  constructor() {

    this.date.year = this.date.full.getFullYear();
    this.date.month = this.date.full.getMonth() + 1;
    this.date.day = this.date.full.getDate();
  }
  ownerId: string = "";
  description: string = "";
  comment: string = "";
  type: string = ""; //debit || credit
  amount: number = 0; //
  date: iTransactionDate = {
    full: new Date(),
    year: 0,
    month: 0,
    day: 0,
  };
}