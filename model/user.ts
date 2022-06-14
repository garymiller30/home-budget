import { ObjectId } from "mongodb";

export default class User {
  _id?: ObjectId
  email: string | null | undefined = "";
  name: string | null | undefined = "";
  budget: number = 0;
  image: string | null | undefined = "";
  timeZone?: string;
}
