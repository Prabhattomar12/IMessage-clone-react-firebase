import { createSlice } from  '@reduxjs/toolkit'

const initialState = {
    groupId: '',
    groupName: '',
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setGroupInfo: (state, action) => {
            state.groupName = action.payload.groupName
            state.groupId = action.payload.groupId
        },
    },

})


export const { setGroupInfo } = appSlice.actions;
export const selectGroupId = (state) => state.app.groupId;
export const selectGroupName = (state) => state.app.groupName;


export default appSlice.reducer;