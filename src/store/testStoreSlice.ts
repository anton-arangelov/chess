import { Action, AnyAction, createSlice, ThunkAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Type for our state
export interface TestStoreState {
  testNumber: number
  users?: []
}

// Initial state
const initialState: TestStoreState = {
  testNumber: 0
}

export const fetchUsers: any = createAsyncThunk('store/testStore', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users')
  return response.data
})

export const testNumberSlice = createSlice({
  name: 'testStore',
  initialState,
  reducers: {
    setTestNumber(state, action) {
      state.testNumber = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload
    })
  }
})

export const { setTestNumber } = testNumberSlice.actions
