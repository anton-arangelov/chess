import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { testNumberSlice } from './testStoreSlice'
import { createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'

const makeStore = () =>
  configureStore({
    reducer: {
      [testNumberSlice.name]: testNumberSlice.reducer
    },
    middleware: [thunkMiddleware],
    devTools: true
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = ReturnType<AppStore['dispatch']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

export const wrapper = createWrapper<AppStore>(makeStore)
