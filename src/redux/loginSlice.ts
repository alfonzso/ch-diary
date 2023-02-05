import { AnyAction, createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import { LoginResponse } from '../types'
import { newFetch } from '../utils/fetchInstance'
import { ToastError, ToastSucces } from '../utils/oneliners'
import { RootState } from './store'
import { updateUserAccessToken, updateUserInformations, updateUserRefreshToken } from './userSlice'

export const logMeIn = createAsyncThunk<LoginResponse, void, { state: RootState, dispatch: Dispatch<AnyAction>, rejectValue: Error }>(
  'login/send',
  async (_, { getState, dispatch }) => {
    const state = getState();

    return newFetch<LoginResponse>({
      url: `/api/auth/login`,
      newFetchResolve: (response) => {
        dispatch(updateUserInformations(response.accessToken))
        dispatch(updateUserAccessToken(response.accessToken))
        dispatch(updateUserRefreshToken(response.refreshToken))
        return response
      },
      newFetchReject: (err) => {
        return err
      },
      config: {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: state.login.email, password: state.login.password
        })
      }
    })

  }
)

interface ImportState {
  email: string
  password: string
}

const initialState: ImportState = {
  email: "",
  password: ""
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(logMeIn.fulfilled, (state, { payload }) => {
      ToastSucces('Login Succeed ')
    })
    builder.addCase(logMeIn.rejected, (state, { payload }) => {
      ToastError(`Login Failed ${payload!.message} `)
    })
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setEmail, setPassword } = loginSlice.actions

export default loginSlice.reducer