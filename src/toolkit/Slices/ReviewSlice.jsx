/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reviews: [],
};

const ReviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        addReview(state, action) {
            state.reviews.push(action.payload);
        },
        clearReviews(state) {
            state.reviews = [];
        },
    },
});

export const { addReview, clearReviews } = ReviewSlice.actions;
export const selectReviews = state => state.review.reviews;

export default ReviewSlice.reducer;
