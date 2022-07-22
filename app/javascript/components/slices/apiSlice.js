import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	tagTypes: ['Loot'],
	endpoints: builder => ({
		getActivities: builder.query({ query: () => '/todays-activities' }),
		getLoot: builder.query({
			query: () => '/weekly-loot',
			providesTags: ['Loot']
		}),
		createLoot: builder.mutation({ 
			query: lootItem => ({
				url: '/loot',
				method: 'POST',
				body: lootItem
			}),
			invalidatesTags: ['Loot']
		})
	}),
});

export const { useGetActivitiesQuery, useGetLootQuery, useCreateLootMutation } = apiSlice;