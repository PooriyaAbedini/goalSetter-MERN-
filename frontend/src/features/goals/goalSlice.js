import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
    goals: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

//Create Goal
export const createGoal = createAsyncThunk('goals/create',
    async(goalData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.createGoal(goalData, token); 
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) || error.message
                || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

//Get Goals
export const getGoals = createAsyncThunk('goals/getAll', 
    async(_,thunkAPI) => {
        try {
            const user = await thunkAPI.getState().auth.user;
            if (user) {
                const token = await thunkAPI.getState().auth.user.token;
                return await goalService.getGoal(token)
            }
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) || error.message
                || error.toString();
            return thunkAPI.rejectWithValue(message);
        }    
    })

//Delete A Goal
export const deleteGoal = createAsyncThunk('goals/deleteOne' ,
    async(goalId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.deleteGoal(goalId, token)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) || error.message
                || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
})

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers:{
        reset: state => initialState
    },
    extraReducers: builder => {
        builder
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                action.payload.message ? state.message = action.payload.message :
                state.goals.push(action.payload)
            })
            .addCase(createGoal.pending, state => {
                state.isLoading = true
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.goals = action.payload
            })
            .addCase(getGoals.pending, state => {
                state.isLoading = true
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.goals = state.goals.filter( goal => goal._id !== action.payload.id)
            })
            .addCase(deleteGoal.pending, state => {
                state.isLoading = true
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            
    }
})

export const { reset } = goalSlice.actions;
export default goalSlice.reducer