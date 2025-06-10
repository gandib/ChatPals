import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (email) => ({
        url: `/auth/${email}`,
        method: "GET",
      }),
    }),
  }),
});

export default userApi;
