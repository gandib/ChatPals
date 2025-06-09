export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "blocked" | "unblocked";
  image: string;
  bio: string;
}
