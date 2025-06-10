/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { type FieldValues } from "react-hook-form";
import axiosInstance from "../../lib/AxiosInstance";

export const updateUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/auth/update-user?id=${userData.id}`,
      userData.data
    );

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const updateUserStatus = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/auth/update-user-status?id=${userData.id}`,
      userData.data
    );

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const deleteUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.delete(
      `/auth/delete-user?id=${userData.id}`
    );

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getUser = async (email: string) => {
  try {
    const { data } = await axiosInstance.get(`/auth/${email}`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getUserById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/auth/user-by-id/${id}`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllUser = async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/all-user`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllAdmin = async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/all-admin`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
