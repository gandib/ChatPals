import type { BaseQueryApi } from "@reduxjs/toolkit/query";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "blocked" | "unblocked";
  image: string;
  bio: string;
  iat: number;
  exp: number;
}

export type TError = {
  error: any;
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TUserChat = {
  _id: string;
  name: string;
  image: string;
  chats: TChat[];
};

export type TChat = {
  _id: string;
  message: string;
  roomId: string;
  sender: IUser;
  receiver: IUser;
  createdAt: Date;
  updatedAt: Date;
};
