export default class Transaction {
  constructor() {
    this.date.full = new Date();
    this.date.year = this.date.full.getFullYear();
    this.date.month = this.date.full.getMonth() + 1;
    this.date.day = this.date.full.getDate();
  }
  ownerId = "";
  description = "";
  type = ""; //debit || credit
  amount = 0;
  date = {};
}
