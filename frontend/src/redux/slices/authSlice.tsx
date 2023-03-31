import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MemberInfo} from '../../types/MemberInfo';
import {LoginRequestPayload} from '../../types/LoginRequestPayload';
import {LoginResponsePayload} from '../../types/LoginResponsePayload';
import {loginApi} from './../../apis/loginApi';

type AuthState = {
  token: string | null;
  memberInfo: MemberInfo | null;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  isVerified: boolean; // 번호를 인증했는지 확인
};

const initialState: AuthState = {
  token: null,
  memberInfo: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
  isVerified: false,
};

// 로그인 API 호출 액션 생성
export const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginRequestPayload) => {
    const response = await loginApi(payload);
    return response;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<LoginResponsePayload>) => {
      const {tokenType, accessToken, nickname, profile} = action.payload;
      const token = tokenType + accessToken;
      const memberInfo = {nickname, profile};

      state.token = token;
      state.memberInfo = memberInfo;
      state.isLoading = false;
      state.error = null;
      state.isLoggedIn = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log(state.error);
    },
    logout: state => {
      state.token = null;
      state.memberInfo = null;
      state.isLoading = false;
      state.error = null;
      state.isLoggedIn = false;
    },
    verifySuccess: state => {
      state.isVerified = true;
    },
    verifyInitialize: state => {
      state.isVerified = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponsePayload>) => {
          const {tokenType, accessToken, nickname, profile} = action.payload;
          const token = tokenType + accessToken;
          const memberInfo = {nickname, profile};

          state.token = token;
          state.memberInfo = memberInfo;
          state.isLoading = false;
          state.error = null;
          state.isLoggedIn = true;
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? '로그인 중 오류가 발생했습니다.';
        console.log(state.error);
      });
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  verifySuccess,
  verifyInitialize,
} = authSlice.actions;

export default authSlice;
