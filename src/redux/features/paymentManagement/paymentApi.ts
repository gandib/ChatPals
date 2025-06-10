import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payment/initiate",
        method: "POST",
        body: paymentData,
      }),
    }),
  }),
});

export default paymentApi;
