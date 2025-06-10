import { baseApi } from "../../api/baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get mutual-chat
    getMutualConnections: builder.query({
      query: () => ({
        url: `/message/mutual-chat`,
        method: "GET",
      }),
    }),
  }),
});

export default messageApi;
