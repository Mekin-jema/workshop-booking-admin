import { apiSlice } from '../api/apiSlice';

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Customer endpoints
    getCustomerBookings: builder.query({
      query: () => 'bookings/mybookings',
      providesTags: ['Bookings']
    }),
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: 'bookings',
        method: 'POST',
        body: bookingData
      }),
      invalidatesTags: ['Bookings', 'Workshops']
    }),
    cancelBooking: builder.mutation({
      query: (bookingId) => ({
        url: `bookings/${bookingId}/cancel`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Bookings']
    }),

    // Admin endpoints
getAllBookings: builder.query({
  query: () => ({
    url: 'bookings',
    method: 'GET',
  }),
  providesTags: ['Bookings'],
}),

    updateBookingStatus: builder.mutation({
      query: ({ bookingId, status }) => ({
        url: `bookings/${bookingId}/update`,
        method: 'PATCH',
        body: { status }
      }),
      invalidatesTags: ['Bookings']
    }),
    getBookingStats: builder.query({
      query: () => '/stats',
      providesTags: ['Bookings']
    })
  })
});

export const {
  useGetCustomerBookingsQuery,
  useCreateBookingMutation,
  useCancelBookingMutation,
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
  useGetBookingStatsQuery
} = bookingApiSlice;