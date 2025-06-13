/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues } from "react-hook-form";
import axiosInstance from "../../lib/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
import type { IUser } from "../../types";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData, {
      withCredentials: true,
    });

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    if (data?.success) {
      Cookies.set("accessToken", data?.token, { expires: 604800 });
    }

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const forgetPassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/forget-password",
      userData
    );
    // if (data?.success) {
    //   cookies().set("accessToken", data?.token, { maxAge: 604800 });
    // }

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const recoverPassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/reset-password",
      userData.data,
      {
        headers: {
          Authorization: `${userData.token}`,
        },
      }
    );
    if (data?.success) {
      Cookies.set("accessToken", data?.token, { maxAge: 604800 });
    }

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const logout = () => {
  Cookies.remove("accessToken");
};

export const getCurrentUser = async () => {
  const accessToken = Cookies.get("accessToken");
  let decodedToken: IUser | null = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return {
      _id: decodedToken?._id,
      name: decodedToken?.name,
      email: decodedToken?.email,
      role: decodedToken?.role,
      status: decodedToken?.status,
      image: decodedToken?.image,
      bio: decodedToken?.bio,
    };
  }

  return null;
};
