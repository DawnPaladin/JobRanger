import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	endpoints: builder => ({
		getActivities: builder.query({ query: () => '/todays-activities' }),
		getLoot: builder.query({ query: () => '/weekly-loot' }),
		createLoot: builder.mutation({ 
			query: lootItem => ({
				url: '/loot',
				method: 'POST',
				body: lootItem
			})
		})
	}),
});

export const { useGetActivitiesQuery, useGetLootQuery, useCreateLootMutation } = apiSlice;