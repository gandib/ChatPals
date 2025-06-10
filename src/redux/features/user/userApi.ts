import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get user by email
    getUser: builder.query({
      query: (email) => ({
        url: `/auth/${email}`,
        method: "GET",
      }),
    }),

    // get user by id
    getUserById: builder.query({
      query: (id) => ({
        url: `/auth/user-by-id/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export default userApi;
