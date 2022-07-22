import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	endpoints: builder => ({
		getActivities: builder.query({
			query: () => '/todays-activities'
		})
	}),
})

export const { useGetActivitiesQuery } = apiSlice;