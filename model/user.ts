import { ObjectId } from "mongodb";

export default class User {
  _id?: ObjectId
  email: string = "";
  name: string = "";
  budget: number = 0;
  image: string = "";
}
