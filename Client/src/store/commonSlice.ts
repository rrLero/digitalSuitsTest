import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/common';

type SliceState = {
    user: User;
};

const initialState: SliceState = {
    user: {
        userName: 'Roman',
    },
};

const slice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setUser(state, { payload }: PayloadAction<User>) {
            state.user = payload;
        },
    },
});

export const { setUser } = slice.actions;

export default slice.reducer;
