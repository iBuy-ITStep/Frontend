import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store.ts'

const initialState = {
    searchIsVisible: false
}

export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setSearchIsVisible: (state, action) => {
            state.searchIsVisible = action.payload
        },
    }
})

export const { setSearchIsVisible } = headerSlice.actions

export const selectIsSearchVisible = (state: RootState) => state.header.searchIsVisible

export default headerSlice.reducer