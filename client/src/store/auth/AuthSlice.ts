import { createSlice } from '@reduxjs/toolkit'
import { IAuthState } from '../../types/auth.type';
import actRegister from "./act/actRegister"
import actLogin from './act/actLogin';

const initialState: IAuthState = {
    user: null,
    loading: "idle",
    accessToken: null,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutAuth: (state) => {
            state.user = null
            state.accessToken = null
            state.error = null
            state.loading = "idle"
        },
        clearAuthState: (state) => {
            state.error = null
            state.loading = "idle"
        }
    },

    extraReducers(building) {
        building
            .addCase(actRegister.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actRegister.fulfilled, (state) => {
                state.loading = "success"
                state.error = null
            })
            .addCase(actRegister.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })

            //****************** Login ************************* */

            .addCase(actLogin.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actLogin.fulfilled, (state, action) => {
                state.loading = "success"
                state.user = action.payload.user
                state.accessToken = action.payload.token
            })
            .addCase(actLogin.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })
    }

})
export const { logoutAuth, clearAuthState } = authSlice.actions;
export { actRegister, actLogin };
export default authSlice.reducer