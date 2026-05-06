
import { data } from "react-router-dom";
import { apiSlice } from "./apiSlice.js";
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query: ( data )=>({
                url: "/api/users/auth",
                method:"POST",
                body:data,
            }),
            keepUnusedDataFor: 5,
        }),
         logout: builder.mutation({
            query: ()=>({
                url: "/api/users/logout",
                method:"POST",
                
            }),
        }),
          register: builder.mutation({
            query: (data)=>({
                url: "/api/users",
                method:"POST",
                body:data
                
            }),
        })
   
   
    }),
});
export const {useLoginMutation , useLogoutMutation,useRegisterMutation} = userApiSlice;