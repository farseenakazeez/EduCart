import { fetchBaseQuery , createApi} from "@reduxjs/toolkit/query/react";
 export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl : "https://mern-backend-vcmf.onrender.com",
     credentials:"include",
    }),
   
    tagTypes: ["Product","User","Order"],
    endpoints: (builder)=>({

    }),
});