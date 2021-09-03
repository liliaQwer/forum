import {createSlice} from '@reduxjs/toolkit'
import PostService from "../services/PostService";
import {createAsyncThunk} from "@reduxjs/toolkit";
import ErrorService from "../services/ErrorService";

export const thunkHandler = async (asyncFn, thunkAPI) => {
    try {
        const response = await asyncFn;
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', (params, thunkAPI) => {
    const {page, rowsPerPage, category, contentToFind} = params;
    // const response = await PostService.getPostList(page, rowsPerPage, category, contentToFind);
    // return response.data;
    return thunkHandler(PostService.getPostList(page, rowsPerPage, category, contentToFind), thunkAPI);

});

export const postSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [],
        page: 0,
        rowsPerPage: 5,
        totalItems: 0,
        status: 'idle',
        error: ''
    },
    reducers: {
        fillPosts: state => {
            state.value += 1
        },
        setRowsPerPage: (state, action) => {
            state.rowsPerPage = action.payload.rowsPerPage
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.items = action.payload.content;
                state.totalItems = action.payload.totalElements;
                state.status = 'success';
            })
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading';
                state.error = '';
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'error';
                state.error = ErrorService.defineErrorFromStatusCode(action.payload.status);
            })
    }
})

// Action creators are generated for each case reducer function
export const {fillPosts} = postSlice.actions

export default postSlice.reducer