export interface IMessage {
  _id: string;
  message: string;
  sender: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  roomId: string;
  createdAt: string;
}
