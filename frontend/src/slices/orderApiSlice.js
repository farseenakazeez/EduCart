import { apiSlice } from "./apiSlice";

const ORDERS_URL = "/api/orders";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // 🔹 Create Order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: ORDERS_URL,
        method: "POST",
        body: orderData,
      }),
    }),

    // 🔹 Get Order by ID
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // 🔹 Pay Order
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),

    // 🔹 Get Logged-in User Orders
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),

    // 🔹 Get All Orders (Admin)
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),

    // 🔹 Deliver Order (Admin)
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),

  }),
});

//  Export hooks
export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = orderApiSlice;