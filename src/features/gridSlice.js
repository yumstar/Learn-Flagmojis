import { createSlice } from '@reduxjs/toolkit'

export const gridSlice = createSlice({
    name: 'grid',
    initialState: {
        itemExpanded: false,
        lastItemExpanded: -1,
        currentItemExpanded: -1
    },
    reducers: {
        noneExpandedOpen: (state, itemIndex) => {
            state.itemExpanded = true
            state.currentItemExpanded = itemIndex.payload
        },
        someExpandedOpen: (state, itemIndex) => {
            state.itemExpanded = true
            state.lastItemExpanded = state.currentItemExpanded
            state.currentItemExpanded = itemIndex.payload
        },
        someExpandedClose: (state) => {
            state.itemExpanded = false
            state.lastItemExpanded = state.currentItemExpanded
            state.currentItemExpanded = -1
        },
        changeCurrent: (state, itemIndex) => {
            state.currentItemExpanded = itemIndex.payload;
        }
    }
})
export const { noneExpandedOpen, someExpandedOpen, someExpandedClose, changeCurrent } = gridSlice.actions

export const selectExpanded = (state) => state.grid.itemExpanded;
export const selectLast = (state) => state.grid.lastItemExpanded;
export const selectCurrent = (state) => state.grid.currentItemExpanded;



export default gridSlice.reducer