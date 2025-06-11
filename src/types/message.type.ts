import type { IUser } from "./user.type";

export interface IMessage {
  _id: string;
  message: string;
  sender: IUser;
  receiver: IUser;
  roomId: string;
  createdAt: Date;
  updatedAt: Date;
}
