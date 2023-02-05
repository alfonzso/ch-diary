import { AnyAction, createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import { newFetch, ResponseErrorHandler } from '../utils/fetchInstance'
import { logout } from './userSlice'

export const logMeOut = createAsyncThunk<{} & ResponseErrorHandler, void, { dispatch: Dispatch<AnyAction>, rejectValue: Error }>(
  'logout/send',
  async (_, { dispatch }) => {
    // const state = getState();

    dispatch(
      logout()
    )

    return newFetch<{} & ResponseErrorHandler>({
      url: `/api/auth/logout`,
      config: {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      },
      newFetchResolve: (response) => {
        return response
      },
      newFetchReject: (err) => {
        return err
      }
    })

  }
)

export const LogoutStates = {
  INIT: -1,
  SUCCES: 0,
  FAILED: 1,
}

interface ImportState {
  isLoggedOut: number
  logoutError: Error
}

const initialState: ImportState = {
  isLoggedOut: LogoutStates.INIT,
  logoutError: new Error()
};

export const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(logMeOut.fulfilled, (state, { payload }) => {
      state.isLoggedOut = LogoutStates.SUCCES
    })
    builder.addCase(logMeOut.rejected, (state, { payload }) => {
      state.isLoggedOut = LogoutStates.FAILED
      if (payload) state.logoutError = payload
    })
  },
  reducers: {
    setLogoutToInitState: (state) => {
      state.isLoggedOut = LogoutStates.INIT
    },
    // setPassword: (state, action) => {
    //   state.password = action.payload
    // }
  },
})

// Action creators are generated for each case reducer function
export const { setLogoutToInitState } = logoutSlice.actions

export default logoutSlice.reducer