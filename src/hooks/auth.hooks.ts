/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { type FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  forgetPassword,
  getCurrentUser,
  loginUser,
  recoverPassword,
  registerUser,
} from "../services/AuthService";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess(data, _variables, _context) {
      toast.success(data.message);
    },
    onError(error, _variables, _context) {
      toast.error(error.message);
    },
  });
};

export const useUserlogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess(data, _variables, _context) {
      toast.success(data.message);
    },
    onError(error, _variables, _context) {
      toast.error(error.message);
    },
  });
};

export const useCurrentUser = () => {
  return useMutation({
    mutationKey: ["USER"],
    mutationFn: async () => await getCurrentUser(),
  });
};

export const useForgetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await forgetPassword(userData),
    onSuccess(data, _variables, _context) {
      toast.success(data.message);
    },
    onError(error, _variables, _context) {
      toast.error(error.message);
    },
  });
};

export const useRecoverPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await recoverPassword(userData),
    onSuccess(data, _variables, _context) {
      toast.success(data.message);
    },
    onError(error, _variables, _context) {
      toast.error(error.message);
    },
  });
};
