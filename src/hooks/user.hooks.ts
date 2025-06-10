/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  deleteUser,
  getAllAdmin,
  getAllUser,
  getUser,
  getUserById,
  updateUser,
  updateUserStatus,
} from "../services/UserService";

export const useUpdateUser = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (userData) => await updateUser(userData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["USER", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateUserStatus = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (userData) => await updateUserStatus(userData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["USER", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useDeleteUser = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (userData) => await deleteUser(userData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["USER", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useGetUser = (email: string, enabled = true) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["USER", email],
    queryFn: async () => await getUser(email),
    enabled: !!email && enabled,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetUserById = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["USER", id],
    queryFn: async () => await getUserById(id),
  });
};

export const useGetAllUser = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["USER"],
    queryFn: async () => await getAllUser(),
  });
};

export const useGetAllAdmin = (email: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["USER", email],
    queryFn: async () => await getAllAdmin(),
  });
};
