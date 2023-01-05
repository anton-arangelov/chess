import { AppState } from './store'

export const selectTestNumber = (state: AppState) => state.testStore.testNumber
export const selectUsers = (state: AppState) => state.testStore.users
